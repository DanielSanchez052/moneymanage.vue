import './style.css'
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { createApp } from './main'

const { app, router } = createApp()

router.isReady().then(() => {

    app.mount("#app");
  });