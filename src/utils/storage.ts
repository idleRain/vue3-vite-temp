type StorageType = {
  set: <T>(key: string, value: T) => void
  get: <T = string>(key: string) => T | null
  rm: (key: string) => void
  clear: () => void
}

/**
 * 创建统一的 Storage 操作实例
 * @param storage - 使用的 Storage 实例（localStorage 或 sessionStorage）
 */
const createStorage = (storage: Storage): StorageType => ({
  // 设置
  set: <T>(key: string, value: T): void => {
    try {
      const serialized = JSON.stringify(value)
      storage.setItem(key, serialized)
    } catch (error) {
      console.warn(`Failed to serialize data for key "${key}"`, error)
    }
  },
  // 获取
  get: <T = string>(key: string): T | null => {
    try {
      const item = storage.getItem(key)
      if (item === null) return null
      return JSON.parse(item) as T
    } catch {
      // 返回原始字符串（非 JSON 格式）
      return storage.getItem(key) as unknown as T
    }
  },
  // 删除
  rm: (key: string): void => {
    storage.removeItem(key)
  },
  // 清空
  clear: (): void => {
    storage.clear()
  }
})

/**
 * @Description 对 localStorage 的封装
 * @Author IdleRain
 * @Date 2025/6/18 16:45
 */
export const local = createStorage(window.localStorage)

/**
 * @Description 对 sessionStorage 的封装
 * @Author IdleRain
 * @Date 2025/6/18 16:45
 */
export const session = createStorage(window.sessionStorage)
