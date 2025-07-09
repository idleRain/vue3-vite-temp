// 测试环境全局类型声明
import type { Ref } from 'vue'
import 'vitest/globals'

declare global {
  // Vue 组合式 API
  const ref: typeof import('vue').ref
  const reactive: typeof import('vue').reactive
  const computed: typeof import('vue').computed
  const watch: typeof import('vue').watch
  const watchEffect: typeof import('vue').watchEffect
  const nextTick: typeof import('vue').nextTick

  // Vue Router
  const useRouter: () => {
    push: (to: any) => void
    replace: (to: any) => void
    go: (delta: number) => void
    back: () => void
    forward: () => void
  }

  const useRoute: () => {
    path: string
    name: string
    params: Record<string, any>
    query: Record<string, any>
    meta: Record<string, any>
  }

  // Vue I18n
  const useI18n: () => {
    t: (key: string) => string
    locale: Ref<string>
    availableLocales: string[]
  }

  // Pinia
  const useStore: () => {
    count: Ref<number>
    increment: () => void
    decrement: () => void
  }
}
