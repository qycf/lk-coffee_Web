import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import AOS from "aos";
import "../node_modules/aos/dist/aos.css";
const app = createApp(App);

app.use(router);
app.config.globalProperties.$aos = AOS;
app.use(createPinia().use(piniaPluginPersistedstate));
AOS.init();
app.mount("#app");
