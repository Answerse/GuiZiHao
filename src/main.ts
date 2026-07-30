import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './styles/variables.css'
import './styles/global.css'
import './styles/home.css'
import './styles/hero-section.css'
import './styles/recommend-section.css'
import './styles/search-section.css'
import './styles/region-section.css'
import './styles/brand-card.css'
import './styles/product-section.css'
import './styles/header.css'
import './styles/header-secondary.css'
import './styles/footer-section.css'
import './styles/detail-page.css'
import './styles/chenpi-tong.css'
import './styles/page-layout.css'
import './styles/search-page.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')