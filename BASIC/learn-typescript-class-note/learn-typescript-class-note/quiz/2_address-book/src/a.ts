// function fetchItems() {
//   let items = ['a', 'b', 'c'];
//   return items; // type추론에 의해 string[]이 return될것을 안다
// }
// let result = fetchItems();
// console.log(result);

// 비동기적 코드(ex. axios 등)
// new Promise가 오면 그안의 type을 알수가 없어 Promise<unknown>으로 뜸, 추론을 할 수가 없다, 그래서 Promise에 의해 반환될 값을 지정해줘야됨 -> string[]으로 type을 지정해줌
function fetchItems(): Promise<string[]> {
  let items: string[] = ['a', 'b', 'c'];
  return new Promise(function (resolve) {
    resolve(items);
  });
}
fetchItems();
