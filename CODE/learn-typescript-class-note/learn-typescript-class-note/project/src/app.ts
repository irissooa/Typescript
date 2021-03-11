// // 라이브러리 로딩
// import 변수명 from '라이브러리 이름';
// // 변수, 함수 임포트 문법
// import {} from '파일 상대 경로';
// axios의 응답으로 오는 type이 AxiosResponse 반환값 Promise<AxiosResponse<any>> 이런식으로 type을 적음
import axios, { AxiosResponse } from 'axios';
import Chart from 'chart.js';
// import * as Chart from 'chart.js; //몇몇 라이브러리는 이렇게 적어줘야 에러가
// 타입 모듈
import {
  CountrySummaryResponse,
  CovidSummaryResponse,
  Country,
  CountrySummaryInfo,
} from './covid/index';

// utils
// document.querySelctor는 $로 사용가능하게 함
function $(selector: string) {
  return document.querySelector(selector);
}
// T extends HTMLHtmlElement = HTMLDivElement은 type을 받지 않는다면 default값으로 type을 HTMLDivElement로 지정해줄 수 있다
// function $<T extends HTMLHtmlElement = HTMLDivElement>(selector: string) {
//   const element = document.querySelector(selector);
//   // DOM접근함수로 넘겼던 type으로 return될거라고 단언할 수 있다 그러면 아래 변수를 선언할 때 as로 단언하지 않아도 됨!
//   // 여기서 주의할 점은 오타를 주의할 것! -> 이렇게 쓰는게 더 유용
//   return element as T;
// }
// 예시
// const temp = $<HTMLParagraphElement>('.abc');

// 이미 기존에 있는 type(new Date)이기때문에 Date | string | number 이라고 type을 정의할 수있음, 대부분 Date는 string으로 들어올 수 있어서 string타입까지 받게 하면됨
function getUnixTimestamp(date: Date | string) {
  return new Date(date).getTime();
}
// DOM
// let a: Element | HTMLElement | HTMLParagraphElement;
// as : 타입단언, 달러표시의 결과가 어떤 타입(확장됨) 인지 단언함
// 어떤태그의 확장된 element인지 index.html에서 보고 서로 타입간 호환할수있는형태로 타입을 정해줌
const confirmedTotal = $('.confirmed-total') as HTMLSpanElement;
const deathsTotal = $('.deaths') as HTMLParagraphElement;
const recoveredTotal = $('.recovered') as HTMLParagraphElement;
const lastUpdatedTime = $('.last-updated-time') as HTMLParagraphElement;
//strict as로 정확한 type을 단언하지 않아서 아래 해당 변수를 사용한 코드가 에러가 남 -> HTMLOListElement로 type을 단언해줌
// const rankList = $('.rank-list');
const rankList = $('.rank-list') as HTMLOListElement;
// const deathsList = $('.deaths-list');
const deathsList = $('.deaths-list') as HTMLOListElement;
// const recoveredList = $('.recovered-list');
const recoveredList = $('.recovered-list') as HTMLOListElement;
const deathSpinner = createSpinnerElement('deaths-spinner');
const recoveredSpinner = createSpinnerElement('recovered-spinner');

// 로딩되고있다고 인지시켜주는 spinner
function createSpinnerElement(id: string) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.setAttribute('id', id);
  wrapperDiv.setAttribute(
    'class',
    'spinner-wrapper flex justify-center align-center'
  );
  const spinnerDiv = document.createElement('div');
  spinnerDiv.setAttribute('class', 'ripple-spinner');
  spinnerDiv.appendChild(document.createElement('div'));
  spinnerDiv.appendChild(document.createElement('div'));
  wrapperDiv.appendChild(spinnerDiv);
  return wrapperDiv;
}

// state
let isDeathLoading = false;

// api
function fetchCovidSummary(): Promise<AxiosResponse<CovidSummaryResponse>> {
  const url = 'https://api.covid19api.com/summary';
  return axios.get(url);
}

enum CovidStatus {
  Confirmed = 'confirmed',
  Recovered = 'recovered',
  Deaths = 'deaths',
}

function fetchCountryInfo(
  // countryName: string,
  // strict
  countryName: string | undefined,
  status: CovidStatus // enum
): Promise<AxiosResponse<CountrySummaryResponse>> {
  // status params: confirmed, recovered, deaths
  const url = `https://api.covid19api.com/country/${countryName}/status/${status}`;
  return axios.get(url);
}

// methods
function startApp() {
  setupData();
  initEvents();
}

// events
function initEvents() {
  // strict를 설정했을 때 null값처리
  if (!rankList) {
    return;
  }
  rankList.addEventListener('click', handleListClick);
}

// async -> js를 ts로 바꿀 때 오류가 남 -> 컴파일 옵션추가(lib : ES2015)
// (상위) Element > HTMLElement > HTMLDivElement (하위) 순으로 확장됨
// Event > UIEvent > MouseEvent 순으로 확장됨
// strict옵션 = event : MouseEvent -> Event로 바꿔야에러가 사라짐 WHY?? MouseEvent는 Event에서 확장된 것이기 때문에 strict는 정확한 type을 써줘야돼서 Event로 type을 변경함
async function handleListClick(event: Event) {
  let selectedId;
  if (
    event.target instanceof HTMLParagraphElement ||
    event.target instanceof HTMLSpanElement
  ) {
    // selectedId = event.target.parentElement.id;
    // strict : 위 코드를 삼항연산자로 null값처리
    selectedId = event.target.parentElement
      ? event.target.parentElement.id
      : undefined;
  }
  if (event.target instanceof HTMLLIElement) {
    selectedId = event.target.id;
  }
  if (isDeathLoading) {
    return;
  }
  clearDeathList();
  clearRecoveredList();
  startLoadingAnimation();
  isDeathLoading = true;
  const { data: deathResponse } = await fetchCountryInfo(
    selectedId,
    // enum의 Deaths값을 넘겨줌(CovidStatus가 enum으로 돼있고 안에 어떤 속성이 있는지 자동완성으로 알 수 있다)
    CovidStatus.Deaths
  );
  const { data: recoveredResponse } = await fetchCountryInfo(
    selectedId,
    CovidStatus.Recovered
  );
  const { data: confirmedResponse } = await fetchCountryInfo(
    selectedId,
    CovidStatus.Confirmed
  );
  endLoadingAnimation();
  setDeathsList(deathResponse);
  setTotalDeathsByCountry(deathResponse);
  setRecoveredList(recoveredResponse);
  setTotalRecoveredByCountry(recoveredResponse);
  setChartData(confirmedResponse);
  isDeathLoading = false;
}
// data가 CountrySummaryResponse 타입이면 CountrySummaryResponsesms  CountrySummaryInfo 이루어진 배열이기 떄문에 안의 a,b 요소는 CountrySummaryInfo 타입이 된다
function setDeathsList(data: CountrySummaryResponse) {
  const sorted = data.sort(
    (a: CountrySummaryInfo, b: CountrySummaryInfo) =>
      getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date)
  );
  sorted.forEach((value: CountrySummaryInfo) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    // span의 textContent는 string인데 value의 Cases는 number이기 때문에 type을 맞추기 위해 toString으로 맞춰줌
    span.textContent = value.Cases.toString();
    span.setAttribute('class', 'deaths');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    // if (!deathsList) {
    // return;
    // 매번 이렇게 null값처리를 할 수없으니 변수를 선언할때 type을 제대로 선언해줌
    // }
    //  !(non null 타입단언) : 이건 null이 아니다 라고 단언하는 것
    deathsList!.appendChild(li);
  });
}

function clearDeathList() {
  deathsList.innerHTML = '';
  // deathsList.innerHTML = null;
}

function setTotalDeathsByCountry(data: CountrySummaryResponse) {
  // deathsTotal은 위에 class deaths로 잡은 DOM Element
  deathsTotal.innerText = data[0].Cases.toString();
}

function setRecoveredList(data: CountrySummaryResponse) {
  const sorted = data.sort(
    (a: CountrySummaryInfo, b: CountrySummaryInfo) =>
      getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date)
  );
  sorted.forEach((value: CountrySummaryInfo) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases.toString();
    span.setAttribute('class', 'recovered');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    // ? : 옵셔널 체이닝 오퍼레이터
    // if (recoveredList == null || recoveredList === undefined) {
    //   return;
    // } else {
    //   recoveredList.appendChild(li);
    // }
    // ? 는 위 주석 코드를 한줄로 줄인것!
    recoveredList?.appendChild(li);
  });
}

function clearRecoveredList() {
  // recoveredList.innerHTML = null;
  recoveredList.innerHTML = '';
}

function setTotalRecoveredByCountry(data: CountrySummaryResponse) {
  recoveredTotal.innerText = data[0].Cases.toString();
}

function startLoadingAnimation() {
  deathsList.appendChild(deathSpinner);
  recoveredList.appendChild(recoveredSpinner);
}

function endLoadingAnimation() {
  deathsList.removeChild(deathSpinner);
  recoveredList.removeChild(recoveredSpinner);
}

async function setupData() {
  const { data } = await fetchCovidSummary();
  setTotalConfirmedNumber(data);
  setTotalDeathsByWorld(data);
  setTotalRecoveredByWorld(data);
  setCountryRanksByConfirmedCases(data);
  setLastUpdatedTimestamp(data);
}
//   renderChart(chartData, chartLabel);이렇게 보낼때 data는 number 배열, label은 string배열
function renderChart(data: number[], labels: string[]) {
  // 방법 2개 있음 아래처럼 lineChart를 따로 분리해서 타입단언 해도되고, ctx에서 바로 타입단언을 해줘도됨
  const lineChart = $('#lineChart') as HTMLCanvasElement;
  const ctx = lineChart.getContext('2d');
  Chart.defaults.global.defaultFontColor = '#f5eaea';
  Chart.defaults.global.defaultFontFamily = 'Exo 2';
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Confirmed for the last two weeks',
          backgroundColor: '#feb72b',
          borderColor: '#feb72b',
          data,
        },
      ],
    },
    options: {},
  });
}

function setChartData(data: CountrySummaryResponse) {
  const chartData = data
    .slice(-14) // 최근 14일(2주)
    .map((value: CountrySummaryInfo) => value.Cases);
  const chartLabel = data
    .slice(-14)
    .map((value: CountrySummaryInfo) =>
      new Date(value.Date).toLocaleDateString().slice(5, -1)
    );
  renderChart(chartData, chartLabel);
}

function setTotalConfirmedNumber(data: CovidSummaryResponse) {
  confirmedTotal.innerText = data.Countries.reduce(
    // 각 요소를 더해서 누적해나감
    (total: number, current: Country) => (total += current.TotalConfirmed),
    // 초기값은 0
    0
  ).toString(); // 안의 값이 숫자! 문자로 바꾸는 api가 toString()
}

function setTotalDeathsByWorld(data: CovidSummaryResponse) {
  deathsTotal.innerText = data.Countries.reduce(
    (total: number, current: Country) => (total += current.TotalDeaths),
    0
  ).toString();
}

function setTotalRecoveredByWorld(data: CovidSummaryResponse) {
  recoveredTotal.innerText = data.Countries.reduce(
    (total: number, current: Country) => (total += current.TotalRecovered),
    0
  ).toString();
}

function setCountryRanksByConfirmedCases(data: CovidSummaryResponse) {
  const sorted = data.Countries.sort(
    (a: Country, b: Country) => b.TotalConfirmed - a.TotalConfirmed
  );
  sorted.forEach((value: Country) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item flex align-center');
    li.setAttribute('id', value.Slug);
    const span = document.createElement('span');
    span.textContent = value.TotalConfirmed.toString();
    span.setAttribute('class', 'cases');
    const p = document.createElement('p');
    p.setAttribute('class', 'country');
    p.textContent = value.Country;
    li.appendChild(span);
    li.appendChild(p);
    rankList.appendChild(li);
  });
}

function setLastUpdatedTimestamp(data: CovidSummaryResponse) {
  lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
}

startApp();
