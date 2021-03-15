// 함수의 파라미터에 타입을 정의하는 방식
// function sum(a: number, b: number) {
//   return a + b;
// }
// sum(10, 20);

// 함수의 반환 값에 타입을 정의하는 방식
function add(): number {
  return 10;
}

// 함수에 타입을 정의하는 방식
// a:number(a param의 type), b:number(b param의 type) : number(sum함수 return값의 type = 함수 반환값의 type)
function sum(a: number, b: number): number {
  return a + b;
}
sum(10);

// 함수의 옵셔널 파라미터(?)
// ? : 쓰지않아도 된다 라는 옵션 값으로 정의
function log(a: string, b?: string) {

}
// b는 옵션값이기 때문에 없어도 에러가 나지 않음
log('hello world');
log('hello ts', 'abc');