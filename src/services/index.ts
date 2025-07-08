import type {
  UnifiedRequestConfig,
  UnifiedError,
  AxiosRequestConfig,
  KyRequestOptions,
  ResponseData,
  KyError
} from './types'
import { USE_FETCH_API } from '@/constants/config'
import type { AxiosInstance } from 'axios'
import createAxios from './axiosInstance'
import type { KyInstance } from 'ky'
import createKy from './kyInstance'

// 创建请求实例
const kyRequest = createKy()
const axiosRequest = createAxios()

// 请求方法包装器
class RequestWrapper {
  private readonly client: AxiosInstance | KyInstance
  private readonly isKy: boolean

  constructor(client: AxiosInstance | KyInstance, isKy: boolean) {
    this.client = client
    this.isKy = isKy
  }

  /**
   * 转换统一配置为对应客户端的配置
   */
  private transformConfig(config?: UnifiedRequestConfig): AxiosRequestConfig | KyRequestOptions {
    if (!config) return {}

    if (this.isKy) {
      // Ky 配置转换
      const kyConfig: KyRequestOptions = {}

      // 只有当属性有值时才添加到配置中
      if (config.showError !== undefined) {
        kyConfig.showError = config.showError
      }

      if (config.errorMessage !== undefined) {
        kyConfig.errorMessage = config.errorMessage
      }

      if (config.loading !== undefined) {
        kyConfig.loading = config.loading
      }

      if (config.headers) {
        kyConfig.headers = config.headers
      }

      if (config.timeout) {
        kyConfig.timeout = config.timeout
      }

      if (config.params) {
        kyConfig.searchParams = config.params
      }

      if (config.credentials !== undefined) {
        kyConfig.credentials = config.credentials ? 'include' : 'omit'
      }

      return kyConfig
    } else {
      // Axios 配置转换
      const axiosConfig: AxiosRequestConfig = {}

      // 只有当属性有值时才添加到配置中
      if (config.showError !== undefined) {
        axiosConfig.showError = config.showError
      }

      if (config.errorMessage !== undefined) {
        axiosConfig.errorMessage = config.errorMessage
      }

      if (config.loading !== undefined) {
        axiosConfig.loading = config.loading
      }

      if (config.headers) {
        axiosConfig.headers = config.headers
      }

      if (config.timeout) {
        axiosConfig.timeout = config.timeout
      }

      if (config.params) {
        axiosConfig.params = config.params
      }

      if (config.credentials !== undefined) {
        axiosConfig.withCredentials = config.credentials
      }

      return axiosConfig
    }
  }

  /**
   * GET 请求
   */
  async get<T = any>(url: string, config?: UnifiedRequestConfig): Promise<T> {
    try {
      const transformedConfig = this.transformConfig(config)

      if (this.isKy) {
        const kyClient = this.client as KyInstance
        return await kyClient.get(url, transformedConfig as KyRequestOptions).json<T>()
      } else {
        const axiosClient = this.client as AxiosInstance
        const response = await axiosClient.get<ResponseData<T>>(
          url,
          transformedConfig as AxiosRequestConfig
        )
        return response as unknown as T
      }
    } catch (error) {
      throw this.normalizeError(error)
    }
  }

  /**
   * POST 请求
   */
  async post<T = any>(url: string, data?: any, config?: UnifiedRequestConfig): Promise<T> {
    try {
      const transformedConfig = this.transformConfig(config)

      if (this.isKy) {
        const kyClient = this.client as KyInstance
        return await kyClient
          .post(url, {
            json: data,
            ...(transformedConfig as KyRequestOptions)
          })
          .json<T>()
      } else {
        const axiosClient = this.client as AxiosInstance
        const response = await axiosClient.post<ResponseData<T>>(
          url,
          data,
          transformedConfig as AxiosRequestConfig
        )
        return response as unknown as T
      }
    } catch (error) {
      throw this.normalizeError(error)
    }
  }

  /**
   * PUT 请求
   */
  async put<T = any>(url: string, data?: any, config?: UnifiedRequestConfig): Promise<T> {
    try {
      const transformedConfig = this.transformConfig(config)

      if (this.isKy) {
        const kyClient = this.client as KyInstance
        return await kyClient
          .put(url, {
            json: data,
            ...(transformedConfig as KyRequestOptions)
          })
          .json<T>()
      } else {
        const axiosClient = this.client as AxiosInstance
        const response = await axiosClient.put<ResponseData<T>>(
          url,
          data,
          transformedConfig as AxiosRequestConfig
        )
        return response as unknown as T
      }
    } catch (error) {
      throw this.normalizeError(error)
    }
  }

  /**
   * PATCH 请求
   */
  async patch<T = any>(url: string, data?: any, config?: UnifiedRequestConfig): Promise<T> {
    try {
      const transformedConfig = this.transformConfig(config)

      if (this.isKy) {
        const kyClient = this.client as KyInstance
        return await kyClient
          .patch(url, {
            json: data,
            ...(transformedConfig as KyRequestOptions)
          })
          .json<T>()
      } else {
        const axiosClient = this.client as AxiosInstance
        const response = await axiosClient.patch<ResponseData<T>>(
          url,
          data,
          transformedConfig as AxiosRequestConfig
        )
        return response as unknown as T
      }
    } catch (error) {
      throw this.normalizeError(error)
    }
  }

  /**
   * DELETE 请求
   */
  async delete<T = any>(url: string, config?: UnifiedRequestConfig): Promise<T> {
    try {
      const transformedConfig = this.transformConfig(config)

      if (this.isKy) {
        const kyClient = this.client as KyInstance
        return await kyClient.delete(url, transformedConfig as KyRequestOptions).json<T>()
      } else {
        const axiosClient = this.client as AxiosInstance
        const response = await axiosClient.delete<ResponseData<T>>(
          url,
          transformedConfig as AxiosRequestConfig
        )
        return response as unknown as T
      }
    } catch (error) {
      throw this.normalizeError(error)
    }
  }

  /**
   * 统一错误处理
   */
  private normalizeError(error: any): UnifiedError {
    const unifiedError = new Error() as UnifiedError

    if (this.isKy && error && typeof error === 'object') {
      // Ky 错误处理
      const kyError = error as KyError
      unifiedError.message = kyError.message || '请求失败'
      unifiedError.status = kyError.status || 0
      unifiedError.data = kyError.data
    } else if (error.response) {
      // Axios 错误处理
      unifiedError.message = error.message || '请求失败'
      unifiedError.status = error.response.status || 0
      unifiedError.data = error.response.data
    } else {
      // 其他错误
      unifiedError.message = error.message || '未知错误'
      unifiedError.status = 0
      unifiedError.data = null
    }

    return unifiedError
  }

  /**
   * 获取原始客户端实例
   */
  get raw(): AxiosInstance | KyInstance {
    return this.client
  }
}

// 创建统一的请求实例
const kyRequestWrapper = new RequestWrapper(kyRequest, true)
const axiosRequestWrapper = new RequestWrapper(axiosRequest, false)

// 根据配置选择请求客户端，参数统一，可自由切换
const request = USE_FETCH_API ? kyRequestWrapper : axiosRequestWrapper

// 导出实例和类型
export { kyRequest, axiosRequest, kyRequestWrapper, axiosRequestWrapper, request, RequestWrapper }

// 重新导出类型
export type {
  UnifiedRequestConfig,
  UnifiedError,
  AxiosRequestConfig,
  KyRequestOptions,
  ResponseData,
  KyError
} from './types'

export default request
