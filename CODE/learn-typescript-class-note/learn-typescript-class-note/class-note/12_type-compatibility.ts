// 인터페이스
interface Developer {
  name: string;
  skill: string;
}
// interface Person {
//   name: string;
//   // skill: string;
// }

// var developer: Developer;
// var person: Person;
// person은 name속성밖에 없기때문에 developer에 할당될 수 없음(왼쪽이 구조적으로 더 큰 속성이 있기때문에 호환이 안됨)
// developer = person;
// 반대로 지정하면 에러가 안남(호환이 되기 때문) 왼쪽이 더 작은 구조가 와야됨
// person = developer;

// 인터페이스가 아니라 class로 하더라도 마찬가지! developer = person; 하면 에러남
class Person {
  name: string;
  skill: string;
}

var developer: Developer;
var person: Person;
developer = new Person();
// person = developer;

// 함수(왼쪽이 더 큰범위면 호환가능)
var add = function(a: number) {
  // ...
}
var sum = function(a: number, b: number) {
  // ...
}
// 왼쪽이 더 구조적으로 커야 에러가 안남(호환가능함)
sum = add;
// add = sum; // add는 두개의 인자를 받을 수 없기 때문에 에러가 남

// 제네릭
interface Empty<T> {
  // ..
}
var empty1: Empty<string>;
var empty2: Empty<number>;
empty1 = empty2;
empty2 = empty1;

interface NotEmpty<T> {
  data: T;
}
var notempty1: NotEmpty<string>;
var notempty2: NotEmpty<number>;
// NotEmpty에 data가 있어서 다르기 때문에 호환이 되지 않음
notempty1 = notempty2;
notempty2 = notempty1;