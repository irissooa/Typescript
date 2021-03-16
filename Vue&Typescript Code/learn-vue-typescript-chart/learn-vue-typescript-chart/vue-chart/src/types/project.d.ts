// 1. Make sure to import 'vue' before declaring augmented types
import Vue from "vue";
// chart.js 라이브러리가 export = Chart로 export했기 때문에 import는 require()을 써야됨
import Chart = require("chart.js");
// 대부분은 아래와 같이 import, chart.js가 특수한 상황
// import Chart from 'chart.js'

// $_Chart의 Chart를 이용해  Chart 클래스의 타입을 만듦
type ChartLib = typeof Chart;

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module "vue/types/vue" {
  // 3. Declare augmentation for Vue
  interface Vue {
    // $_Chart: any; // 일단 처음엔 any로 타입을 시작함
    $_Chart: ChartLib;
  }
}

// @types 라이브러리가 제공되지 않는 라이브러리의 경우
// declare module "라이브러리 이름";
