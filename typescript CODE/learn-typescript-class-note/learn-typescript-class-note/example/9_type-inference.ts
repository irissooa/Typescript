// 타입 추론 기본 1
var a = 'a'; // a type string으로 type추론에 의해 정의됨

// a의 type은 string 결과값은 :string라고 type추론됨(10 + '10' = '1010'이기때문)
function logA(a = 'a') {
  var b = 10; // b의 type은 number
  return a + b;
}

// 타입 추론 기본 2
interface Dropdown<T> {
  value: T
  title: string;
}
var items: Dropdown<number> = {
  // value 타입도 number라고 추론됨, string적으면 에러남
  value: 10,
  title: 'a'
}

// 타입 추론 기본 3
interface DetailedDropdown<T> extends Dropdown<T> {
  // 인터페이스 확장
  description: string;
  tag: T;
}
var detailItems: DetailedDropdown<number> = {
  // number를 넘겨줬기 때문에 value는 number가 와야됨
  value: 'hi',
  title: 'a',
  description: 'b',
  // tag도 number type이 와야됨
  tag: 'c'
}

// Best Common Type
var arr = [1,2,true,'a'];