import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @Description # 获取文件大小
 * @Author IdleRain
 * @Date 2025/6/18 16:06
 */
export const getFileSize = (value?: number | string) => {
  if (typeof value === 'string') return value
  if (value == null || value === 0) return '0 Bytes'

  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const index = Math.floor(Math.log(value) / Math.log(1024))
  const size = value / 1024 ** index
  const formattedSize = Number(size.toFixed(2))

  return `${formattedSize} ${units[index]}`
}

/**
 * @Description # 深拷贝
 * @Param source - 需要克隆的对象
 * @Param visited - 内部用于记录已访问对象，防止循环引用
 * @Author IdleRain
 * @Date 2025/6/18 16:09
 */
export const deepClone = <T>(source: T, visited = new WeakMap()): T => {
  // 基础类型直接返回
  if (typeof source !== 'object' || source === null) return source
  if (visited.has(source)) return visited.get(source)
  // 处理内置对象
  if (source instanceof Date) return new Date(source.getTime()) as T
  if (source instanceof RegExp) return new RegExp(source) as T
  if (source instanceof ArrayBuffer) return source.slice(0) as T
  if (ArrayBuffer.isView(source))
    return new (source as any).constructor(source.buffer.slice(0)) as T
  // Map / Set 递归处理
  if (source instanceof Map) {
    const cloned = new Map()
    visited.set(source, cloned)
    for (const [key, value] of source.entries()) {
      cloned.set(deepClone(key, visited), deepClone(value, visited))
    }
    return cloned as T
  }
  if (source instanceof Set) {
    const cloned = new Set()
    visited.set(source, cloned)
    for (const value of source) {
      cloned.add(deepClone(value, visited))
    }
    return cloned as T
  }
  // 数组或普通对象
  const cloned: Array<any> | Record<any, any> = Array.isArray(source) ? [] : {}
  visited.set(source, cloned)
  // 递归克隆所有可枚举属性
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      cloned[key] = deepClone(source[key], visited)
    }
  }
  return cloned as T
}

/**
 * @Description # 防抖
 * @Param fn - 需要防抖处理的函数
 * @param duration - 防抖时间（毫秒），默认 300ms
 * @Author IdleRain
 * @Date 2025/6/18 16:13
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  duration: number = 300
): ((this: ThisParameterType<T>, ...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timer !== null) clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, duration)
  }
}

/**
 * @Description # 节流
 * @Param fn - 需要节流处理的函数
 * @Param interval - 节流时间（毫秒），默认 300ms
 * @Param options - 节流选项，默认 leading: true, trailing: true
 * @Author IdleRain
 * @Date 2025/6/18 16:19
 */
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  interval: number = 300,
  options: { leading?: boolean; trailing?: boolean } = {}
): ((this: ThisParameterType<T>, ...args: Parameters<T>) => void) => {
  const { leading = true, trailing = true } = options

  let lastTime = 0
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null
  let that: ThisParameterType<T> | null = null

  const invokeFn = () => {
    if (lastArgs && that) {
      fn.apply(that, lastArgs)
    }
    lastArgs = null
    that = null
    lastTime = Date.now()
  }

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const now = Date.now()

    if (lastTime === 0 && leading) {
      lastTime = now
      fn.apply(this, args)
      return
    }

    const remaining = interval - (now - lastTime)

    if (remaining <= 0 && !timer) {
      invokeFn()
    } else if (trailing && !timer) {
      timer = setTimeout(() => {
        if (trailing) invokeFn()
        timer = null
      }, remaining)
    }

    lastArgs = args
    that = this
  }
}

/**
 * @Description # 获取 url 参数
 * @Param key - 可选参数名，若提供则返回对应值；否则返回所有参数对象
 * @Author IdleRain
 * @Date 2025/6/18 16:26
 */
export function getUrlParams<T extends string | Record<string, string>>(key?: string): T {
  const url = new URL(location.href)
  const search = url.search || url.hash.split('?')[1] || ''
  const params = new URLSearchParams(search)
  if (key) {
    const value = params.get(key)
    return (value ? decodeURIComponent(value.replace(/\+/g, ' ')) : value) as T
  }
  const result: Record<string, string> = {}
  for (const [k, v] of params.entries()) {
    result[k] = decodeURIComponent(v.replace(/\+/g, ' '))
  }
  return result as T
}
