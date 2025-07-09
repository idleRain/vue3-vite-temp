type StorageType = {
  set: (key: string, value: any) => void
  get: <T = unknown>(key: string) => T | null
  rm: (key: string) => void
  clear: () => void
}

/**
 * 创建统一的 Storage 操作实例
 * @param storage - 使用的 Storage 实例（localStorage 或 sessionStorage）
 */
export const createStorage = (storage: Storage): StorageType => ({
  // 设置
  set: (key: string, value: any): void => {
    if (value === void 0) {
      storage.setItem(key, JSON.stringify(null))
      return
    }

    try {
      const serialized = JSON.stringify(value)
      storage.setItem(key, serialized)
    } catch (error) {
      console.warn(`Failed to serialize data for key "${key}"`, error)
    }
  },

  // 获取
  get: <T = unknown>(key: string): T | null => {
    const item = storage.getItem(key)
    if (item === null) return null

    try {
      return JSON.parse(item) as T
    } catch {
      return item as unknown as T
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
