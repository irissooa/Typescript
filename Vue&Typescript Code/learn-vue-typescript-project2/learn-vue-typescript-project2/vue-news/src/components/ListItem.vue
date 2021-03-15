<template>
  <ul class="news-list">
    <li v-for="news in items" :key="news.id" class="post">
      <div class="points">
        {{ news.points || 0 }}
      </div>
      <div>
        <p class="news-title">
          <template v-if="news.domain">
            <a :href="news.url">{{ news.title }}</a
            ><small class="link-text" v-if="news.domain"
              >({{ news.domain }})</small
            >
          </template>
          <template v-else>
            <router-link :to="`/item/${news.id}`">{{ news.title }}</router-link
            ><small
              ><a class="link-text" :href="news.domain" v-if="news.domain"
                >({{ news.domain }})</a
              ></small
            >
          </template>
        </p>
        <small v-if="news.user" class="link-text">
          by
          <router-link :to="`/user/${news.user}`" class="link-text">{{
            news.user
          }}</router-link>
        </small>
        <small v-if="news.time_ago" class="link-text">
          <!-- news.time_ago가 string인것을 알기 때문에 concat함수를 바로 쓴다, 만약 오타가 났거나 할 떄 debugging을 잘하기 위해서 computed에 써야됨  -->
          <!-- {{ news.time_ago.concat(", 2021") }} -->
          {{ timeAgo(news) }}
        </small>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { NewsItem } from "@/api";
import Vue, { PropType } from "vue";

export default Vue.extend({
  // vpr -> props 단축키
  props: {
    items: {
      // PropType은 Vue내부적 제공 type
      type: Array as PropType<NewsItem[]>,
      required: true
    }
  },

  methods: {
    // v-for을 돌렸기 때문에 method로 옴
    timeAgo(news: NewsItem): string {
      return news.time_ago.concat(", 2021");
    }
  },

  computed: {
    // template이 아니라 computed에 작성해야지 훨씬 안정적으로 코드를 작성할 수 있음(하지만 여기서는 v-for를 돌렸기 때문에 method로 가야됨)
    // timeAgo(): string {
    //   return this.items[0].time_ago.concat()
    // },
    // 원래는 store에서 가져왔음
    // listItems(): any {
    //   return this.$store.getters.fetchedList;
    // }
  }
});
</script>

<style scoped>
.news-list {
  padding: 0;
  margin: 0;
}
.post {
  list-style: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.points {
  width: 80px;
  height: 60px;
  color: #42b883;
  display: flex;
  align-items: center;
  justify-content: center;
}
.link-text {
  color: #828282;
}
.news-title {
  margin: 0;
}
</style>
