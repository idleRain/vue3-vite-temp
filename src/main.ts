import { createApp } from 'vue'
import '@/styles/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from '@/store'
import router from '@/router'
import { setupI18n } from '@/locales'
import App from './App.vue'

const bootstrap = async () => {
  const app = createApp(App)

  app.config.errorHandler = (err: any, instance, info) => {
    console.groupCollapsed(
      `%c❌[DEBUG] 错误日志: ${err.toString()}`,
      'color: #ff0000; font-weight: bold'
    )
    console.error('Error:', err)
    console.error('Instance:', instance)
    console.error('Info:', info)
    console.groupEnd()
  }

  app.use(pinia)
  app.use(router)
  app.use(ElementPlus)
  await setupI18n(app)

  app.mount('#app')
}

void bootstrap()
