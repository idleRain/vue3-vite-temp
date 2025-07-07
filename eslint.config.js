import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import eslintAutoImport from './.eslintrc-auto-import.js'
import { defineConfig } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import js from '@eslint/js'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended']
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/recommended'],
  eslintPluginPrettier,
  {
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...eslintAutoImport.globals
      },
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest'
      }
    }
  },
  {
    rules: {
      // 允许使用 any
      '@typescript-eslint/no-explicit-any': 'off',
      // 允许设置未使用的变量
      '@typescript-eslint/no-unused-vars': 'warn',
      // 允许组件名为单个单词
      'vue/multi-word-component-names': 'off',
      // 组件命名方式
      'vue/component-name-in-template-casing': [
        'error',
        // 'kebab-case', // 分隔命名
        'PascalCase', // 大驼峰
        { registeredComponentsOnly: false, ignores: [] }
      ],
      // 空标签自闭合
      'vue/html-self-closing': [
        'warn',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always'
          }
        }
      ],
      // 允许使用 this
      '@typescript-eslint/no-this-alias': [
        'error',
        {
          allowedNames: ['that'] // this可用的局部变量名称
        }
      ]
    }
  },
  {
    ignores: ['node_modules', 'dist', 'public', 'src/components/ui']
  }
])
