import { defineStore } from "pinia";
import { useTodoListStore } from "./useTodoListStore";

export const userUserStore = defineStore("userStore", {
  state: () => {
    return {
      name: "Eduardo",
      isAdmin: true,
    };
  },
  actions: {
    async login() {
      const todoListStore = useTodoListStore();
    },
  },
});
