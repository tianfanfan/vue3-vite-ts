import { createApp } from "vue";
import App from "./App.vue";
import "normalize.css";
import { createPinia } from "pinia";
import naive from "naive-ui";

// 通用字体
// import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";
import { init, useTodoListStore } from "./store/useTodoListStore";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia).use(naive);
app.mount("#app");

init(useTodoListStore)

