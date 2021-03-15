import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route } from "vue-router";
import { ItemView, UserView } from "../views/index";
import createListView from "../views/CreateListView";
import bus from "../utils/bus";
import store from "../store/index";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/news"
    },
    {
      path: "/news",
      name: "news",
      component: createListView("NewsView"),
      // 잘만들어진 라이브러리(router)는 내부적으로 router.d.ts(ts선언파일)가 있음
      async beforeEnter(
        // Route 적고 ctrl+space하면 자동완성으로 위에 import됨
        routeTo: Route,
        routeFrom: Route,
        next: NavigationGuardNext<Vue>
      ) {
        // routeTo.name === 1;
        bus.$emit("on:progress");
        // 최대한 최신문법 (async await)를 쓰는 것이 typescript적용을 잘받음
        // try {
        //   await store.dispatch("FETCH_LIST", routeTo.name);
        //   next();
        // } catch (error) {
        //   new Error("failed to fetch news items");
        // 실패했을 때 error처리도 해줌
        //   // next('/error');
        // }
        next();
        // store
        //   .dispatch("FETCH_LIST", routeTo.name)
        //   .then(() => next())
        //   .catch(() => new Error("failed to fetch news items"));
      }
    },
    {
      path: "/ask",
      name: "ask",
      component: createListView("AskView"),
      beforeEnter(routeTo, routeFrom, next) {
        bus.$emit("on:progress");
        store
          .dispatch("FETCH_LIST", routeTo.name)
          .then(() => next())
          .catch(() => new Error("failed to fetch news items"));
      }
    },
    {
      path: "/jobs",
      name: "jobs",
      component: createListView("JobsView"),
      beforeEnter(routeTo, routeFrom, next) {
        bus.$emit("on:progress");
        store
          .dispatch("FETCH_LIST", routeTo.name)
          .then(() => next())
          .catch(() => new Error("failed to fetch news items"));
      }
    },
    {
      path: "/item/:id",
      component: ItemView,
      beforeEnter(routeTo, routeFrom, next) {
        bus.$emit("on:progress");
        const itemId = routeTo.params.id;
        store
          .dispatch("FETCH_ITEM", itemId)
          .then(() => next())
          .catch(err => new Error("failed to fetch item details"));
      }
    },
    {
      path: "/user/:id",
      component: UserView,
      beforeEnter(routeTo, routeFrom, next) {
        bus.$emit("on:progress");
        const itemId = routeTo.params.id;
        store
          .dispatch("FETCH_USER", itemId)
          .then(() => next())
          .catch(err => new Error("failed to fetch user profile"));
      }
    }
  ]
});
