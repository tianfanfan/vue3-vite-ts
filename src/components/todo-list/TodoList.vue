<template>
  <div>
    <h3>TODO LIST</h3>
    <InputTask @add="add"></InputTask>

    <n-list bordered>
      <n-list-item v-for="task in todoList" :key="task.id" class="item">
        <todo-list-item
          :id="task.id"
          :title="task.title"
          :check="getChecked(task.id)"
          @delete="handlerDeleteTask"
          @chose-task="handlerChoseTask"
          @edit-task="handlerEditTask"
        ></todo-list-item>
      </n-list-item>
    </n-list>
    <div class="footer">
      <div class="progress">
        <n-progress
          status="success"
          type="line"
          border-radius="0"
          :show-indicator="false"
          :percentage="20"
        />
      </div>
      <n-button>Oops!</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTodoListStore } from "@/store/useTodoListStore";
import _ from "lodash";
import { storeToRefs } from "pinia";
import InputTask from "./InputTask.vue";
import TodoListItem from "./TodoListItem.vue";
import { computed, defineComponent } from "vue";

const todoListStore = useTodoListStore();
const todoListStoreRef = storeToRefs(todoListStore);
const { list: todoList, checkedIds } = todoListStoreRef;

const add = (v: string) => {
  todoListStore.addTask({
    title: v,
    id: `${Math.random()}`,
  });
};

const handlerDeleteTask = (id: string) => {
  todoListStore.deleteTask(id);
};
const handlerChoseTask = (payload: { check: boolean; id: string }) => {
  todoListStore.checkTask(payload);
};
const handlerEditTask = (payload: { title: string; id: string }) => {
  todoListStore.editTask(payload);
};

const getChecked = computed(() => {
  return (id: string) => {
    return checkedIds.value.includes(id);
  };
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

/* fix: flex 布局无限扩宽问题 */
.item :deep() .n-list-item__main {
  min-width: 0;
}

.footer {
  display: flex;
  align-items: center;
}
.progress {
  max-width: 100%;
  flex: 1 1 auto;
  margin-right: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>
