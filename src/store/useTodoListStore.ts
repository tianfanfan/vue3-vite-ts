import { localforageDb } from "@/local-forage/localforageDb";
import dayjs, { Dayjs } from "dayjs";
import _, { initial } from "lodash";
import { defineStore } from "pinia";

type Task = {
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

    events.forEach(async (e) => {
      const eType = e.type;
      if (eType === "add") {
        const newValue = e.newValue;
        localforageDb.setItem(newValue.id, newValue);
      }
      if (eType === "set") {
        const target = e.target as any;
        const key = e.key;
        const newValue = e.newValue;
        if ("id" in target) {
          const id = target.id;
          const dbTarget = await localforageDb.getItem<any>(target.id);

          if (dbTarget) {
            dbTarget[key] = newValue;
          }
          await localforageDb.setItem<any>(target.id, dbTarget);
        }
        if ("list" in target) {
          const oldValue = e.oldValue.map((v: { id: string }) => v.id);
          const newValue = e.newValue.map((v: { id: string }) => v.id);
          const needDeleteItemsId = oldValue.filter(
            (v: string) => !newValue.includes(v),
          );
          await Promise.all(
            needDeleteItemsId.map((id: string) => localforageDb.removeItem(id)),
          );
        }
      }
    });
  });

  const initStoreState = async () => {
    const keys = await localforageDb.keys();
    const list = await Promise.all(
      keys.map((k) => localforageDb.getItem<Task>(k)),
    );
    todoListStore.$patch((state) => {
      state.list = list
        .filter((v) => v !== null)
        .sort((a, b) => {
          const aCreateAt = a?.createAt ?? 0;
          const bCreateAt = b?.createAt ?? 0;
          if (aCreateAt > bCreateAt) return 1;
          if (aCreateAt < bCreateAt) return -1;
          return 0;
        }) as Task[];
    });
  };

  await initStoreState();
};
