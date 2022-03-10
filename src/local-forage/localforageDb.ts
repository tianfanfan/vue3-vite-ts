import localforage from "localforage";

export const localforageDb = localforage.createInstance({
  name: "vue3-vite-ts",
  storeName: "todoList",
});

// @ts-ignore
window.localforageDb = localforageDb;
