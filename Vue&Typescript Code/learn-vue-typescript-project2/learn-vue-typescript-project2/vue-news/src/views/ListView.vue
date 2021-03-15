<template>
  <div>
    <ListItem :items="newsItems"></ListItem>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { fetchNews, NewsItem } from "@/api";
import ListItem from "../components/ListItem.vue";

export default Vue.extend({
  components: {
    ListItem
  },

  data() {
    return {
      newsItems: [] as NewsItem[]
    };
  },

  methods: {
    // async await를 쓰면 모든 return값은 Promise! 비동기처리에 실수를 방지할 수 있다(최대한 async await를 써라)
    async fetchNewsItems() {
      const response = await fetchNews();
      this.newsItems = response.data;
    }
  },

  created() {
    this.fetchNewsItems();
  }
});
</script>

<style></style>
