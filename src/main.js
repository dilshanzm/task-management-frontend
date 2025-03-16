import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'

// Import vue-toastification and its CSS
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Create and mount the Vue app
createApp(App)
  .use(router)
  .use(store)
  .use(Toast)  // Use the toast plugin
  .mount('#app')
