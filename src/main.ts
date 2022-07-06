import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/index.css";
import { createPinia } from "pinia";
import router from "./router/index";
import "element-plus/theme-chalk/el-message.css";

const app = createApp(App);

app.use(router).use(createPinia()).mount("#app");
