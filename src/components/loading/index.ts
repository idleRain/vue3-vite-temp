import LoadingComponent from './loading.vue'
import { createApp } from 'vue'

let loadingInstance: any = null

export const loading = {
  name: 'loading',
  show() {
    if (loadingInstance) return
    const mountNode = document.createElement('div')
    loadingInstance = createApp(LoadingComponent).mount(mountNode)
    document.body.appendChild(mountNode)
  },

  close() {
    if (loadingInstance) {
      const el = loadingInstance.$el
      if (el.parentNode) document.body.removeChild(el.parentNode)
      loadingInstance = null
    }
  }
}

export default loading
