function Person(name, age) {
  this.name = name;
  this.age = age;
}
var capt = new Person('캡틴', 100);
// 위의 function Person과 class Person은 같은 뜻
class Person {
  // 클래스 로직
  // constructor : 초기화 메서드
  constructor(name, age) {
    console.log('생성 되었습니다');
    this.name = name;
    this.age = age;
  }
}

var seho = new Person('세호', 30); // 생성 되었습니다.
console.log(seho);