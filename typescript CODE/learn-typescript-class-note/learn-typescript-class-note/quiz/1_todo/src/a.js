// filter 함수 예시
let arr = [
  { gender: 'male', name: 'john' },
  { gender: 'female', name: 'sarah' },
  { gender: 'male', name: 'bone' },
];
// 조건에 맞는 것 배열을 return
let filtered = arr.filter(function (item) {
  if (item.gender === 'female') {
    return item;
  }
});
console.log(filtered);
