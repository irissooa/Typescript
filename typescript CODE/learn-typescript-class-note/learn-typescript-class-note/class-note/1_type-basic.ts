// JS 문자열 선언
// var str = 'hello';

// TS 문자열 선언
// str이란 변수 타입은 문자열로 쓰겠다, 보통 let으로 선언
let str: string = 'hello';

// TS 숫자
let num: number = 10;

// TS 배열
// Array안에 <type> : 해당 type만 들어갈 수 있음
let arr: Array<number> = [1,2,3];
// string문자열만 들어가야되는데 10이 들어가서 경고를 보여줌
let heroes: Array<string> = ['Capt', 'Thor', 'Hulk', 10]
// 배열을 '[]'로 표시하고 앞에 type을 적어줘도 동일함
let items: number[] = [1,2,3];

// TS 튜플
// address라는 변수를 type뿐만아니라 해당 위치에 type을 지정할 수 있다.[첫번째 index type string, 2번째 index number가 들어옴]
let address: [string, number] = ['gangnam', 100];

// TS 객체
// typescript 객체 정의 방식
let obj: object = {};
// let person: object = {
//   name: 'capt',
//   age: 100
// };
// person에 각 property에 들어올 type을 지정
let person: { name: string, age: number } = {
  // 각 property에 값을 넣어줌
  name: 'thor',
  age: 1000
}

// TS 진위값
let show: boolean = true;