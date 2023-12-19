import { createApp } from 'vue'
import './style.css'
import router from "./router"
import { FontAwesomeIcon } from './plugins/font-awesome'
import App from './App.vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from "vue-query";
import Datepicker from 'flowbite-datepicker/Datepicker';

window.datePicker = Datepicker;

const store = createPinia()

createApp(App)
.use(router)
.use(store)
.use(VueQueryPlugin)
.component("font-awesome-icon", FontAwesomeIcon)
.mount("#app")