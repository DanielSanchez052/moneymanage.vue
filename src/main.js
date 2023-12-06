import { createApp } from 'vue'
import './style.css'
import store from "./store"
import router from "./router"
import { FontAwesomeIcon } from './plugins/font-awesome'
import App from './App.vue'

createApp(App)
.use(store)
.use(router)
.component("font-awesome-icon", FontAwesomeIcon)
.mount("#app")