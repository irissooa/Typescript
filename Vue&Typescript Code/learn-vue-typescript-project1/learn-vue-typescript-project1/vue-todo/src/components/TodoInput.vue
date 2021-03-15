<template>
  <div>
    <label for="todo-input">오늘 할 일 : </label>
    <!-- @input은 키보드의 input이벤트 -->
    <input id="todo-input" type="text" :value="item" @input="handleInput" />
    <!-- type="button"은 접근성(?)때문에 적음 -->
    <button @click="addTodo" type="button">추가</button>
    
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  // props: ["item"],
  props: {
    // item이란 type을 정의해줘야됨
    item: {
      type: String,
      // 값은 무조건 있어야됨(필수값)
      required: true
    }
  },
  methods: {
    // input이벤트가 왔을때 App.vue에 emit으로 알려줌
    // event의 InputEvent로 어떻게 추론되는가? 
    handleInput(event: InputEvent) {
      // console.log(event); // target:input인것을 알 수 있다
      // 단언 null이 아니란 것을 알려줘야된다
      // 1) event.target!.value
      // 2) 1)보다 더 safe한 방법
      // if (!event.target) {
      //   return;
      // }
      // 3) 2)를 해도 에러가 난다=> as로 타입단언해주는게 제일 편한 방법(unsafe한 방법이긴하다..)
      const eventTarget = event.target as HTMLInputElement;
      // "input" emit event은 컴포넌트가 대화하기위한 수단
      this.$emit("input", eventTarget.value);
    },
    addTodo() {
      // add emit event올라감
      this.$emit("add");
    }
  }
});
</script>

<style scoped></style>
