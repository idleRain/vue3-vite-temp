# Vue3 Vite 现代化开发模板

## 📖 项目概述

这是一个基于 **Vue 3** + **Vite** 的现代化企业级前端开发模板，整合了最新的前端技术栈和最佳实践，提供开箱即用的开发体验。

### 🛠 核心技术栈

- **🚀 Vue 3** - 渐进式 JavaScript 框架
- **⚡ Rolldown-Vite** - 下一代前端构建工具
- **🎯 TypeScript** - 严格类型检查，提升代码质量
- **🎨 Tailwind CSS** - 原子化 CSS 框架
- **💅 Shadcn-vue** - 高质量、可定制的 UI 组件库
- **🏪 Pinia** - Vue 3 官方推荐的状态管理
- **🧭 Vue Router** - 官方路由解决方案
- **🌐 Vue I18n** - 国际化解决方案，支持动态语言切换
- **📦 Element Plus** - 企业级 UI 组件库
- **🔗 Axios + Ky** - 双 HTTP 客户端支持，内置重试机制

### ✨ 特色功能

- **🎨 主题系统** - 支持亮色/暗色/系统模式，平滑过渡动画
- **🔄 自动导入** - 组件、API、工具函数自动导入，无需手动引入
- **🌍 国际化** - 完整的 i18n 解决方案，支持 JSON5 配置文件
- **📱 响应式布局** - 基于 Tailwind CSS 的移动端适配
- **🛡️ 类型安全** - 全面的 TypeScript 支持和严格模式
- **🔧 开发工具** - ESLint + Prettier + Husky + CommitLint
- **🧪 测试框架** - Vitest + Vue Test Utils + JSDOM，支持单元测试和覆盖率报告
- **⚡ 热重载** - 快速的开发体验和构建性能
- **🎯 路径别名** - `@/`、`~/`、`$ui/` 等便捷路径映射

## 📋 环境要求

- **Node.js** >= 20.0.0
- **pnpm** >= 8.0.0 (推荐) 或 **npm** >= 9.0.0

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/idleRain/vue3-vite-temp.git
cd vue3-vite-temp
```

### 2. 安装依赖

```bash
# 使用 pnpm
pnpm install

# 或使用 npm
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:6789](http://localhost:6789) 开始开发。

### 4. 构建生产版本

```bash
# 生产环境构建
npm run build

# 预览构建结果
npm run preview
```

## ⚙️ 环境配置

项目支持多环境配置，复制并修改环境变量文件：

```bash
cp .env.example .env
```

### 环境变量说明

```ini
# 开发服务器配置
VITE_SERVER_PORT=6789                    # 开发服务器端口

# API 配置
VITE_PROXY_URL=http://localhost:8080     # API 代理目标地址
VITE_BASE_URL=/api                       # API 基础路径

# 应用配置
VITE_APP_LOCALE=zh                       # 默认语言 (zh/en)
VITE_APP_TITLE=Vue3 Vite Template        # 应用标题
```

## 📜 可用脚本

| 命令 | 说明 | 环境 |
|------|------|------|
| `npm run dev` | 启动开发服务器 | development |
| `npm run build` | 生产环境构建 | production |
| `npm run build:test` | 测试环境构建 | test |
| `npm run build:preview` | 预览环境构建 | preview |
| `npm run preview` | 预览生产构建 | production |
| `npm run ts` | TypeScript 类型检查 | - |
| `npm run lint` | ESLint 检查和修复 | - |
| `npm run format` | Prettier 代码格式化 | - |
| `npm run test` | 运行单元测试 | - |
| `npm run test:ui` | 运行测试并打开 UI 界面 | - |
| `npm run test:coverage` | 运行测试并生成覆盖率报告 | - |
| `npm run test:watch` | 监听模式运行测试 | - |

## 📁 项目结构

```
vue3-vite-temp/
├── public/                  # 静态资源目录
├── src/
│   ├── api/                 # API 接口定义
│   ├── assets/              # 资源文件（图片、字体等）
│   ├── components/          # 公共组件
│   │   ├── ui/              # Shadcn-vue UI 组件
│   │   └── System/          # 系统级组件（主题切换等）
│   ├── i18n/                # 国际化配置
│   ├── layouts/             # 布局组件
│   │   └── components/      # 布局相关组件
│   ├── locales/             # 语言包文件
│   │   ├── en/              # 英文语言包
│   │   └── zh/              # 中文语言包
│   ├── router/              # 路由配置
│   ├── services/            # 服务层（HTTP 客户端等）
│   ├── store/               # Pinia 状态管理
│   │   └── modules/         # 状态模块
│   ├── styles/              # 全局样式
│   ├── test/                # 测试配置和工具
│   ├── types/               # TypeScript 类型定义
│   ├── utils/               # 工具函数
│   │   └── __tests__/       # 工具函数测试
│   ├── views/               # 页面组件
│   ├── App.vue              # 根组件
│   └── main.ts              # 应用入口
├── typings/                 # 全局类型声明
├── .env                     # 环境变量
├── components.d.ts          # 组件类型声明
├── tailwind.config.js       # Tailwind CSS 配置
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
└── vitest.config.ts         # Vitest 测试配置
```

## 🎨 主题系统

项目内置了完整的主题切换系统：

- **🌞 亮色模式** - 默认亮色主题
- **🌙 暗色模式** - 深色主题
- **💻 系统模式** - 跟随系统主题设置
- **🎭 平滑过渡** - 主题切换时的平滑动画效果

## 🧪 测试框架

项目集成了 **Vitest** 作为测试框架，提供完整的单元测试支持：

### 测试特性

- **⚡ 快速执行** - 基于 Vite 的快速测试运行
- **🔧 零配置** - 开箱即用的测试环境
- **📊 覆盖率报告** - 内置代码覆盖率统计
- **🎯 TypeScript 支持** - 完整的 TypeScript 类型检查
- **🌐 JSDOM 环境** - 浏览器 API 模拟
- **🔄 热重载** - 监听模式下的实时测试

### 测试结构

```
src/
├── utils/
│   ├── storage.ts           # 存储工具函数
│   └── __tests__/           # 测试文件目录
│       └── storage.test.ts  # 存储工具测试
├── test/
│   ├── setup.ts             # 测试环境配置
│   └── globals.d.ts         # 全局类型声明
└── vitest.config.ts         # Vitest 配置文件
```

### 编写测试

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent', () => {
  beforeEach(() => {
    // 测试前的准备工作
  })

  it('should render correctly', () => {
    const wrapper = mount(MyComponent)
    expect(wrapper.text()).toContain('Hello World')
  })

  it('should handle user interaction', async () => {
    const wrapper = mount(MyComponent)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
```

### 测试配置

项目已预配置以下测试环境：

- **🌐 JSDOM** - 浏览器 API 模拟
- **📦 自动导入** - Vue、Pinia、Vue Router 等自动导入
- **🔧 Mock 支持** - localStorage、sessionStorage、fetch 等已预配置
- **📊 覆盖率报告** - 支持 Text、JSON、HTML 多种格式

## 🌍 国际化

项目支持多语言国际化：

### 语言配置

- **中文** - `src/locales/zh/`
- **English** - `src/locales/en/`

### 使用方式

```vue
<template>
  <div>
    <!-- 在模板中使用 -->
    <h1>{{ $t('example.title') }}</h1>
    
    <!-- 或在 script 中使用 -->
    <p>{{ t('example.description') }}</p>
  </div>
</template>

<script setup>
// 自动导入，无需手动引入
const { t } = useI18n()
</script>
```

### 添加新语言

1. 在 `src/locales/` 下创建新的语言目录
2. 添加对应的 JSON5 配置文件
3. 在 `src/i18n/locales.ts` 中注册新语言

## 🔧 开发规范

### 代码风格

- **组件命名**: PascalCase (如 `UserProfile.vue`)
- **文件命名**: kebab-case (如 `user-profile.vue`)
- **API 开发**: 使用 Composition API 和 `<script setup>`
- **类型定义**: 重要功能必须提供 TypeScript 类型

### Git 提交规范

项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
feat: 新功能
fix: 修复问题
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建/工具相关
```

### 测试规范

- **工具函数**: 所有公共工具函数必须编写单元测试
- **组件测试**: 复杂组件需要编写组件测试
- **覆盖率要求**: 核心功能代码覆盖率应达到 80% 以上
- **测试文件命名**: 使用 `*.test.ts` 或 `*.spec.ts` 后缀
- **测试组织**: 使用 `describe` 分组，`it` 描述具体测试用例

### 开发流程

1. **创建分支**: `git checkout -b feature/new-feature`
2. **开发功能**: 编写代码并确保通过 lint 检查
3. **编写测试**: 为新功能编写相应的单元测试
4. **运行测试**: 确保所有测试通过 `npm run test`
5. **提交代码**: `git commit -m "feat: add new feature"`
6. **推送分支**: `git push origin feature/new-feature`
7. **创建 PR**: 通过 GitHub/GitLab 创建合并请求

## 🚀 部署指南

### 构建优化

项目已配置多种构建优化：

- **代码分割**: 自动分离第三方库和业务代码
- **Tree Shaking**: 移除未使用的代码
- **资源压缩**: Gzip/Brotli 压缩支持
- **缓存策略**: 文件指纹和长期缓存

### 部署方式

```bash
# 1. 构建项目
npm run build

# 2. 部署 dist/ 目录到服务器
# 支持 Nginx、Apache、CDN 等多种部署方式
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. **Fork** 本仓库
2. **创建**功能分支 (`git checkout -b feature/AmazingFeature`)
3. **提交**更改 (`git commit -m 'feat: add some AmazingFeature'`)
4. **推送**分支 (`git push origin feature/AmazingFeature`)
5. **打开** Pull Request

## 📄 许可证

本项目基于 [MIT License](./LICENSE) 开源协议。

## 🙏 致谢

感谢以下开源项目的支持：

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn-vue](https://www.shadcn-vue.com/)
- [Element Plus](https://element-plus.org/)

---

**🌟 如果这个项目对你有帮助，请给一个 Star！🌟**
