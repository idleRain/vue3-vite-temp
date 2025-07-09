/// <reference types="vitest" />
/// <reference types="vitest/globals" />
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
      dts: false, // 测试环境中不生成类型文件
      eslintrc: {
        enabled: false
      }
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    typecheck: {
      include: ['src/**/*.{ts,vue}', 'src/test/globals.d.ts']
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/vite.config.*',
        '**/vitest.config.*',
        '**/dist/**',
        '**/build/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/coverage/**'
      ],
      include: ['src/**/*.{ts,vue}']
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~': resolve(__dirname, './'),
      $ui: resolve(__dirname, './src/components/ui')
    }
  }
})
