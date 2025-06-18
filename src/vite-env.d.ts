/// <reference types="vite/client" />

// 环境变量
declare interface ImportMetaEnv {
  readonly VITE_SERVER_PORT: string
  readonly VITE_PROXY_URL: string
  readonly VITE_BASE_URL: string
  readonly VITE_APP_LOCALE: string
}
