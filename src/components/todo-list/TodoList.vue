<template>
  <div>
    <h3>TODO LIST</h3>
    <InputTask @add="add"></InputTask>

    <n-list bordered>
      <n-list-item v-for="task in todoList" :key="task.title">
        <TodoListItem
          :id="task.id"
          :title="task.title"
          :check="checkedId.includes(task.id)"
          @delete="handlerDeleteTask"
        ></TodoListItem>
      </n-list-item>
    </n-list>
  </div>
</template>

<script lang="ts">
import { useTodoListStore } from "@/store/useTodoListStore";
import _ from "lodash";
import { storeToRefs } from "pinia";
import { defineComponent, onMounted, ref, toRaw, toRefs } from "vue";
import InputTask from "./InputTask.vue";
import TodoListItem from "./TodoListItem.vue";

export default defineComponent({
  name: "TodoList",
  components: {
    TodoListItem,
    InputTask,
  },
  setup: (props) => {
    const todoListStore = useTodoListStore();
    const todoListStoreRef = storeToRefs(todoListStore);
    const { list: todoList } = todoListStoreRef;
    return {
      todoList,
      add(v: string) {
        todoListStore.addTask({
          title: v,
          id: "" + Math.random(),
        });
      },
      checkedId: [] as any[],
      handlerDeleteTask(id: string) {
        todoListStore.deleteTask(id);
      },
    };
  },
});
</script>

<style scoped>
ul {
  padding: 0;
  text-align: left;
}
li {
  list-style: none;
}
</style>
