import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import landing from './views/landing.vue'
import inpultField from "./components/inputField.vue"
import Logo from './components/logo.vue'
import button from "./components/button.vue"
import 'bootstrap/dist/css/bootstrap.min.css' 
import Dashboard from './views/dashBoard.vue'
import 'bootstrap'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('landing-view', landing);
app.component('input-field', inpultField);
app.component('button-element', button);
app.component('logo-view', Logo);
app.component('dash-board', Dashboard)

app.mount('#app')
