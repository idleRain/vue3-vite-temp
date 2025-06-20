# Vue3 Vite 模板项目

## 项目概述
基于 Vue3 + Vite 的现代化前端开发模板，集成以下技术栈：
- 🚀 Vue 3 组合式API开发模式
- ⚡ Rolldown-Vite 构建工具
- 🎨 Tailwind CSS 原子化样式方案
- 💅 Shadcn-vue 组件库
- 📦 Pinia 状态管理
- 🌐 Vue Router 4 路由管理
- 🔌 Axios HTTP 客户端
- 🌍 Vue I18n 国际化支持
- 🛠 Element Plus UI 组件库

## 功能特性
- 开箱即用的企业级开发配置
- 自动化API代理配置（通过.env文件管理）
- 国际化多语言支持架构
- 组件自动导入机制
- 完善的代码规范配置（ESLint + Prettier）
- 现代化的UI组件库集成
- 类型安全的TypeScript支持

## 环境要求
- Node.js 20+

## 快速开始
```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build
```

## 环境配置
复制并重命名环境文件：
```bash
cp .env
```
按需修改以下配置：
```ini
# 开发服务器端口
VITE_SERVER_PORT=6789
# API代理配置
VITE_PROXY_URL=/api
VITE_BASE_URL=http://localhost:8080
# 默认语言(zh/en)
VITE_APP_LOCALE=zh
```

## 脚本说明
```json
{
  "dev": "启动开发服务器",
  "build": "生产环境构建",
  "preview": "预览生产版本",
  "lint": "代码规范检查和修复",
  "format": "代码风格格式化"
}
```

## 项目结构
```
├── src
│   ├── assets        # 静态资源
│   ├── components    # 通用组件
│   │   └── ui        # shadcn-vue 组件库
│   ├── layouts       # 布局组件
│   ├── locales       # 国际化配置
│   ├── router        # 路由配置
│   ├── store         # 状态管理
│   ├── utils         # 工具函数
│   ├── views         # 页面组件
│   └── styles        # 全局样式
```

## 代码规范
- 组件命名采用PascalCase格式
- 使用组合式API编写业务逻辑
- 重要功能必须编写类型定义
- 遵循ESLint + Prettier代码风格

## 贡献指南
1. 创建功能分支
2. 提交前执行 lint 和 format
3. 保持commit信息语义化
4. 创建合并请求并关联issue

## 许可证
MIT License
