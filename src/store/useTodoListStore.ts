import _ from "lodash";
import { defineStore } from "pinia";
type Task = {
  title: string;
  id: string;
  finished: boolean;
  active: boolean;
};

interface State {
  list: Array<Task>;
}

export const useTodoListStore = defineStore("todoListStore", {
  state: () => {
    const state: State = {
      list: [],
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
    checkTask({ active, id }: { active: boolean; id: string }) {
      this.list.forEach((task) => {
        if (task.id === id) {
          task.active = active;
        }
      });
    },

    editTask({ id, title }: { id: string; title: string }) {
      const currentTask = this.list.find((v) => v.id === id);
      if (currentTask?.title) {
        currentTask.title = title;
      }
    },

    completeTasks(ids: string[]) {
      this.list.forEach((task) => {
        if (ids.includes(task.id)) {
          task.finished = true;
          task.active = false;
        }
      });
    },
  },
});
