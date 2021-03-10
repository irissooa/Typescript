class Person {
  // class에서 사용할 속성들 member변수들의 type도 다 지정해줘야됨
  // class안에서 만 쓸 수있는 private
  private name: string;
  // 기본적으로 다른곳에서도 쓸수있음 public
  public age: number;
  // readonly 접근만 가능하고 바꿀 수 없다
  readonly log: string;
  // typescript이기 때문에 param의 type을 지정해줘야됨
  constructor(name: string, age: number) {
    this.name = name; 
    this.age = age;
  }
}

// 리액트 예전 문법 - 클래스 기반 코드
class App extends React.Component {

}

// 리액트 최신 문법 - 훅 기반의 함수형 코드
function App() {
  return <div>Hello World</div>
}

// 
new Vue({
  el: '',
  setup() {
    
  }
})