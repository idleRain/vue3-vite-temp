import type { AxiosRequestConfig as BaseAxiosRequestConfig } from 'axios'
import type { Options } from 'ky'

/**
 * 统一的请求配置接口
 */
export interface UnifiedRequestConfig {
  // 是否显示加载状态
  loading?: boolean
  // 是否显示错误提示
  showError?: boolean
  // 自定义错误消息
  errorMessage?: string
  // 请求头
  headers?: Record<string, string>
  // 超时时间（毫秒）
  timeout?: number
  // 查询参数
  params?: Record<string, any>
  // 是否携带凭证（cookies）
  credentials?: boolean
}

/**
 * 统一的错误接口
 */
export interface UnifiedError extends Error {
  status: number
  data: any
}

/**
 * 扩展的 Axios 请求配置
 */
export interface RequestConfig extends BaseAxiosRequestConfig {
  // 是否显示加载状态
  loading?: boolean
  // 是否显示错误提示
  showError?: boolean
  // 自定义错误消息
  errorMessage?: string
}

/**
 * 扩展的 Ky 请求配置
 */
export interface KyRequestOptions extends Options {
  // 是否显示加载状态
  loading?: boolean
  // 是否显示错误提示
  showError?: boolean
  // 自定义错误消息
  errorMessage?: string
}

/**
 * 标准 API 响应格式
 */
export interface ResponseData<T = any> {
  code: number
  data: T
  message: string
  success: boolean
}

/**
 * Ky 错误接口
 */
export interface KyError extends Error {
  status: number
  data: any
  response: Response
}

// 重新导出 Axios 类型以保持一致性
export type AxiosRequestConfig = RequestConfig
