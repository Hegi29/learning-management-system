import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate';
import { VPdfViewer } from '@vue-pdf-viewer/viewer';

import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
app.component('VPdfViewer', VPdfViewer);

const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia)
app.use(router)

app.mount('#app')
