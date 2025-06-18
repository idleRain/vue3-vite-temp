import axios from 'axios'
import axiosRetry from 'axios-retry'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 15000,
  method: 'post'
})

// 请求失败后重试 3 次
axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: retryCount => retryCount * 500
})

axiosInstance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  async response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.status === 200) {
      return response.data
    }
    return Promise.reject(response)
  },
  error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default axiosInstance
