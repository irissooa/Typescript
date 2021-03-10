type Heroes = 'Hulk' | 'Capt' | 'Thor'
// Heroes의 각 type들을 반복해서 돌려 :number타입을 정의함
// K : 타입변수
type HeroAges = { [K in Heroes]: number }
const ages: HeroAges = {
  Hulk: 33,
  Capt: 100,
  Thor: 1000,
}

// for in 반복문 코드
// var arr = ['a','b','c'];
// for (var key in arr) {
//   console.log(arr[key]);
// }