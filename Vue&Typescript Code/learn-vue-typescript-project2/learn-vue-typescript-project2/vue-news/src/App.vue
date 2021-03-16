<template>
  <div id="app">
    <spinner :loading="loading"></spinner>
    <tool-bar></tool-bar>
    <transition name="routing-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ToolBar from "./components/ToolBar.vue";
import Spinner from "./components/Spinner.vue";
import bus from "./utils/bus";
import { MutationTypes } from "./store/mutations";
import { ActionTypes } from "./store/actions";

export default Vue.extend({
  components: {
    ToolBar,
    Spinner
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    onProgress() {
      this.loading = true;
    },
    offProgress() {
      this.loading = false;
    }
  },
  async created() {
    this.$store.getters.fetchedNews;
    // state상태를 바꾸는건 mutation에서만 일어나야됨!(에러가남)
    // this.$store.state.news = 10;
    // this.$store.state.news;
    // 10이 아니라 NewsItem[]type이 와야된다고 에러를 보여줌
    // this.$store.commit(MutationTypes.SET_NEWS, 10);
    // 커스텀했기 때문에 dispatch까지 적었을 때 보이는 내용들이 우리가 정의한 코드가 보임
    // const response = await this.$store.dispatch(ActionTypes.FETCH_NEWS);
    bus.$on("on:progress", this.onProgress);
    bus.$on("off:progress", this.offProgress);
  }
});
</script>

<style>
body {
  margin: 0;
}

a {
  color: #34495e;
  text-decoration: none;
}
a:hover {
  color: #42b883;
  text-decoration: underline;
}
a.router-link-active {
  text-decoration: underline;
}

/* Router Transition */
.routing-fade-enter-active,
.routing-fade-leave-active {
  transition: opacity 0.3s ease;
}
.routing-fade-enter, .routing-fade-leave-to
/* .routing-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
