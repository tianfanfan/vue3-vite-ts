import { subscribe, todoListService } from "@/service/todoListService";
import { getMd5FromArray, md5 } from "@/util/md5";
import _ from "lodash";
import { defineStore } from "pinia";

export type Task = {
  title: string;
  id: string;
  finished: boolean;
  active: boolean;
  createAt: number;
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
    async addTask(task: Pick<Task, "createAt" | "title">) {
      await todoListService.addItem(task);
    },

    async deleteTask(id: Task["id"]) {
      await todoListService.deleteItems([id]);
    },

    async checkTask({ active, id }: { active: boolean; id: string }) {
      await this.editTask([
        {
          active,
          id,
        },
      ]);
    },

    async editTask(tasks: Array<Partial<Task>>) {
      await todoListService.editItems(tasks);
    },

    async completeTasks(ids: string[]) {
      this.editTask(
        ids.map((id) => {
          return {
            id,
            finished: true,
            active: false,
          };
        }),
      );
    },

    async checkDataAccuracy() {
      const ids = this.list.map((v) => v.id);
      const hash1 = getMd5FromArray(ids);
      const hash2 = await todoListService.getLastItemHash(ids.length);
      if (hash1 !== hash2) {
        // 需要重刷
        this.getAllTask();
      }
    },
    checkDataAccuracyDebounce: _.debounce(checkDataAccuracy),
    async getAllTask() {
      const list = await todoListService.getAllItem();
      this.list = list;
    },

    async handlerEditTaskSuccess(newTasks: Array<Task>) {
      newTasks.forEach((v) => {
        const taskIndex = this.list.findIndex((item) => item.id === v.id);
        if (taskIndex >= 0) {
          this.list[taskIndex] = v;
        }
      });
    },

    async handlerRemoveTaskSuccess(ids: Array<string>) {
      this.list = this.list.filter((task) => {
        return !ids.includes(task.id);
      });
    },

    async handlerAddTaskSuccess(task: Task) {
      this.list.push(task);

      this.checkDataAccuracy();
    },
  },
});

type UseTodoListStore = typeof useTodoListStore;

export const init = async (useTodoListStore: UseTodoListStore) => {
  const todoListStore = useTodoListStore();

  subscribe("add", (item: Task, key) => {
    todoListStore.handlerAddTaskSuccess(item);
  });

  subscribe("edit", (item: Task[]) => {
    todoListStore.handlerEditTaskSuccess(item);
  });

  subscribe("remove", (ids: Array<string>) => {
    todoListStore.handlerRemoveTaskSuccess(ids);
  });

  todoListStore.getAllTask();
};
