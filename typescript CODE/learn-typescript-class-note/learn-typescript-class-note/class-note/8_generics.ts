// javascript
// text type을 지정하지 않았기 때문에 type:any로 암묵적으로 지정돼있음
// function logText(text) {
//   console.log(text);
//   return text;
// }
// js함수 : type과 관계없이 다 param으로 넘겨줄 수 있음
// logText(10); // 숫자 10
// logText('하이'); // 문자열 하이
// logText(true); // 진위값 true

// 제너릭 이용(호출하는 시점에서 type을 같이 넘겨줌)
// 받는 text의 type을 지정함
// T type으로 넘겨주고 params의 type도 T이고, 반환값도 T
// function logText<T>(text: T): T {
//   console.log(text);
//   return text;
// }
// 함수를 호출할때 text type을 같이 넘겨줄 수있음
// logText에 type을 string으로 넘기겠다
// logText<string>('하이');

// 아래와같이 함수를 여러개 만들지 않아도 제너릭을 이용하면 반복되는 코드를 줄일 수 있다(유지보수에 좋지 않기 때문에 사용)
// function logText(text: string) {
//   console.log(text);
//    //split은 string일때 사용할 수 있는 api
//   // text.split('').reverse().join('');
//   return text;
// }

// function logNumber(num: number) {
//   console.log(num);
//   return num;
// }

// param type을 union으로 받음(여러가지 type이 가능)
// function logText(text: string | number) {
  // 이러면 text는 string과 number의 교집합인 api만 사용가능한 문제가 생김
//   console.log(text);
// 반환값도 string|number가됨
//   return text;
// }

// const a = logText('a');
// logText(10);
// const num = logNumber(10);
// logText(true);

// 제너릭을 이용했을 때 이점
// 각 type의 함수를 여러개 만들어서 지정하는 것이 아니라 타입을 비어놓고 타입을 호출하는 시점에 그 타입에 뭐가 들어갈지 정하는 것이 제너릭
function logText<T>(text: T): T {
  console.log(text);
  return text;
}
// logText 함수의 type을 string으로 하겠다(제너릭)
// const str = logText<string>('abc');
// 이렇게 선언시 split이용가능(string api이기 때문)
// str.split('');
// 동일한 함수에 대해서 boolean값으로 지정도 가능함
// const login = logText<boolean>(true);

// logText('a')
// logText(10)


// 인터페이스에 제네릭을 선언하는 방법
// interface Dropdown {
//   value: string;
//   selected: boolean;
// }

// const obj: Dropdown = { value: 'abc', selected: false };

// 인터페이스에 제너릭 선언
interface Dropdown<T> {
  value: T;
  selected: boolean;
}
// type을 number로 넘겼는데 value값이 string이기 때문에 에러가 남
const obj: Dropdown<number> = { value: 'abc', selected: false };

// 제네릭 타입 제한(제너릭에 더 옵션을 쓰고 싶을때)
// 반환값 T안해줘도되지만 최대한 명시적으로 표시!
// function logTextLength<T>(text: T[]): T[] {
  // 아직 text에 뭐가 들어올지 알수없기때문에 length를 쓰면 오류가남 -> T[]이렇게 배열이 될거라는 힌트를 줌
//   console.log(text.length);
//   text.forEach(function (text) {
//     console.log(text);
//   });
//   return text;
// }
// 배열로 넘겨줘야됨
// logTextLength<string>(['hi', 'abc']);

// 제네릭 타입 제한 2 - 정의된 타입 이용하기
// T[] 이렇게 쓰지 않아도 인터페이스를 이용해 배열인 것을 알려줄 수있다
interface LengthType {
  length: number;
}
// T extends(확장할때사용) LengthType으로 제너릭으로 받은 type은 기본적으로 length라는 속성이 있다는 것을 알려줌
function logTextLength<T extends LengthType>(text: T): T {
  text.length;
  return text;
}
// 10은 length를 제공하지 않기 때문에 에러가 남
logTextLength(10);
// length라는 속성이 들어있으면 사용가능
// 배열,string은 length라는 속성이 들어있기때문에 바로 써주면됨
logTextLength({ length: 10 });

// 제네릭 타입 제한 3 - keyof
interface ShoppingItem {
  name: string;
  price: number;
  stock: number;
}
// ShoppingItem의 key들 중 한가지만 들어갈 수 있게 type 범위를 줄임
function getShoppingItemOption<T extends keyof ShoppingItem>(itemOption: T): T {
  return itemOption;
}
// getShoppingItemOption(10);
// getShoppingItemOption<string>('a');

// key인 name, price, stock만 들어갈 수 있다
getShoppingItemOption('name');
