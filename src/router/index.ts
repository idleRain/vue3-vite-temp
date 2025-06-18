import { createRouter, createWebHistory } from 'vue-router'
import loading from '@/components/loading'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'example'
    },
    {
      path: '/example',
      redirect: {
        path: '/example/example'
      },
      component: () => import('@/views/layouts/example.vue'),
      children: [
        {
          path: 'example',
          name: 'example',
          component: () => import('@/views/example/index.vue'),
          meta: {
            title: 'Example'
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  loading.show()
  document.title = to.meta.title!
  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
  loading.close()
})

export default router
