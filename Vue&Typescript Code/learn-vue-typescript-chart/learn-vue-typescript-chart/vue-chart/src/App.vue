<template>
  <div>
    <canvas id="myChart" ref="myChart"></canvas>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { MyVueRefs } from "./types/index";
// import Chart from "chart.js";

// export default Vue.extend({
// VueConstructor는 vue내부의 타입이기 때문에 ctrl+space를 하면 자동완성으로 import된다
// VueConstructor 제너릭 안에 Vue와 refs의 type 합집합을 넣겠다
// export default (Vue as VueConstructor<
//   Vue & { $refs: { myChart: HTMLCanvasElement } }
// >).extend({
// type으로 제너릭 사용
export default (Vue as MyVueRefs<{ myChart: HTMLCanvasElement }>).extend({
  methods: {
    sayHi() {
      const canvasElement = this.$refs.myChart;
    }
  },
  mounted() {
    //  document.getElementById("myChart")이게 canvas element라고 타입단언을 해줌
    // const canvasElement = document.getElementById(
    //   "myChart"
    // ) as HTMLCanvasElement;
    // ref를 쓰게되면 canvasElement는 type이 Vue | Element | Vue[] | Element[]로 정해진다 그래서 "as HTMLCanvasElement" 이렇게 타입을 단언하지 않더라도 type이 정해져있다
    const canvasElement = this.$refs.myChart as HTMLCanvasElement;
    const ctx = canvasElement.getContext("2d");
    // null값처리
    if (!ctx) {
      return;
    }
    // 플러그인을 이용해 import를 하지않고 main.ts에 플러그인을 등록했으니 this.$_Chart로 사용할 수 있다
    const chart = new this.$_Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45]
          }
        ]
      },

      // Configuration options go here
      options: {}
    });
  }
});
</script>

<style scoped></style>
