import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap/dist/js/bootstrap.js"
// import bootstrap from  "bootstrap/dist/js/bootstrap.bundle.js"
import "bootstrap/dist/css/bootstrap.min.css"

const app = createApp(App)

app.use(router)
// app.use(bootstrap)
app.mount('#app')