// 제너릭을 이용해 interface를 선언
interface DropdownItem<T> {
  value: T;
  selected: boolean;
}

// 인터페이스 선언
// interface Email {
//   value: string;
//   selected: boolean;
// }

// const emails: {value:string; selected:boolean}[]
// const emails: Email[] // 인터페이스 이용
// string을 type으로 넘겨 value값에 string이 들어옴
const emails: DropdownItem<string>[] = [
  { value: 'naver.com', selected: true },
  { value: 'gmail.com', selected: false },
  { value: 'hanmail.net', selected: false },
];

// interface ProductNumber {
//   value: number;
//   selected: boolean;
// }

// interface TrueFalse {
//   value: boolean;
//   selected: boolean;
// }

// type이 number로 넘어가 value값이 number
const numberOfProducts: DropdownItem<number>[] = [
  { value: 1, selected: true },
  { value: 2, selected: false },
  { value: 3, selected: false },
];

// item: Email | ProductNumber 이렇게 인터페이스로 정의도 가능하지만 동일한 속성인데 type이 바껴서 인터페이스를 따로 지정해주는 비효율 적인 것을 제너릭을 이용해 유연하게 만들 수 있다 
// 하나의 interface를 여러개의 type에 적용가능

function createDropdownItem(item: DropdownItem<string> | DropdownItem<number>) {
  const option = document.createElement('option');
  option.value = item.value.toString();
  option.innerText = item.value.toString();
  option.selected = item.selected;
  return option;
}
// 아래와 같이 제너릭을 이용하면 union연산자도 쓰지않고 코드를 줄일 수 있다
// function createDropdownItem<T>(item: DropdownItem<T>) {
// 호출시 <string>을 같이 넘겨주면 됨
// const item = createDropdownItem<string>(email);

// NOTE: 이메일 드롭 다운 아이템 추가
emails.forEach(function (email) {
  const item = createDropdownItem(email);
  const selectTag = document.querySelector('#email-dropdown');
  selectTag.appendChild(item);
});

numberOfProducts.forEach(function (product) {
  const item = createDropdownItem(product);
});
