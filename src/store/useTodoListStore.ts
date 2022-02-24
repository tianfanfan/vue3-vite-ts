import { defineStore } from "pinia";
type Task = {
  title: string;
  id: string;
};

interface State {
  list: Array<Task>;
  checkedIds: Array<Task["id"]>;
}

export const useTodoListStore = defineStore("todoListStore", {
  state: () => {
    const state: State = {
      list: [
        {
          title:
            "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
          id: "111",
        },
      ],
      checkedIds: ["111"],
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
    checkTask({ check, id }: { check: boolean; id: string }) {
      if (check) {
        if (!this.checkedIds.includes(id)) this.checkedIds.push(id);
      } else {
        this.checkedIds = this.checkedIds.filter((v) => v !== id);
      }
    },
  },
});
