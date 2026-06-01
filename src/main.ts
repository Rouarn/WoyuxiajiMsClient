import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './assets/css/reset.css'
import './assets/css/theme.css'
import App from './App.vue'
import router from './router'

gsap.registerPlugin(ScrollTrigger)

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.mount('#app')
