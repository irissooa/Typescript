interface Hero {
  name: string;
  skill: string;
}

// : type annotation
// const capt: Hero = {
//   name: 'capt',
//   skill: 'sheild',
// };
// const capt: Hero = {};

// as : 타입단언은 주의해서 써야된다
const capt = {} as Hero;
// 아래의 name과 skill을 정의하지 않고 capt만 선언해도 오류가 나지 않음 추후에 문제가 될 수 있음
capt.name = 'capt';
capt.skill = 'shild';

// ! : non null 타입단언
const a: string | null;
// a가 null이 아닐거라고 단언을 하면 문제가 될 수 있음(null이 안들어온다는 확신이 있을 때 사용해야됨)
// a!;
