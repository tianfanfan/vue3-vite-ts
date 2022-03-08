<template>
  <div>
    <h3>TODO LIST</h3>
    <InputTask @add="add"></InputTask>
    <n-menu
      v-model:value="activeKey"
      mode="horizontal"
      :options="menuOptions"
    />

    <div class="main">
      <n-list bordered>
        <n-list-item v-for="task in todoList" :key="task.id" class="item">
          <todo-list-item
            :id="task.id"
            :title="task.title"
            :active="task.active"
            :finished="task.finished"
            @delete="handlerDeleteTask"
            @active-task="handlerChoseTask"
            @edit-task="handlerEditTask"
          ></todo-list-item>
        </n-list-item>
      </n-list>
      <n-empty v-if="todoList.length === 0" description="NONE"></n-empty>
    </div>
    <div class="footer">
      <div class="progress">
        <h4>finishedPercentage</h4>
        <n-progress
          type="line"
          border-radius="0"
          :percentage="finishedPercentage"
          :color="themeVars.successColor"
          :rail-color="changeColor(themeVars.successColor, { alpha: 0.2 })"
          :indicator-text-color="themeVars.successColor"
        />
      </div>
      <div class="progress">
        <h4>activePercentage</h4>
        <n-progress
          type="line"
          border-radius="0"
          :percentage="activePercentage"
        />
      </div>
      <div class="gap"></div>
      <n-button :disabled="disableFinish" @click="handlerComplete">
        Finish
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTodoListStore } from "@/store/useTodoListStore";
import _ from "lodash";
import { storeToRefs } from "pinia";
import InputTask from "./InputTask.vue";
import TodoListItem from "./TodoListItem.vue";
import { computed, ref, toRaw } from "vue";
import { useThemeVars } from "naive-ui";
import { changeColor } from "seemly";
import { randomId } from "@/util/randomId";

const themeVars = useThemeVars();
const todoListStore = useTodoListStore();
const todoListStoreRef = storeToRefs(todoListStore);
const { list } = todoListStoreRef;

const activeKey = ref("ALL");
console.log(activeKey);
const menuOptions = [
  {
    label: "ALL",
    key: "ALL",
  },
  {
    label: "ACTIVE",
    key: "ACTIVE",
  },
  {
    label: "FINISHED",
    key: "FINISHED",
  },
];
const add = (v: string) => {
  todoListStore.addTask({
    title: v,
    id: randomId(),
    finished: false,
    active: false,
  });
};

const todoList = computed(() => {
  switch (activeKey.value) {
    case "ALL":
      return list.value;
    case "ACTIVE":
      return list.value.filter((v) => v.active);
    case "FINISHED":
      return list.value.filter((v) => v.finished);
    default:
      return list.value;
  }
});

const finishedPercentage = computed(() => {
  const finishedCount = list.value.filter((v) => v.finished).length;
  const allCount = list.value.length;
  const p = finishedCount / allCount;
  return allCount === 0 ? 0 : _.clamp(_.toInteger(p * 100), 0, 100);
});

const activePercentage = computed(() => {
  const finishedCount = list.value.filter((v) => v.active).length;
  const allCount = list.value.length;
  const p = finishedCount / allCount;
  return allCount === 0 ? 0 : _.clamp(_.toInteger(p * 100), 0, 100);
});

const disableFinish = computed(() => {
  return todoList.value.filter((v) => v.active).length === 0;
});

const handlerDeleteTask = (id: string) => {
  todoListStore.deleteTask(id);
};
const handlerChoseTask = (payload: { active: boolean; id: string }) => {
  todoListStore.checkTask(payload);
};
const handlerEditTask = (payload: { title: string; id: string }) => {
  todoListStore.editTask(payload);
};

const handlerComplete = () => {
  todoListStore.completeTasks(
    list.value.filter((v) => v.active).map((v) => v.id),
  );
};
</script>
<style scoped lang="less">
ul {
  padding: 0;
  text-align: left;
}
li {
  list-style: none;
}

/* fix: flex 布局无限扩宽问题 */
.item :deep(.n-list-item__main) {
  min-width: 0;
}

.main {
  max-height: 80vh;
  overflow-y: auto;
}
.footer {
  display: flex;
  align-items: center;
  .gap {
    flex: 1 1 auto;
  }
  .progress {
    max-width: 100%;
    flex: 0 0 auto;
    width: 200px;
    margin-right: 12px;
    padding-top: 4px;
    padding-bottom: 4px;
  }
}
</style>
