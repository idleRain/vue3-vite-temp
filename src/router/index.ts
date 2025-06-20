import { createRouter, createWebHistory } from 'vue-router'
import loading from '@/components/loading'
import routes from './routes'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  loading.show()
  nProgress.start()
  document.title = to.meta.title!
  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
  loading.close()
  nProgress.done()
})

export default router
