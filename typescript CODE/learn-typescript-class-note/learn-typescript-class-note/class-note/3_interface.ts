// 상호간의 규칙을 세움
interface User {
  age: number;
  name: string;
}

// 변수에 인터페이스 활용
// seho라는 변수는 User라는 인터페이스를 갖는다
// 좋은점 : 오탈자를 고치기 쉽고, 다른사람도 항상 동일한 규칙으로 쓸수 있다
var seho: User = {
  age: 33,
  name: '세호'
}

// 함수에 인터페이스 활용
// 특정형식을 따르는 데이터만 받겠다(User)
function getUser(user: User) {
  console.log(user);
}
const capt = {
  name: '캡틴',
  age: 100
}
// name뿐만아니라 age도 같이 넘겨줘야 오류가 안남! => User 형식에 name과 age가 들어있기 때문
getUser(capt);

// 함수의 스펙(구조)에 인터페이스를 활용
interface SumFunction {
  // 인자 두개 받고, 함수반환타입도 지정
  (a: number, b: number): number;
}
// sum변수에 SumFunction 인터페이스 정의 -> SumFunction의 규칙을 따름
var sumNum: SumFunction;
sumNum = function(a: number, b: number): number {
  return a + b;
}

// 인덱싱
interface StringArray {
  // 배열에 접근할때 index와 그 값의 type을 지정
  [index: number]: string;
}

var arr: StringArray = ['a','b','c'];
// 10은 number이기 때문에 에러가나서 할당이 안됨
// arr[0] = 10;

// 딕셔너리 패턴 -> 서비스구현시 많이 씀
// 인덱싱과 유사
interface StringRegexDictionary {
  // 왼쪽의 속성이름은 key, key의 type은 string
  // 값은 정규표현식 RegExp type
  [key: string]: RegExp;
}

var obj: StringRegexDictionary = {
  // sth: /abc/,
  // cssFile의 값은 정규표현식이 와야됨
  // css파일의 정규표현식은 아래와 같이 씀 -> css로 끝나는 파일
  cssFile: /\.css$/,
  jsFile: /\.js$/,
}
// key로 객체에 접근할때 'a'라고 바꾸면 interface에 어긋나기때문에 오류가남, 정규표현식이면 오류가 안나고 바뀜
// obj['cssFile'] = 'a'

Object.keys(obj).forEach(function(value) {});

// 인터페이스 확장
// 인터페이스를 상속받아서 추가하는 것을 확장
interface Person {
  name: string;
  age: number;
}
// 중복된 속성을 Person에서 상속받아 language를 추가(확장)
interface Developer extends Person {
  language: string;
}
// Developer는 Person 인터페이스를 상속받았기 때문에 그 속성값을 다 써줘야 에러가 나지 않는다!
var captain: Developer = {
  language: 'ts',
  age: 100,
  name: '캡틴'
}