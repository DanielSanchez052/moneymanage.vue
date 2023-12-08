import { createApp } from 'vue'
import './style.css'
import router from "./router"
import { FontAwesomeIcon } from './plugins/font-awesome'
import App from './App.vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from "vue-query";

const store = createPinia()

createApp(App)
.use(router)
.use(store)
.use(VueQueryPlugin)
.component("font-awesome-icon", FontAwesomeIcon)
.mount("#app")