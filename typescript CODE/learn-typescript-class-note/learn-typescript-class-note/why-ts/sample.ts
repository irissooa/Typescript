// ts는 인수 뒤에 어떤 type인지 적어줌, 그리고 반환해주는 type까지 정의함
function add(a: number, b: number): number {
  return a + b;
}
var result = add(10, 20);
// toLocaleString : 숫자를 문자열로 바꾸는 api
// result.toLocaleString();
// vsCode Intellisence 자동완성으로 오류를 줄임
result.toLocaleString();

// 만약 아래같이 적으면 정해놓은 타입이 아닌 문자열 '20'은 코드상에서 밑줄로 error가 보임
// add(10, '20');
