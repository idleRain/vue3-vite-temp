import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { session, local } from '../storage'

// Mock console.warn to avoid test output noise
const originalWarn = console.warn
beforeEach(() => {
  console.warn = vi.fn()
})

afterEach(() => {
  console.warn = originalWarn
})

describe('Storage Utilities', () => {
  beforeEach(() => {
    // 清理模拟的 localStorage 和 sessionStorage
    localStorage.clear()
    sessionStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Local Storage Operations', () => {
    it('should set and get string values', () => {
      local.set('testKey', 'testValue')
      expect(local.get('testKey')).toBe('testValue')
    })

    it('should set and get object values', () => {
      const testObject = { name: 'test', age: 25 }
      local.set('testObject', testObject)
      expect(local.get('testObject')).toEqual(testObject)
    })

    it('should set and get array values', () => {
      const testArray = [1, 2, 3, 'test']
      local.set('testArray', testArray)
      expect(local.get('testArray')).toEqual(testArray)
    })

    it('should return null for non-existent keys', () => {
      expect(local.get('nonExistentKey')).toBeNull()
    })

    it('should remove items correctly', () => {
      local.set('removeTest', 'value')
      expect(local.get('removeTest')).toBe('value')

      local.rm('removeTest')
      expect(local.get('removeTest')).toBeNull()
    })

    it('should clear all storage', () => {
      local.set('key1', 'value1')
      local.set('key2', 'value2')

      local.clear()

      expect(local.get('key1')).toBeNull()
      expect(local.get('key2')).toBeNull()
    })

    it('should handle JSON parsing errors gracefully', () => {
      // 直接向 localStorage 设置无效的 JSON
      localStorage.setItem('invalidJSON', '{invalid json}')

      // 应该返回原始字符串，而不是抛出错误
      const result = local.get('invalidJSON')
      expect(result).toBe('{invalid json}')
    })

    it('should handle boolean values', () => {
      local.set('boolTrue', true)
      local.set('boolFalse', false)

      expect(local.get('boolTrue')).toBe(true)
      expect(local.get('boolFalse')).toBe(false)
    })

    it('should handle number values', () => {
      local.set('numberInt', 42)
      local.set('numberFloat', 3.14)
      local.set('numberZero', 0)

      expect(local.get('numberInt')).toBe(42)
      expect(local.get('numberFloat')).toBe(3.14)
      expect(local.get('numberZero')).toBe(0)
    })

    it('should handle null and undefined values', () => {
      local.set('nullValue', null)
      local.set('undefinedValue', undefined)

      expect(local.get('nullValue')).toBeNull()
      expect(local.get('undefinedValue')).toBeNull()
    })

    it('should handle nested objects', () => {
      const nestedObject = {
        user: {
          profile: {
            name: 'John Doe',
            settings: {
              theme: 'dark',
              notifications: true
            }
          }
        }
      }

      local.set('nestedObject', nestedObject)
      expect(local.get('nestedObject')).toEqual(nestedObject)
    })

    it('should handle complex data types', () => {
      // 测试日期对象
      const date = new Date('2024-01-01')
      local.set('dateValue', date)

      // 应该返回日期字符串
      expect(local.get('dateValue')).toBe(date.toISOString())

      // 测试数组中的对象
      const complexArray = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2', meta: { active: true } }
      ]
      local.set('complexArray', complexArray)
      expect(local.get('complexArray')).toEqual(complexArray)
    })
  })

  describe('Session Storage Operations', () => {
    it('should set and get string values', () => {
      session.set('sessionKey', 'sessionValue')
      expect(session.get('sessionKey')).toBe('sessionValue')
    })

    it('should set and get object values', () => {
      const testObject = { type: 'session', data: 'test' }
      session.set('sessionObject', testObject)
      expect(session.get('sessionObject')).toEqual(testObject)
    })

    it('should remove session items correctly', () => {
      session.set('sessionRemoveTest', 'value')
      expect(session.get('sessionRemoveTest')).toBe('value')

      session.rm('sessionRemoveTest')
      expect(session.get('sessionRemoveTest')).toBeNull()
    })

    it('should clear all session storage', () => {
      session.set('sessionKey1', 'value1')
      session.set('sessionKey2', 'value2')

      session.clear()

      expect(session.get('sessionKey1')).toBeNull()
      expect(session.get('sessionKey2')).toBeNull()
    })

    it('should handle JSON parsing errors gracefully', () => {
      // 直接向 sessionStorage 设置无效的 JSON
      sessionStorage.setItem('invalidSessionJSON', '{invalid json}')

      // 应该返回原始字符串，而不是抛出错误
      const result = session.get('invalidSessionJSON')
      expect(result).toBe('{invalid json}')
    })
  })

  describe('Error Handling', () => {
    it('should handle serialization errors gracefully', () => {
      const cyclicObject: any = { name: 'test' }
      cyclicObject.self = cyclicObject

      expect(() => local.set('cyclicObject', cyclicObject)).not.toThrow()

      // 确保输出了警告
      expect(console.warn).toHaveBeenCalledWith(
        'Failed to serialize data for key "cyclicObject"',
        expect.any(Error)
      )

      // 确保未存储数据或存储为null
      expect(local.get('cyclicObject')).toBeNull()
    })

    it('should handle quota exceeded errors', () => {
      // 模拟存储配额超出的情况
      const originalSetItem = localStorage.setItem
      localStorage.setItem = vi.fn(() => {
        throw new DOMException('QuotaExceededError')
      })

      expect(() => local.set('largeData', 'x'.repeat(10000000))).not.toThrow()

      // 恢复原始方法
      localStorage.setItem = originalSetItem
    })

    it('should handle security errors in private mode', () => {
      // 模拟私人模式下的安全错误
      const originalSetItem = localStorage.setItem
      localStorage.setItem = vi.fn(() => {
        throw new DOMException('SecurityError')
      })

      expect(() => local.set('test', 'value')).not.toThrow()

      // 恢复原始方法
      localStorage.setItem = originalSetItem
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty strings', () => {
      local.set('emptyString', '')
      expect(local.get('emptyString')).toBe('')
    })

    it('should handle special characters', () => {
      const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      local.set('specialChars', specialChars)
      expect(local.get('specialChars')).toBe(specialChars)
    })

    it('should handle unicode characters', () => {
      const unicode = '你好世界 🌍 العالم'
      local.set('unicode', unicode)
      expect(local.get('unicode')).toBe(unicode)
    })

    it('should handle large strings', () => {
      const largeString = 'a'.repeat(1000)
      local.set('largeString', largeString)
      expect(local.get('largeString')).toBe(largeString)
    })

    it('should handle numeric string keys', () => {
      local.set('123', 'numeric key')
      expect(local.get('123')).toBe('numeric key')
    })
  })

  describe('Type Safety', () => {
    it('should maintain type information for primitives', () => {
      local.set('string', 'hello')
      local.set('number', 42)
      local.set('boolean', true)

      expect(typeof local.get('string')).toBe('string')
      expect(typeof local.get('number')).toBe('number')
      expect(typeof local.get('boolean')).toBe('boolean')
    })

    it('should maintain type information for objects', () => {
      const obj = { key: 'value' }
      const arr = [1, 2, 3]

      local.set('object', obj)
      local.set('array', arr)

      expect(typeof local.get('object')).toBe('object')
      expect(Array.isArray(local.get('array'))).toBe(true)
    })
  })

  describe('Storage Independence', () => {
    it('should keep local and session storage independent', () => {
      const key = 'sameKey'
      const localValue = 'localValue'
      const sessionValue = 'sessionValue'

      local.set(key, localValue)
      session.set(key, sessionValue)

      expect(local.get(key)).toBe(localValue)
      expect(session.get(key)).toBe(sessionValue)

      local.rm(key)
      expect(local.get(key)).toBeNull()
      expect(session.get(key)).toBe(sessionValue)
    })
  })
})
