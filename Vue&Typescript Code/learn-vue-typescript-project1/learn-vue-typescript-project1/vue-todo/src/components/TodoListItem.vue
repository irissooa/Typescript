<template>
  <li>
    <span class="item" :class="todoItemClass" @click="toggleItem">{{
      todoItem.title
    }}</span>
    <!-- @click="$emit('remove')" 이렇게 바로 emit을 날릴 수 있음 => but 나중에 test할 때 힘듦, 가급적이면 아래 methods에 작성 -->
    <button @click="removeItem">삭제</button>
  </li>
</template>

<script lang="ts">
// Todo interface를 가져와 쓸수 있다
import { Todo } from "@/App.vue";
import Vue, { PropType } from "vue";

export default Vue.extend({
  props: {
    // vue 내부적으로 PropType이란것을 제공함 이건 제너릭을 받기 때문에 원하는 타입을 넘겨줄 수 있다
    todoItem: Object as PropType<Todo>,
    index: Number
  },

  computed: {
    // class가 복잡해졌을때 computed로 만듦(template의 표현식을 단순하게 만들기 위해)
    // computed는 return있기 때문에 반환타입을 적어줘야됨
    // class 반환타입은 string("complete")이거나 null(null)이다
    todoItemClass(): string | null {
      return this.todoItem.done ? "complete" : null;
    }
  },

  methods: {
    toggleItem() {
      this.$emit("toggle", this.todoItem, this.index);
    },
    removeItem() {
      // 몇번째 index인지 가져와서 그걸 토대로 없앰
      this.$emit("remove", this.index);
    }
  }
});
</script>

<style scoped>
.item {
  cursor: pointer;
}
.complete {
  text-decoration: line-through;
}
</style>
