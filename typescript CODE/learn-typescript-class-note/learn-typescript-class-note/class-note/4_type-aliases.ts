// interface Person {
//     name: string;
//     age: number;  
//   }
  
// interface와 type의 차이 : 확장 불가능 여부, 가능한 interface를 써라!
type Person = {
  name: string;
  age: number;
}

var seho: Person = {
  name: '세호',
  age: 30
}

type MyString = string;
var str: MyString = 'hello';

type Todo = { id: string; title: string; done: boolean };
function getTodo(todo: Todo) {

}