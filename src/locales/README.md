# 国际化语言包配置

## 目录说明

该目录用于存放应用的国际化语言包文件，支持多语言切换功能，基于 Vue I18n 实现。

## 文件结构

```
locales/
├── locale/                    # 语言种类(zh, en, ...)
│   ├── modules/               # 多级模块
│   │   └── ...{json,json5}    # 多级模块语言包
│   └── example.json5          # 语言包文件
└── README.md                  # 说明文档
```

## 特性

- **多层级命名空间**：支持按模块拆分翻译文件，自动合并为嵌套对象结构
- **多格式支持**：兼容 JSON 和 JSON5 格式（推荐使用 JSON5 以支持注释等复杂场景）
- **约定式导入**：无需手动导入语言文件，自动扫描并加载

## 使用规范

### 文件命名

- 语言目录：使用 ISO 639-1 语言代码（如 `zh` 表示中文，`en` 表示英文）
- 模块文件：按功能模块命名（如 `example.json5`、`layout.json5`）

### 翻译键命名

采用 **kebab-case** 风格，建议格式：`[模块名].[组件名].[键名]`

```json5
// locale\example.json5
{
  title: '示例页面',
  subtitle: '这是一个演示国际化功能的页面'
}
```
```json5
// 多级模块 locale\form\input.json5
{
  name: '姓名',
  placeholder: '请输入姓名'
}
```

## 在代码中使用

### 模板中使用

```vue
<template>
  <h1>{{ t('example.title') }}</h1>
  <p>{{ t('form.input.name') }}</p>
</template>
```

### 脚本中使用

```ts
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
console.log(t('example.subtitle'))
console.log(t('form.input.placeholder'))
```

## 添加新语言

1. 在 `src/typing.d.ts` 中添加语言类型, 在 `src/index.ts` 中手动导入 `Element UI`, `dayjs` 等依赖的语言包
2. 在 `locales` 目录下创建新的语言代码目录（如 `ja` 表示日语）
3. 复制现有语言包文件到新目录并翻译内容
4. 语言切换功能会自动识别新添加的语言

## 注意事项

- JSON5 格式支持注释、尾随逗号以及更复杂场景，推荐优先使用
- 翻译键应保持一致性，避免重复或拼写错误
- 新增翻译键后无需重启开发服务器，支持热更新
