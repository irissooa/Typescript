import { CommitOptions, DispatchOptions, Store } from "vuex";
import { Getters } from "./getters";
import { Actions } from "./actions";
import { Mutations, MutationTypes } from "./mutations";
import { RootState } from "./state";

type MyMutations = {
  // 제네릭을 두개받음 : Mutations의 key를 받겠다, Mutations의 키를 앞에서 받아서 [1] 두번쨰파라미터(첫번째는 state) payload의 타입을 들고오겠다
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions // Vuex에서 제공되는 type옵션
  ): ReturnType<Mutations[K]>;
};
// commit(MutationTypes.SET_NEWS, )
// 추론할 수 있는 형태로 변경
type MyActions = {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions // store내부적으로 있는 type
  ): ReturnType<Actions[K]>;
};

// type A = keyof Getters;
type MyGetters = {
  getters: {
    // 맵드타입
    // key(getters속성함수 key)와 value(getters[key]의 반환타입)로 계속 매칭해줌
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

// Omit은  특정 타입에서 지정된 속성만 제거한 타입을 정의함 ("commit" | "dispatch" | "getters")을 빼주고 합집합으로 MyMutation, MyAction, MyGetters를 포함시켜 MyStore를 확장시킴
export type MyStore = Omit<
  Store<RootState>,
  "commit" | "dispatch" | "getters"
> &
  MyMutations &
  MyActions &
  MyGetters;

// const person = {
//   name: "a",
//   age: 10,
//   skill: "js"
// };
// const josh = Omit<person, 'skill'>
// josh = {
//   name: 'a',
//   age: 10
// }

// 인터섹션(합집합)
// type A = {
//   name: string;
// };
// type B = {
//   age: number;
// };
// & : A와 B에 들어간 속성이 모두 들어가야됨
// type C = A & B;
// const person: C = {
//   name: "a"
//   // age: 10
// };
