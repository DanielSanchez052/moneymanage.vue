import { createSSRApp  } from 'vue'
import './style.css'
import { createRouter } from "./router"
import { FontAwesomeIcon } from './plugins/font-awesome'
import App from './App.vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from "vue-query";
import moment from 'moment';

const createApp = () => {
    const app = createSSRApp(App)
    const pinia = createPinia()
    app.use(pinia)
    const router = createRouter()
    app.use(router)
    app.use(VueQueryPlugin)
    app.component("font-awesome-icon", FontAwesomeIcon)
    
    router.beforeEach((to, from) => {
        let loggedIn;

        if(typeof localStorage !== 'undefined'){
          const user = JSON.parse(localStorage.getItem("user")) 
          loggedIn = user && moment(user.expiration) > moment()
        }

        if(to.meta.requiresAuth && !loggedIn){
          return {
            path: '/accounts',
            query: {
              redirectTo: to.fullPath
            }
          }
        }
      });
    
    return {
        app,
        router
    } 
}

export {
    createApp
}
