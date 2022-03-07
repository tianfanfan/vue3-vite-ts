import { createApp } from "vue";
import App from "./App.vue";
import "normalize.css";
import { createPinia } from "pinia";
import naive from "naive-ui";

// 通用字体
// import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";
import { useTodoListStore } from "./store/useTodoListStore";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia).use(naive);

const todoListStore = useTodoListStore();

todoListStore.$subscribe((mutation, state) => {
  console.log(mutation, state)
})
app.mount("#app");
