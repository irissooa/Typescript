import Vue from "vue";
import Vuex, { mapActions, StoreOptions } from "vuex";
// export default로 꺼낸게 아니면(named export방식) import {} from '' 이런식으로 가져올 수 있다
import { RootState, state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
// import getters from "./getters.js";
// import mutations from "./mutations.js";
// import actions from "./actions.js";

Vue.use(Vuex);

// StoreOptions<RootState>(Vuex에서 내부적으로 제공하는 type) 이걸 적어주면 store가 제공하는 옵션을 자동완성 할 수있음
const store: StoreOptions<RootState> = {
  // 별도의 파일로 만들어서 모듈화
  // store에서 제공하는 옵션 : 내가 만든 파일이름
  state: state,
  mutations: mutations,
  actions: actions
};

export default new Vuex.Store(store);
// store를 따로 type정의 해줘야 인식이됨(타입추론이 어렵기 때문)
// export default new Vuex.Store({
//   strict: process.env.NODE_ENV !== "production",
//   state: {
//     news: [],
//     ask: [],
//     jobs: [],
//     user: {},
//     item: {},
//     list: []
//   },
//   getters,
//   mutations,
//   actions
// });
