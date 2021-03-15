import ListView from "./ListView.vue";
import bus from "../utils/bus";
import { CreateElement } from "vue/types/umd";

export default function createListView(name: string) {
  return {
    name,
    mounted() {
      bus.$emit("off:progress");
    },
    // view에서 render function을 이용해서 template에 있는 것들을 변환해줌
    // CreateElement vue에 내부적으로 있는 type
    render(h: CreateElement) {
      return h(ListView);
    }
  };
}
