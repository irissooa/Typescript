interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}
// 리턴값 Developer or Person 인터페이스
function introduce(): Developer | Person {
  return { name: 'Tony', age: 33, skill: 'Iron Making' }
}
// tony에 introduce반환값(Developer | Person)을 할당함
var tony = introduce();
// skill이 return값에 있지만 기본적으로 union은 공통된 속성(name)에 접근가능하기 때문에 name밖에 접근이 안됨
console.log(tony.skill);

// 타입단언을 이용하면 접근가능함
// tony type이 Developer로 단언하면 skill에 접근 가능
if ((tony as Developer).skill) {
  var skill = (tony as Developer).skill;
  console.log(skill);
  // tony를 Person으로 단언
} else if ((tony as Person).age) {
  var age = (tony as Person).age;
  console.log(age); 
}
// 이렇게 하면 코드 가독성이 떨어지고 복잡해짐 이때 타입가드를 씀
// 타입 가드 정의(is로 주로 시작)
// target이란 parameter로 DeVeloper 또는 Person을 넘겨주고 target is Developer(넘겨받은 target이 Developer이면 return)
// isDeveloper는 target이 Developer인지아닌지 판별
function isDeveloper(target: Developer | Person): target is Developer {
  return (target as Developer).skill !== undefined;
}

// tony가 Developer이면 skill이 제공됨 그렇지 않으면 Person이기때문에 age가 제공됨
if (isDeveloper(tony)) {
  console.log(tony.skill);
} else {
  console.log(tony.age);
}