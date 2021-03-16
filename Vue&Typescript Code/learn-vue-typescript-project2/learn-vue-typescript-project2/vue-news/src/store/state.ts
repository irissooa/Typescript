import { NewsItem } from "@/api";

const state = {
  news: [] as NewsItem[]
};

// node_modules/vuex/types/vue.d.ts에 연결해서 바로 추론되게 했었음(결국 나중엔 따로 파일 만들어서 프로젝트에 쓰일 수 있게 만듦 => project.d.ts)
// 나중에는 State도 모듈화 되기 때문에 RootState라고 보통 명명을 많이 함
type RootState = typeof state;

// named export방식
export { state, RootState };
