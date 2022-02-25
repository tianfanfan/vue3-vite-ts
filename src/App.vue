<template>
  <div>
    <n-config-provider :theme-overrides="themeOverrides">
      <TodoList class="TodoList"></TodoList>
    </n-config-provider>
  </div>
</template>

<script lang="ts">
import TodoList from "./components/todo-list/TodoList.vue";
import { defineComponent } from "vue";
import { GlobalThemeOverrides, NConfigProvider } from "naive-ui";

export default defineComponent({
  name: "App",
  components: { TodoList, NConfigProvider },
  setup: () => {
    const themeOverrides: GlobalThemeOverrides = {
      common: {},
    };
    return {
      themeOverrides,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
<style scoped>
.TodoList {
  width: 800px;
  margin: auto;
}
</style>
