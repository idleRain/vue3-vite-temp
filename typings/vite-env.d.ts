/// <reference types="vite/client" />

// 环境变量
import type { SupportedLanguagesType } from '@/i18n/typing'

declare interface ImportMetaEnv {
  // 端口号
  readonly VITE_SERVER_PORT: string
  // 代理地址
  readonly VITE_PROXY_URL: string
  // 接口地址
  readonly VITE_BASE_URL: string
  // APP 首选语言
  readonly VITE_APP_LOCALE: SupportedLanguagesType
}
