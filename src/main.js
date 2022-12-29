import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueFinalModal from 'vue-final-modal'
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App)

app.use(Router)
app.use(VueAxios, axios)
app.use(VueFinalModal)
app.use(Notifications)
app.mount('#app')
//variables globales
const uri ={
    local : 'http://localhost:8888',
    production : '',
}
//Uri 
app.config.globalProperties.$uri = uri.local