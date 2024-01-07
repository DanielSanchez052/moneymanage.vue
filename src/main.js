import { createSSRApp  } from 'vue'
import './style.css'
import { createRouter } from "./router"
import { FontAwesomeIcon } from './plugins/font-awesome'
import App from './App.vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from "vue-query";
import moment from 'moment/moment';

import "moment/locale/es"

const createApp = () => {
    const app = createSSRApp(App)
    const pinia = createPinia()
    app.use(pinia)
    const router = createRouter()
    app.use(router)
    app.use(VueQueryPlugin)
    app.component("font-awesome-icon", FontAwesomeIcon)

    moment.locale("es")
    
    return {
        app,
        router
    } 
}

export {
    createApp
}
