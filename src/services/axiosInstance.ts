import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios'
import type { RequestConfig, ResponseData } from './types'
import { RETRY_COUNT } from '@/constants/config'
import axiosRetry from 'axios-retry'
import { toast } from 'vue-sonner'

const createAxios = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || '/api',
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // 请求失败后重试配置
  axiosRetry(axiosInstance, {
    retries: RETRY_COUNT,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error: AxiosError) => {
      // 网络错误或 5xx 服务器错误时重试
      return (
        axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        (error.response?.status !== undefined && error.response.status >= 500)
      )
    }
  })

  // 请求拦截器
  axiosInstance.interceptors.request.use(
    config => {
      // 添加 token 到请求头
      const token = localStorage.getItem('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }

      // 请求时间戳，防止缓存
      if (config.method === 'get') {
        config.params = {
          ...config.params,
          _t: Date.now()
        }
      }

      return config
    },
    error => {
      console.error('请求拦截器错误:', error)
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<ResponseData>) => {
      const { data } = response
      const config = response.config as RequestConfig

      // 处理业务逻辑错误
      if (data.code !== undefined && data.code !== 0) {
        const errorMessage = config.errorMessage || data.message || '请求失败'

        if (config.showError !== false) {
          toast.error(errorMessage)
        }

        return Promise.reject(new Error(errorMessage))
      }

      // 返回业务数据
      return data.data !== undefined ? data.data : data
    },
    (error: AxiosError) => {
      const config = error.config as RequestConfig
      let errorMessage = config?.errorMessage || '网络请求失败'

      // 根据状态码设置错误消息
      if (error.response) {
        const { status } = error.response
        switch (status) {
          case 400:
            errorMessage = '请求参数错误'
            break
          case 401:
            errorMessage = '未授权，请重新登录'
            // 清除本地 token 并跳转到登录页
            localStorage.removeItem('token')
            window.location.href = '/login'
            break
          case 403:
            errorMessage = '拒绝访问'
            break
          case 404:
            errorMessage = '请求的资源不存在'
            break
          case 500:
            errorMessage = '服务器内部错误'
            break
          default:
            errorMessage = `请求失败 (${status})`
        }
      } else if (error.request) {
        errorMessage = '网络连接失败，请检查网络'
      }

      // 显示错误提示
      if (config?.showError !== false) {
        toast.error(errorMessage)
      }

      console.error('请求错误:', error)
      return Promise.reject(error)
    }
  )

  return axiosInstance
}

export default createAxios
