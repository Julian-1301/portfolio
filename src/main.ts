import { createApp } from 'vue'
import '@fontsource-variable/familjen-grotesk/wght.css'
import '@fontsource-variable/source-serif-4/opsz.css'
import App from './App.vue'
import { router } from './router'
import './styles/tokens.css'
import './styles/base.css'

createApp(App).use(router).mount('#app')
