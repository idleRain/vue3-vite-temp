import { beforeEach, vi } from 'vitest'

// 创建内存存储模拟
const createStorageMock = () => {
  const storage = new Map<string, string>()

  return {
    getItem: vi.fn((key: string) => storage.get(key) || null),
    setItem: vi.fn((key: string, value: string) => {
      storage.set(key, value)
    }),
    removeItem: vi.fn((key: string) => {
      storage.delete(key)
    }),
    clear: vi.fn(() => {
      storage.clear()
    }),
    // 辅助方法用于测试
    _storage: storage
  }
}

const localStorageMock = createStorageMock()
const sessionStorageMock = createStorageMock()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
})

// 模拟 window.location
const locationMock = {
  href: 'http://localhost:3000',
  origin: 'http://localhost:3000',
  pathname: '/',
  search: '',
  hash: ''
}

Object.defineProperty(window, 'location', {
  value: locationMock,
  writable: true
})

// 模拟 fetch API
global.fetch = vi.fn()

// 每个测试前重置所有 mock
beforeEach(() => {
  vi.clearAllMocks()
  localStorageMock.clear()
  sessionStorageMock.clear()
  locationMock.href = 'http://localhost:3000'
})
