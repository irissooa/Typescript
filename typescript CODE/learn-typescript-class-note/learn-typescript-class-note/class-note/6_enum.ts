// enum안의 값들을 별도의 값을 지정(할당하거나 초기화)하지 않으면 숫자형이넘으로 인식돼 0이 출력됨
enum Shoes {
  Nike = '나이키',
  Adidas = '아디다스'
}

var myShoes = Shoes.Nike;
console.log(myShoes); // '나이키'

// 예제
enum Answer {
  Yes = 'Y',
  No = 'N',
}
// type을 Answer라는 enum으로 줌
function askQuestion(answer: Answer) {
  // answer가 Answer의 두개의 데이터 중 하나인지 확인
  if (answer === Answer.Yes) {
    console.log('정답입니다');
  }
  if (answer === Answer.No) {
    console.log('오답입니다');
  }
}
askQuestion(Answer.Yes);
// enum을 이용했기때문에 에러가남
askQuestion('Yes');
// askQuestion('예스');
// askQuestion('y');
// askQuestion('Yes');