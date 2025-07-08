# HTTP 请求服务

本项目提供了统一的 HTTP 请求解决方案，支持 **Axios** 和 **Ky** 两种客户端，并提供统一的 API 接口。无论底层使用哪种客户端，开发者都可以使用相同的调用方式。

## 🚀 快速开始

### 1. 配置客户端

在 `src/constants/config.ts` 中配置使用哪种客户端：

```typescript
// 使用 Ky (true) 或 Axios (false)
export const USE_FETCH_API = true

// 请求重试次数
export const RETRY_COUNT = 3
```

### 2. 环境变量配置

在 `.env` 文件中配置 API 相关变量：

```bash
# API 基础地址
VITE_BASE_URL=/api

# 请求重试次数（可选，默认使用 config.ts 中的配置）
VITE_RETRY_COUNT=3
```

## 📚 基本使用

### 导入和类型定义

```typescript
import request, { type UnifiedRequestConfig, type UnifiedError } from '@/services'

// 定义数据类型
interface User {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive'
  createdAt: string
}
```

### 标准 HTTP 方法

```typescript
// GET 请求 - 获取单个用户
const user = await request.get<User>('/users/1')

// GET 请求 - 获取用户列表
const users = await request.get<User[]>('/users')

// POST 请求 - 创建新用户
const newUser = await request.post<User>('/users', {
  name: 'John Doe',
  email: 'john@example.com'
})

// PUT 请求 - 完整更新用户
const updatedUser = await request.put<User>('/users/1', {
  name: 'John Smith',
  email: 'john.smith@example.com',
  status: 'active'
})

// PATCH 请求 - 部分更新用户
const patchedUser = await request.patch<User>('/users/1', {
  status: 'inactive'
})

// DELETE 请求 - 删除用户
await request.delete('/users/1')
```

## ⚙️ 高级配置

### 错误处理配置

```typescript
// 自定义错误消息
const user = await request.get<User>('/users/1', {
  errorMessage: '获取用户信息失败，请稍后重试'
})

// 禁用自动错误提示
const user2 = await request.get<User>('/users/2', {
  showError: false  // 不显示 toast 错误提示
})
```

### 请求头配置

```typescript
// 自定义请求头
const user = await request.get<User>('/api/admin/users/1', {
  headers: {
    'X-Admin-Token': 'admin-secret-token',
    'X-Client-Version': '1.0.0',
    'Accept-Language': 'zh-CN'
  }
})

// 覆盖默认 Content-Type
const result = await request.post('/api/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
```

### 超时和重试配置

```typescript
// 设置自定义超时时间
const longRunningTask = await request.post('/api/process', data, {
  timeout: 30000  // 30秒超时
})

// 对于重要请求，可以通过环境变量调整重试次数
// VITE_RETRY_COUNT=5 (在 .env 文件中配置)
```

### 查询参数配置

```typescript
// GET 请求查询参数
const users = await request.get<User[]>('/users', {
  params: {
    page: 1,
    pageSize: 20,
    status: 'active',
    orderBy: 'createdAt',
    sort: 'desc',
    search: '张三'
  }
})

// 复杂查询参数
const reports = await request.get('/reports', {
  params: {
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    categories: ['sales', 'marketing'],  // 数组参数
    includeDetails: true
  }
})
```

### 凭证和身份验证

```typescript
// 携带 cookies（用于跨域认证）
const userProfile = await request.get<User>('/profile', {
  credentials: true
})

// 组合多种配置
const result = await request.post<ApiResponse>('/api/sensitive-operation', {
  action: 'transfer',
  amount: 1000
}, {
  headers: { 
    'X-Security-Token': securityToken,
    'X-Device-ID': deviceId
  },
  timeout: 10000,
  credentials: true,
  showError: true,
  errorMessage: '操作失败，请检查网络连接后重试'
})
```

### 加载状态集成

```typescript
// 配合 UI 组件的加载状态
const fetchUserData = async () => {
  const users = await request.get<User[]>('/users', {
    loading: true,  // 可以用于触发全局 loading 状态
    errorMessage: '加载用户数据失败'
  })
  return users
}
```

## 🚨 错误处理

### 基础错误处理

```typescript
import type { UnifiedError } from '@/services'

try {
  const user = await request.get<User>('/users/1')
  console.log('用户信息:', user)
} catch (error) {
  const err = error as UnifiedError
  
  console.log('错误状态码:', err.status)
  console.log('错误消息:', err.message)
  console.log('错误数据:', err.data)
  
  // 根据状态码进行不同处理
  switch (err.status) {
    case 401:
      // 未授权，跳转登录（已自动处理）
      break
    case 403:
      // 权限不足
      console.error('您没有权限访问此资源')
      break
    case 404:
      // 资源不存在
      console.error('请求的资源不存在')
      break
    case 500:
      // 服务器错误
      console.error('服务器内部错误，请稍后重试')
      break
    default:
      // 其他错误
      console.error('请求失败:', err.message)
  }
}
```

### 业务错误处理

```typescript
// 后端返回的业务错误格式
interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
  success: boolean
}

try {
  const response = await request.post<User>('/users', userData)
  console.log('创建成功:', response)
} catch (error) {
  const err = error as UnifiedError
  
  // 处理业务逻辑错误
  if (err.data?.code) {
    switch (err.data.code) {
      case 1001:
        console.error('用户名已存在')
        break
      case 1002:
        console.error('邮箱格式不正确')
        break
      case 1003:
        console.error('密码强度不够')
        break
      default:
        console.error('业务错误:', err.data.message)
    }
  } else {
    // 网络或系统错误
    console.error('系统错误:', err.message)
  }
}
```

### 全局错误处理

```typescript
// 在 composable 中封装错误处理逻辑
export const useApiErrorHandler = () => {
  const handleError = (error: UnifiedError) => {
    // 记录错误日志
    console.error('[API Error]', {
      status: error.status,
      message: error.message,
      data: error.data,
      timestamp: new Date().toISOString()
    })
    
    // 发送错误统计
    if (import.meta.env.PROD) {
      // analytics.track('api_error', { ... })
    }
    
    // 根据错误类型处理
    if (error.status >= 500) {
      // 服务器错误，显示友好提示
      ElMessage.error('服务暂时不可用，请稍后重试')
    } else if (error.status === 403) {
      // 权限不足
      ElMessage.warning('您没有权限执行此操作')
    }
  }
  
  return { handleError }
}

// 在组件中使用
const { handleError } = useApiErrorHandler()

try {
  const data = await request.get('/sensitive-data')
} catch (error) {
  handleError(error as UnifiedError)
}
```

### 错误重试和恢复

```typescript
// 自定义重试逻辑
const fetchWithRetry = async <T>(
  url: string, 
  config?: UnifiedRequestConfig,
  maxRetries = 3
): Promise<T> => {
  let lastError: UnifiedError
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await request.get<T>(url, {
        ...config,
        showError: i === maxRetries  // 只在最后一次失败时显示错误
      })
    } catch (error) {
      lastError = error as UnifiedError
      
      // 不重试的错误类型
      if (lastError.status === 401 || lastError.status === 403) {
        throw error
      }
      
      // 等待后重试
      if (i < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
      }
    }
  }
  
  throw lastError!
}

// 使用示例
try {
  const data = await fetchWithRetry<User[]>('/users', { timeout: 5000 }, 3)
} catch (error) {
  console.error('重试后仍然失败:', error)
}
```

## 🔧 高级用法

### 获取原始客户端

```typescript
import { USE_FETCH_API } from '@/constants/config'

// 获取原始 Axios 或 Ky 实例
const rawClient = request.raw

// 使用原始客户端进行复杂操作
if (USE_FETCH_API) {
  // Ky 客户端 - 支持流式响应
  const response = await rawClient.get('stream-endpoint', {
    searchParams: { page: 1, limit: 10 }
  })
  
  // 处理流式数据
  const reader = response.body?.getReader()
  // ...
} else {
  // Axios 客户端 - 支持请求/响应拦截器
  const response = await rawClient.get('complex-endpoint', {
    params: { page: 1, limit: 10 },
    responseType: 'arraybuffer'  // 下载文件
  })
}
```

### 直接使用特定客户端

```typescript
import { kyRequestWrapper, axiosRequestWrapper } from '@/services'

// 强制使用 Ky（现代 fetch API）
const user1 = await kyRequestWrapper.get<User>('/users/1', {
  credentials: 'include',  // Ky 特有配置
  cache: 'no-cache'
})

// 强制使用 Axios（传统 XMLHttpRequest）
const user2 = await axiosRequestWrapper.get<User>('/users/2', {
  withCredentials: true,   // Axios 特有配置
  responseType: 'json'
})
```

### 文件上传和下载

```typescript
// 文件上传
const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('category', 'avatar')
  
  return await request.post<{ url: string }>('/upload', formData, {
    headers: {
      // 不设置 Content-Type，让浏览器自动设置 multipart/form-data
    },
    timeout: 30000,  // 上传文件需要更长超时时间
    showError: true,
    errorMessage: '文件上传失败，请检查文件大小和格式'
  })
}

// 文件下载
const downloadFile = async (fileId: string) => {
  // 使用原始客户端处理二进制数据
  const rawClient = request.raw
  
  if (USE_FETCH_API) {
    // Ky 下载
    const response = await rawClient.get(`/files/${fileId}/download`)
    const blob = await response.blob()
    
    // 创建下载链接
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `file-${fileId}`
    a.click()
    window.URL.revokeObjectURL(url)
  } else {
    // Axios 下载
    const response = await rawClient.get(`/files/${fileId}/download`, {
      responseType: 'blob'
    })
    
    // 处理下载...
  }
}
```

### 请求取消和超时控制

```typescript
// 使用 AbortController 取消请求
const abortController = new AbortController()

// 设置 5 秒后自动取消
setTimeout(() => abortController.abort(), 5000)

try {
  const data = await request.get<User[]>('/users', {
    // 传递 signal 到原始客户端
    signal: abortController.signal  // 需要通过原始客户端使用
  })
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('请求已取消')
  }
}

// 手动取消
document.getElementById('cancel-btn')?.addEventListener('click', () => {
  abortController.abort()
})
```

## 📋 配置选项详解

### UnifiedRequestConfig 接口

```typescript
interface UnifiedRequestConfig {
  // 错误处理
  showError?: boolean      // 是否显示错误提示（默认 true）
  errorMessage?: string    // 自定义错误消息
  
  // 请求配置
  headers?: Record<string, string>  // 自定义请求头
  timeout?: number         // 超时时间（毫秒，默认 15000）
  params?: Record<string, any>      // 查询参数
  credentials?: boolean    // 是否携带凭证/cookies
  
  // UI 集成
  loading?: boolean        // 加载状态标识（预留接口）
}
```

### 环境变量配置

| 变量名 | 说明 | 默认值 | 示例 |
|--------|------|--------|------|
| `VITE_BASE_URL` | API 基础地址 | `/api` | `https://api.example.com` |
| `VITE_RETRY_COUNT` | 重试次数 | `3` | `5` |

## 🚀 功能特性

### 🔧 核心功能
- ✅ **统一接口**: Axios 和 Ky 使用相同的 API 调用方式
- ✅ **类型安全**: 完整的 TypeScript 类型支持和推导  
- ✅ **配置转换**: 自动将统一配置转换为对应客户端格式
- ✅ **错误处理**: 统一的错误处理和标准化响应格式
- ✅ **模块化设计**: 类型声明和实现分离，便于维护

### 🚀 自动功能
- ✅ **自动添加 Token**: 从 localStorage 读取 token 并添加到请求头
- ✅ **自动重试**: 网络错误和服务器错误时自动重试（指数退避）
- ✅ **缓存控制**: GET 请求自动添加时间戳防止缓存
- ✅ **错误提示**: 自动显示错误 toast 提示（基于 vue-sonner）
- ✅ **身份验证**: 401 错误时自动清除 token 并跳转登录页

### 🛡️ 错误处理策略
- **网络错误**: 指数退避重试策略，最多重试 3 次
- **业务错误**: 解析后端返回的错误码和消息
- **权限错误**: 401/403 自动处理，清除认证信息
- **自定义错误**: 支持自定义错误消息和控制显示
- **错误日志**: 自动记录请求错误信息便于调试

### ⚙️ 默认配置
- **超时时间**: 15秒（可自定义）
- **重试次数**: 3次（可通过环境变量配置）
- **重试策略**: 指数退避算法（0.3 * 2^(attempt-1) 秒）
- **内容类型**: `application/json`
- **基础地址**: 从环境变量 `VITE_BASE_URL` 读取

## 📡 API 响应格式

### 标准响应格式

项目假设后端 API 返回以下标准格式：

```typescript
interface ResponseData<T = any> {
  code: number      // 业务状态码，0 表示成功
  data: T          // 实际业务数据
  message: string  // 响应消息
  success: boolean // 是否成功
}
```

### 响应示例

``` json
// 成功响应
{
  "code": 0,
  "data": {
    "id": 1,
    "name": "张三",
    "email": "zhangsan@example.com"
  },
  "message": "操作成功",
  "success": true
}

// 业务错误响应
{
  "code": 1001,
  "data": null,
  "message": "用户名已存在",
  "success": false
}

// 系统错误响应 (HTTP 500)
{
  "code": 5000,
  "data": null,
  "message": "服务器内部错误",
  "success": false
}
```

### 自定义响应格式

如果你的后端 API 格式不同，可以修改响应拦截器：

```typescript
// 在 axiosInstance.ts 中修改响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<YourResponseFormat>) => {
    const { data } = response
    
    // 根据你的 API 格式调整
    if (data.status !== 'success') {  // 假设你的成功标识是 status: 'success'
      const errorMessage = data.error || '请求失败'
      if (config.showError !== false) {
        toast.error(errorMessage)
      }
      return Promise.reject(new Error(errorMessage))
    }
    
    return data.result  // 假设实际数据在 result 字段中
  },
  // ... 错误处理
)
```

## 🔧 开发和调试

### 启用调试模式

```typescript
// 在开发环境中查看详细的请求/响应日志
if (import.meta.env.DEV) {
  // 拦截所有请求，记录详细信息
  const originalGet = request.get
  request.get = async function<T>(...args: any[]): Promise<T> {
    console.group('🔵 GET Request')
    console.log('URL:', args[0])
    console.log('Config:', args[1])
    const start = Date.now()
    
    try {
      const result = await originalGet.apply(this, args)
      console.log('✅ Success:', result)
      console.log('⏱️ Duration:', Date.now() - start + 'ms')
      return result
    } catch (error) {
      console.log('❌ Error:', error)
      console.log('⏱️ Duration:', Date.now() - start + 'ms')
      throw error
    } finally {
      console.groupEnd()
    }
  }
}
```

### 性能监控

```typescript
// 创建性能监控装饰器
const withPerformanceMonitoring = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  methodName: string
): T => {
  return (async (...args: any[]) => {
    const start = performance.now()
    const startMemory = (performance as any).memory?.usedJSHeapSize || 0
    
    try {
      const result = await fn(...args)
      const duration = performance.now() - start
      const endMemory = (performance as any).memory?.usedJSHeapSize || 0
      
      // 记录性能数据
      console.log(`📊 ${methodName} Performance:`, {
        duration: `${duration.toFixed(2)}ms`,
        memoryDelta: `${((endMemory - startMemory) / 1024 / 1024).toFixed(2)}MB`,
        url: args[0]
      })
      
      return result
    } catch (error) {
      const duration = performance.now() - start
      console.error(`📊 ${methodName} Failed:`, {
        duration: `${duration.toFixed(2)}ms`,
        url: args[0],
        error: error.message
      })
      throw error
    }
  }) as T
}

// 应用性能监控
request.get = withPerformanceMonitoring(request.get.bind(request), 'GET')
```

## 🏗️ 项目结构

```
src/services/
├── types.d.ts           # 所有 TypeScript 类型声明
├── axiosInstance.ts     # Axios 客户端配置和拦截器
├── kyInstance.ts        # Ky 客户端配置和拦截器  
├── index.ts            # 统一请求器实现和导出
└── README.md           # 使用文档（本文件）
```

## 🤝 贡献指南

### 添加新功能

1. **类型定义**: 在 `types.d.ts` 中添加新的类型声明
2. **实现功能**: 在相应的实例文件中实现功能
3. **测试**: 确保新功能在 Axios 和 Ky 中都能正常工作
4. **文档**: 更新 README.md 文档

### 修改响应格式

1. 修改 `types.d.ts` 中的 `ResponseData` 接口
2. 更新 `axiosInstance.ts` 和 `kyInstance.ts` 中的响应拦截器
3. 更新文档中的示例

## 📚 参考资料

- [Axios 官方文档](https://axios-http.com/)
- [Ky 官方文档](https://github.com/sindresorhus/ky)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vue 3 Composition API](https://vuejs.org/guide/composition-api/)

---

## 📄 许可证

MIT License - 详见 [LICENSE](../../../LICENSE) 文件。
