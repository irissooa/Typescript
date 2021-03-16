import Chart from "chart.js";
import { VueConstructor } from "vue/types/umd";

export default {
  // VueConstructor : vue내부타입
  install(Vue: VueConstructor) {
    // $_Chart는 플러그인의 적합한 네임컨벤션 -> .eslintrc.js에서  "@typescript-eslint/camelcase": "off"로 camelcase를 꺼줘서 $_Chart 이름을 쓸 수 있게 함
    Vue.prototype.$_Chart = Chart;
  }
};

// App.vue
// new this.$_Chart(); //이렇게 chart를 생성할 수 있다
