import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
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
    component: () => import('@/layouts/ExampleLayout.vue'),
    children: [
      {
        path: 'example',
        name: 'example',
        component: () => import('@/views/example/index.vue'),
        meta: {
          title: 'Example Page'
        }
      }
    ]
  }
]

export default routes
