import { defineStore } from "pinia";
type Task = {
  title: string;
  id: string;
};

interface State {
  list: Array<Task>;
  checkedId: Array<Task["id"]>;
}

export const useTodoListStore = defineStore("todoListStore", {
  state: () => {
    const state: State = {
      list: [],
      checkedId: [],
    };
    return state;
  },
  actions: {
    addTask(task: Task) {
      this.list.push(task);
    },
    deleteTask(id: Task["id"]) {
      this.list = this.list.filter((v) => v.id !== id);
    },
  },
});
