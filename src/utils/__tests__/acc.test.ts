import { accAdd, accSub, accMul, accDiv } from '../acc'
import { describe, it, expect } from 'vitest'

describe('Accurate Math Operations', () => {
  describe('accAdd function', () => {
    it('should add integers correctly', () => {
      expect(accAdd(1, 2)).toBe(3)
      expect(accAdd(0, 0)).toBe(0)
      expect(accAdd(-1, 1)).toBe(0)
      expect(accAdd(-5, -3)).toBe(-8)
    })

    it('should add floating point numbers correctly', () => {
      expect(accAdd(0.1, 0.2)).toBe(0.3)
      expect(accAdd(0.7, 0.1)).toBe(0.8)
      expect(accAdd(1.5, 2.5)).toBe(4.0)
    })

    it('should handle precision issues', () => {
      // 这些是 JavaScript 原生运算会出现精度问题的情况
      expect(accAdd(0.1, 0.2)).toBe(0.3) // 原生: 0.30000000000000004
      expect(accAdd(0.7, 0.1)).toBe(0.8) // 原生: 0.7999999999999999
      expect(accAdd(0.3, 0.6)).toBe(0.9) // 原生: 0.8999999999999999
    })

    it('should handle different decimal places', () => {
      expect(accAdd(1.23, 4.5)).toBe(5.73)
      expect(accAdd(0.001, 0.002)).toBe(0.003)
      expect(accAdd(123.456, 0.1)).toBe(123.556)
    })

    it('should handle large numbers', () => {
      expect(accAdd(999999999999.99, 0.01)).toBe(1000000000000.0)
      expect(accAdd(1e15, 1e15)).toBe(2e15)
    })

    it('should handle edge cases', () => {
      expect(accAdd(0, 0.1)).toBe(0.1)
      expect(accAdd(1, 0)).toBe(1)
      expect(accAdd(Infinity, 1)).toBe(Infinity)
      expect(accAdd(-Infinity, 1)).toBe(-Infinity)
    })

    it('should handle invalid inputs gracefully', () => {
      // 当输入无法转换为数字时，应该返回原生运算结果
      expect(accAdd(NaN, 1)).toBeNaN()
      expect(accAdd(1, NaN)).toBeNaN()
      expect(accAdd(NaN, NaN)).toBeNaN()
    })
  })

  describe('accSub function', () => {
    it('should subtract integers correctly', () => {
      expect(accSub(5, 3)).toBe(2)
      expect(accSub(0, 0)).toBe(0)
      expect(accSub(-1, 1)).toBe(-2)
      expect(accSub(-5, -3)).toBe(-2)
    })

    it('should subtract floating point numbers correctly', () => {
      expect(accSub(0.3, 0.1)).toBe(0.2)
      expect(accSub(0.7, 0.1)).toBe(0.6)
      expect(accSub(1.5, 0.5)).toBe(1.0)
    })

    it('should handle precision issues', () => {
      expect(accSub(0.3, 0.1)).toBe(0.2) // 原生: 0.19999999999999998
      expect(accSub(1.5, 1.2)).toBe(0.3) // 原生: 0.29999999999999993
      expect(accSub(0.8, 0.7)).toBe(0.1) // 原生: 0.10000000000000009
    })

    it('should handle different decimal places', () => {
      expect(accSub(5.73, 1.23)).toBe(4.5)
      expect(accSub(0.003, 0.001)).toBe(0.002)
      expect(accSub(123.556, 0.1)).toBe(123.456)
    })

    it('should handle negative results', () => {
      expect(accSub(0.1, 0.2)).toBe(-0.1)
      expect(accSub(1, 2)).toBe(-1)
    })

    it('should handle edge cases', () => {
      expect(accSub(0, 0.1)).toBe(-0.1)
      expect(accSub(1, 0)).toBe(1)
      expect(accSub(Infinity, 1)).toBe(Infinity)
      expect(accSub(-Infinity, 1)).toBe(-Infinity)
    })
  })

  describe('accMul function', () => {
    it('should multiply integers correctly', () => {
      expect(accMul(2, 3)).toBe(6)
      expect(accMul(0, 5)).toBe(0)
      expect(accMul(-2, 3)).toBe(-6)
      expect(accMul(-2, -3)).toBe(6)
    })

    it('should multiply floating point numbers correctly', () => {
      expect(accMul(0.1, 0.2)).toBe(0.02)
      expect(accMul(0.7, 0.8)).toBe(0.56)
      expect(accMul(1.5, 2.5)).toBe(3.75)
    })

    it('should handle precision issues', () => {
      expect(accMul(0.1, 0.2)).toBe(0.02) // 原生: 0.020000000000000004
      expect(accMul(0.7, 0.8)).toBe(0.56) // 原生: 0.5600000000000001
      expect(accMul(1.1, 1.1)).toBe(1.21) // 原生: 1.2100000000000002
    })

    it('should handle different decimal places', () => {
      expect(accMul(1.23, 4.5)).toBe(5.535)
      expect(accMul(0.001, 0.002)).toBe(0.000002)
      expect(accMul(123.456, 0.1)).toBe(12.3456)
    })

    it('should handle edge cases', () => {
      expect(accMul(0, 0.1)).toBe(0)
      expect(accMul(1, 0)).toBe(0)
      expect(accMul(1, 1)).toBe(1)
      expect(accMul(Infinity, 1)).toBe(Infinity)
      expect(accMul(-Infinity, 1)).toBe(-Infinity)
    })
  })

  describe('accDiv function', () => {
    it('should divide integers correctly', () => {
      expect(accDiv(6, 2)).toBe(3)
      expect(accDiv(0, 5)).toBe(0)
      expect(accDiv(-6, 2)).toBe(-3)
      expect(accDiv(-6, -2)).toBe(3)
    })

    it('should divide floating point numbers correctly', () => {
      expect(accDiv(0.2, 0.1)).toBe(2)
      expect(accDiv(0.6, 0.2)).toBe(3)
      expect(accDiv(1.5, 0.5)).toBe(3)
    })

    it('should handle precision issues', () => {
      expect(accDiv(0.3, 0.1)).toBe(3) // 原生: 2.9999999999999996
      expect(accDiv(0.69, 0.1)).toBe(6.9) // 原生: 6.8999999999999995
      expect(accDiv(1.21, 1.1)).toBe(1.1) // 原生: 1.0999999999999999
    })

    it('should handle different decimal places', () => {
      expect(accDiv(5.535, 1.23)).toBe(4.5)
      expect(accDiv(0.000002, 0.001)).toBe(0.002)
      expect(accDiv(12.3456, 0.1)).toBe(123.456)
    })

    it('should handle division by fractional numbers', () => {
      expect(accDiv(1, 0.1)).toBe(10)
      expect(accDiv(1, 0.01)).toBe(100)
      expect(accDiv(1, 0.001)).toBe(1000)
    })

    it('should handle edge cases', () => {
      expect(accDiv(0, 1)).toBe(0)
      expect(accDiv(1, 1)).toBe(1)
      expect(accDiv(Infinity, 1)).toBe(Infinity)
      expect(accDiv(-Infinity, 1)).toBe(-Infinity)
      expect(accDiv(1, Infinity)).toBe(0)
    })

    it('should handle division by zero', () => {
      expect(accDiv(1, 0)).toBe(Infinity)
      expect(accDiv(-1, 0)).toBe(-Infinity)
      expect(accDiv(0, 0)).toBeNaN()
    })
  })

  describe('Integration tests', () => {
    it('should work together for complex calculations', () => {
      // 测试组合运算: (0.1 + 0.2) * 0.3 / 0.1
      const step1 = accAdd(0.1, 0.2) // 0.3
      const step2 = accMul(step1, 0.3) // 0.09
      const result = accDiv(step2, 0.1) // 0.9

      expect(result).toBe(0.9)
    })

    it('should handle chained operations', () => {
      // 测试链式运算
      let result = 0.1
      result = accAdd(result, 0.2) // 0.3
      result = accMul(result, 2) // 0.6
      result = accSub(result, 0.1) // 0.5
      result = accDiv(result, 0.5) // 1.0

      expect(result).toBe(1.0)
    })

    it('should maintain precision in financial calculations', () => {
      // 模拟金融计算场景
      const price = 19.99
      const taxRate = 0.08
      const quantity = 3

      const subtotal = accMul(price, quantity) // 59.97
      const tax = accMul(subtotal, taxRate) // 4.7976
      const total = accAdd(subtotal, tax) // 64.7676

      expect(subtotal).toBe(59.97)
      expect(tax).toBe(4.7976)
      expect(total).toBe(64.7676)
    })
  })

  describe('Error handling', () => {
    it('should handle string inputs that cause parsing errors', () => {
      // 模拟字符串输入导致解析错误的情况
      const invalidNumber = {} as any

      // 应该回退到原生运算
      expect(accAdd(invalidNumber, 1)).toBeNaN()
      expect(accSub(invalidNumber, 1)).toBeNaN()
      expect(accMul(invalidNumber, 1)).toBeNaN()
      expect(accDiv(invalidNumber, 1)).toBeNaN()
    })
  })
})
