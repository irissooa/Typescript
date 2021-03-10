// 타입 단언(type assertion)
var a;
a = 20;
a = 'a'
// type을 단언함 b,a둘다 타입이 string
var b = a as string;

// DOM API 조작
// <div id="app">hi</div>

// div의 type은 HTMLDivElement이다
var div = document.querySelector('div');
// div가 없으면 에러가남 이때 타입 단언을 쓸수있음
if (div) {
  div.innerText 
}

// 타입단언
// class가 container인것이 null일 수 있기 때문에 HTMLDivElement로 type을 정함
let div = document.querySelector('.container') as HTMLDivElement;
div.innerText;
