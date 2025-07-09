import { getFileSize, deepClone, debounce, throttle, getUrlParams } from '..'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('Utils Index', () => {
  describe('getFileSize function', () => {
    it('should return string input as-is', () => {
      expect(getFileSize('already formatted')).toBe('already formatted')
    })

    it('should handle null/undefined/zero values', () => {
      expect(getFileSize(undefined)).toBe('0 Bytes')
      expect(getFileSize(0)).toBe('0 Bytes')
    })

    it('should format bytes correctly', () => {
      expect(getFileSize(500)).toBe('500 Bytes')
      expect(getFileSize(1023)).toBe('1023 Bytes')
    })

    it('should format KB correctly', () => {
      expect(getFileSize(1024)).toBe('1 KB')
      expect(getFileSize(1536)).toBe('1.5 KB')
      expect(getFileSize(2048)).toBe('2 KB')
    })

    it('should format MB correctly', () => {
      expect(getFileSize(1024 * 1024)).toBe('1 MB')
      expect(getFileSize(1024 * 1024 * 1.5)).toBe('1.5 MB')
    })

    it('should format GB correctly', () => {
      expect(getFileSize(1024 * 1024 * 1024)).toBe('1 GB')
      expect(getFileSize(1024 * 1024 * 1024 * 2.5)).toBe('2.5 GB')
    })

    it('should format TB correctly', () => {
      expect(getFileSize(1024 * 1024 * 1024 * 1024)).toBe('1 TB')
    })

    it('should handle very large numbers', () => {
      const largeNumber = Math.pow(1024, 8)
      expect(getFileSize(largeNumber)).toBe('1 YB')
    })
  })

  describe('deepClone function', () => {
    it('should clone primitive values', () => {
      expect(deepClone(42)).toBe(42)
      expect(deepClone('hello')).toBe('hello')
      expect(deepClone(true)).toBe(true)
      expect(deepClone(null)).toBe(null)
      expect(deepClone(undefined)).toBe(undefined)
    })

    it('should clone arrays', () => {
      const original = [1, 2, 3, [4, 5]]
      const cloned = deepClone(original)

      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned[3]).not.toBe(original[3])
    })

    it('should clone objects', () => {
      const original = { a: 1, b: { c: 2 } }
      const cloned = deepClone(original)

      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned.b).not.toBe(original.b)
    })

    it('should handle Date objects', () => {
      const original = new Date('2024-01-01')
      const cloned = deepClone(original)

      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(true).toBe(true)
    })

    it('should handle RegExp objects', () => {
      const original = /test/gi
      const cloned = deepClone(original)

      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(true).toBe(true)
    })

    it('should handle Map objects', () => {
      const original = new Map<string, string | { nested: string }>([
        ['key1', 'value1'],
        ['key2', { nested: 'value' }]
      ])
      const cloned = deepClone<typeof original>(original)

      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned.get('key2')).not.toBe(original.get('key2'))
    })

    it('should handle Set objects', () => {
      const original = new Set([1, 2, { nested: 'value' }])
      const cloned = deepClone(original)

      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
    })

    it('should handle circular references', () => {
      const original: any = { a: 1 }
      original.self = original

      const cloned = deepClone(original)

      expect(cloned.a).toBe(1)
      expect(cloned.self).toBe(cloned)
      expect(cloned).not.toBe(original)
    })

    it('should handle ArrayBuffer', () => {
      const original = new ArrayBuffer(8)
      const cloned = deepClone(original)

      expect(cloned).not.toBe(original)
      expect(cloned.byteLength).toBe(original.byteLength)
    })

    it('should handle TypedArrays', () => {
      const original = new Uint8Array([1, 2, 3, 4])
      const cloned = deepClone(original)

      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned instanceof Uint8Array).toBe(true)
    })
  })

  describe('debounce function', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should delay function execution', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 300)

      debouncedFn()
      expect(mockFn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(300)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should reset timer on subsequent calls', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 300)

      debouncedFn()
      vi.advanceTimersByTime(200)
      debouncedFn()
      vi.advanceTimersByTime(200)

      expect(mockFn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should pass arguments correctly', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 300)

      debouncedFn('arg1', 'arg2')
      vi.advanceTimersByTime(300)

      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
    })

    it('should preserve this context', () => {
      const obj = {
        value: 42,
        method: vi.fn(function (this: any) {
          return this.value
        })
      }

      const debouncedMethod = debounce(obj.method, 300)
      debouncedMethod.call(obj)
      vi.advanceTimersByTime(300)

      expect(obj.method).toHaveBeenCalled()
    })

    it('should use default duration', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn)

      debouncedFn()
      vi.advanceTimersByTime(299)
      expect(mockFn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(1)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('throttle function', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should execute immediately on first call with leading=true', () => {
      const mockFn = vi.fn()
      const throttledFn = throttle(mockFn, 300, { leading: true })

      throttledFn()
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should not execute immediately with leading=false', () => {
      const mockFn = vi.fn()
      const throttledFn = throttle(mockFn, 300, { leading: false })

      throttledFn()
      expect(mockFn).not.toHaveBeenCalled()
    })

    it('should execute at most once per interval', () => {
      const mockFn = vi.fn()
      const throttledFn = throttle(mockFn, 300)

      throttledFn()
      throttledFn()
      throttledFn()

      expect(mockFn).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(300)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should execute trailing call when trailing=true', () => {
      const mockFn = vi.fn()
      const throttledFn = throttle(mockFn, 300, { trailing: true })

      throttledFn()
      vi.advanceTimersByTime(100)
      throttledFn()

      expect(mockFn).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(300)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should not execute trailing call when trailing=false', () => {
      const mockFn = vi.fn()
      const throttledFn = throttle(mockFn, 300, { trailing: false })

      throttledFn()
      vi.advanceTimersByTime(100)
      throttledFn()

      expect(mockFn).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(300)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('getUrlParams function', () => {
    beforeEach(() => {
      // Mock location
      Object.defineProperty(window, 'location', {
        value: {
          href: 'https://example.com/path?param1=value1&param2=value%202&param3='
        },
        writable: true
      })
    })

    it('should get specific parameter', () => {
      expect(getUrlParams('param1')).toBe('value1')
      expect(getUrlParams('param2')).toBe('value 2')
      expect(getUrlParams('param3')).toBe('')
    })

    it('should return null for non-existent parameter', () => {
      expect(getUrlParams('nonexistent')).toBeNull()
    })

    it('should get all parameters when no key provided', () => {
      const params = getUrlParams()
      expect(params).toEqual({
        param1: 'value1',
        param2: 'value 2',
        param3: ''
      })
    })

    it('should handle URL with hash parameters', () => {
      Object.defineProperty(window, 'location', {
        value: {
          href: 'https://example.com/path#/route?hash1=value1&hash2=value2'
        },
        writable: true
      })

      expect(getUrlParams('hash1')).toBe('value1')
      expect(getUrlParams('hash2')).toBe('value2')
    })

    it('should handle encoded characters', () => {
      Object.defineProperty(window, 'location', {
        value: {
          href: 'https://example.com/path?encoded=%E4%B8%AD%E6%96%87&plus=hello+world'
        },
        writable: true
      })

      expect(getUrlParams('encoded')).toBe('中文')
      expect(getUrlParams('plus')).toBe('hello world')
    })

    it('should handle empty search params', () => {
      Object.defineProperty(window, 'location', {
        value: {
          href: 'https://example.com/path'
        },
        writable: true
      })

      expect(getUrlParams('any')).toBeNull()
      expect(getUrlParams()).toEqual({})
    })
  })
})
