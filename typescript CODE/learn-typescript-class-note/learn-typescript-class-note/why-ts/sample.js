// function sum(a, b) {
//   return a + b;
// }
// js는 숫자와 문자의 합은 문자열로 계산됨
// // sum(10, '20'); // 1020
// var result = sum(10, 20);
// result.toLocalestring();

// 아래 코드 주석아님! '// @ts-check' 이게 있어야 아래의 typescript가 적용됨!
// @ts-check

// param의 type을 정의해줌
/**
 *
 * @param {number} a 첫번째 숫자
 * @param {number} b 두번째 숫자
 */
function sum(a, b) {
  return a + b;
}
// 20도 숫자여야되는데 string이 와서 에러가 바로보임
sum(10, '20');
