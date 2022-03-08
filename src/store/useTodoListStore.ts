import { localforageDb } from "@/local-forage/localforageDb";
import _, { initial } from "lodash";
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

type UseTodoListStore = typeof useTodoListStore;

export const init = async (useTodoListStore: UseTodoListStore) => {
  const todoListStore = useTodoListStore();

  todoListStore.$subscribe((mutation, state) => {
    const events = Array.isArray(mutation.events)
      ? mutation.events
      : [mutation.events];
    const eventTypes = events.map((v) => v.type);
    const isOnlyAdd = eventTypes.every((v) => v === "add");

    events.forEach((e) => {
      const eType = e.type;
      if (eType === "add") {
        const newValue = e.newValue;
        localforageDb.setItem(newValue.id, newValue);
      }
    });
    console.log(mutation, state, isOnlyAdd);
  });

  const initStoreState = async () => {
    const keys = await localforageDb.keys();
    const list = await Promise.all(
      keys.map((k) => localforageDb.getItem<Task>(k)),
    );
    todoListStore.$patch((state) => {
      state.list = list.filter((v) => v !== null) as Task[];
    });
  };

  await initStoreState();
};
