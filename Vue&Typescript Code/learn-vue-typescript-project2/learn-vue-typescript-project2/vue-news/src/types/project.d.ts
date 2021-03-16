import Vue from "vue";
import { MyStore } from "@/store/types";

// [Vue2기준] NOTE: `node_module/vuex/types/vue.d.ts` 파일을 삭제해줘야 아래 타입이 정상 추론됨
// Module Augmentation(declare module) : Vue내부적 type에 대한 확장을 프로젝트 레벨에서 했기 때문에 정의된 type을 추론할 수있다
declare module "vue/types/vue" {
  interface Vue {
    $store: MyStore;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    store?: MyStore;
  }
}
