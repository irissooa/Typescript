import { NewsItem } from "@/api";
import store from ".";
import { RootState } from "./state";

// enum은 나중에 코드가 많아지면 자동완성으로 편하게 코드를 빠르게 칠수 있다
enum MutationTypes {
  SET_NEWS = "SET_NEWS"
}

// store.commit("setNews");

const mutations = {
  // 이넘에 의해 "SET_NEWS"가 들어옴
  [MutationTypes.SET_NEWS](state: RootState, news: NewsItem[]) {
    state.news = news;
  }
};
// mutations가 타입으로 담겨야지 store에서 추론을 할 수있다
// 주의!!! Mutation's' s를 안붙이면 Vuex 내부적으로 쓰고있는 타입 이름인 Mutation과 겹치기 때문에 s를 붙여줘야된다.
type Mutations = typeof mutations;

export { MutationTypes, mutations, Mutations };

// export default {
//   SET_NEWS(state, news) {
//     state.news = news;
//   },
//   SET_ASK(state, ask) {
//     state.ask = ask;
//   },
//   SET_JOBS(state, jobs) {
//     state.jobs = jobs;
//   },
//   SET_USER(state, user) {
//     state.user = user;
//   },
//   SET_ITEM(state, item) {
//     state.item = item;
//   },
//   SET_LIST(state, list) {
//     state.list = list;
//   }
// };
