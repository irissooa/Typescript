// Todo에 대한 객체 속성type을 구체적으로 적을 수 있음
// type에 이름을 부여하는 방법
// type Todo = {
//   id: number;
//   title: string;
//   done: boolean;
// };

// typescript의 가장 핵심 interface
interface Todo {
  id: number;
  title: string;
  done: boolean;
}
// 할일의 목록 배열
let todoItems: Todo[];

// api
// 반환값 Todo object가 들어간 배열
function fetchTodoItems(): Todo[] {
  const todos = [
    { id: 1, title: '안녕', done: false },
    { id: 2, title: '타입', done: false },
    { id: 3, title: '스크립트', done: false },
  ];
  return todos;
}

// crud methods
function fetchTodos(): object[] {
  const todos = fetchTodoItems();
  return todos;
}
// void는 반환값이 없다는 것을 명시적으로 나타냄
// Todo는 {id: number,title: string,done: boolean};지만 겹치는 코드이기 때문에 Todo로 정의하고 코드를 간결하게 바꿈
function addTodo(todo: Todo): void {
  todoItems.push(todo);
}

function deleteTodo(index: number): void {
  todoItems.splice(index, 1);
}

function completeTodo(index: number, todo: Todo): void {
  todo.done = true;
  todoItems.splice(index, 1, todo);
}

// business logic
// 반환타입 object
function logFirstTodo(): object {
  return todoItems[0];
}

// 해당조건을 만족하는 object들을 배열로 뽑음
function showCompleted(): object[] {
  return todoItems.filter(item => item.done);
  // return todoItems.filter(function(item) {
  //   if (item.done) {
  //     return item;`
  //   }
  // });
}

// TODO: 아래 함수의 내용을 채워보세요. 아래 함수는 `addTodo()` 함수를 이용하여 2개의 새 할 일을 추가하는 함수입니다.
function addTwoTodoItems(): void {
  // addTodo() 함수를 두 번 호출하여 todoItems에 새 할 일이 2개 추가되어야 합니다.
  const item1 = {
    id: 4,
    title: '아이템 4',
    done: false,
  };
  addTodo(item1);
  // 바로 객체를 함수안에 적어줘도 추가됨
  addTodo({
    id: 5,
    title: '아이템 5',
    done: false,
  });
}

// NOTE: 유틸 함수
function log(): void {
  console.log(todoItems);
}

todoItems = fetchTodoItems();
addTwoTodoItems();
log();
