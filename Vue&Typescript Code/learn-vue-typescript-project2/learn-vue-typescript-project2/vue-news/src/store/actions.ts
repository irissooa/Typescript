import { fetchNews, NewsItem } from "@/api";
import { ActionContext } from "vuex";
import { Mutations, MutationTypes } from "./mutations";
import { RootState } from "./state";

enum ActionTypes {
  FETCH_NEWS = "FETCH_NEWS"
}
// ActionContext를 확장시킴
// type이 store 내부적으로 아직 확장이 잘 안돼있어서 확장시킴
type MyActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
  // ActionContext는 제네릭으로 두개를 받음 첫번째는 state, 두번째는 rootState에 들어가는 제네릭
} & Omit<ActionContext<RootState, RootState>, "commit">;

const actions = {
  async [ActionTypes.FETCH_NEWS](context: MyActionContext, payload?: any) {
    // payload는 거의 사용하지않음 옵션
    const { data } = await fetchNews();
    context.commit(MutationTypes.SET_NEWS, data);
    return data; // dispatch를 했을 때 response의 반환값은 NewsItem[]이라고 추론됨
  }
};

type Actions = typeof actions;

export { ActionTypes, actions, Actions };
// this.$store.dispatch(ActionTypes.FETCH_NEWS)

// import {
//   fetchNews,
//   fetchAsk,
//   fetchJobs,
//   fetchUser,
//   fetchItem,
//   fetchList
// } from "../api/index";

// export default {
//   FETCH_NEWS({ commit }) {
//     return fetchNews().then(response => commit("SET_NEWS", response.data));
//   },
//   FETCH_ASK({ commit }) {
//     return fetchAsk().then(response => commit("SET_ASK", response.data));
//   },
//   FETCH_JOBS({ commit }) {
//     return fetchJobs().then(response => commit("SET_JOBS", response.data));
//   },
//   FETCH_USER({ commit }, userId) {
//     return fetchUser(userId).then(res => commit("SET_USER", res.data));
//   },
//   FETCH_ITEM({ commit }, itemId) {
//     return fetchItem(itemId).then(res => commit("SET_ITEM", res.data));
//   },
//   // hoc
//   FETCH_LIST({ commit }, listType) {
//     return fetchList(listType).then(res => commit("SET_LIST", res.data));
//   }
// };
