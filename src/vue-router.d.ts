import 'vue-router'

declare module 'vue-router' {
  // 定义路由 meta 参数类型
  interface RouteMeta {
    title?: string
    icon?: string
  }
}
