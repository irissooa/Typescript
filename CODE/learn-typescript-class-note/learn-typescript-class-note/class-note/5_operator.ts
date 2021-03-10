// any는 어떤 타입이든 가능함
// function logMessage(value: any) {
//   console.log(value);
// }
// logMessage('hello');
// logMessage(100);

// type의 장점을 살라며 다른 type도 지정하는 방법
// |(or) 연산자를 이용, union타입이용(여러 타입을 쓸 수 있게 함)
// 특정변수에 여러 타입을 쓰고싶을때 union type을 씀
var seho: string | number | boolean;
function logMessage(value: string | number) {
  if (typeof value === 'number') {
    // value가 number이기 때문에 .을 했을때 number에 관한 api들이 자동으로 보임
    value.toLocaleString();
  }
  if (typeof value === 'string') {
    // value가 string이기 때문에 .을 했을때 string에 관한 api들이 자동으로 보임
    value.toString();
  }
  // error정리
  throw new TypeError('value must be string or number');
}
logMessage('hello');
logMessage(100);

// 인터섹션(교차) 타입
interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}
// union type(|) someone은 'Developer | Person' 이렇게 적으면 someone.을 했을때 접근할 수 있는 속성은 'name'밖에 없음 => why? typescript는 someone이 Developer인지 Person인지 모르기 때문에 보장된 공통된 속성만 접근가능하다.(type safe하지 않기 떄문)보장된 속성이 아니면 타입검증이 없기 때문에 에러가 날수 있다
function askSomeone(someone: Developer | Person) {
  someone.name;
  someone.age;
  someone.skill;
}
// union type에서는 Person이나 Developer가 들어가면 정상작동
askSomeone({name:'디벨로퍼',skill:'웹 개발'});
askSomeone({ name: '캡틴', age: 100 });

// & 연산자(인터섹션타입) : Developer & Person이라고 하면 두 인터셉터가 가진 모든 속성과 type을 가짐
function askSomeone(someone: Developer & Person) {
  someone.name;
  someone.age;
  someone.skill;
}
// 인터섹션타입을 썼을때는 모든 속성을 다 적어주지 않으면 에러가 발생!
askSomeone({ name: '디벨로퍼', skill: '웹 개발',age:100 });
