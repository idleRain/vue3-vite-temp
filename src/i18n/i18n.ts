import { type Locale, createI18n } from 'vue-i18n'
import type { App } from 'vue'
import type {
  ImportLocaleFn,
  LoadMessageFn,
  LocaleSetupOptions,
  SupportedLanguagesType
} from './typing'

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: '',
  messages: {}
})

/**
 * 支持 json 和 json5 格式语言包文件
 * 支持多层级目录的命名空间
 */
const modules = import.meta.glob('../locales/**/*.json?(5)')
const localesMap = loadLocalesMapFromDir(
  /^\.\.\/locales\/([^/]+)\/(.*?)(?:\.json5?|\.json)$/,
  modules
)
let loadMessages: LoadMessageFn

/**
 * 加载语言模块
 * @param modules
 */
function loadLocalesMap(modules: Record<string, () => Promise<unknown>>) {
  const localesMap: Record<Locale, ImportLocaleFn> = {}

  for (const [path, loadLocale] of Object.entries(modules)) {
    const key = path.match(/([\w-]*)\.(json)/)?.[1]
    if (key) {
      localesMap[key] = loadLocale as ImportLocaleFn
    }
  }
  return localesMap
}

/**
 * 加载具有目录结构的 locale 模块
 * @param regexp - 用于匹配语言和文件名的正则表达式
 * @param modules - 包含路径和导入函数的 modules 对象
 * @returns 区域设置到其相应导入函数的映射
 */
function loadLocalesMapFromDir(
  regexp: RegExp,
  modules: Record<string, () => Promise<unknown>>
): Record<Locale, ImportLocaleFn> {
  const localesRaw: Record<Locale, Record<string, () => Promise<unknown>>> = {}
  const localesMap: Record<Locale, ImportLocaleFn> = {}

  // 迭代模块以提取语言和文件名
  for (const path in modules) {
    const match = path.match(regexp)
    if (match) {
      const [, locale, filePath] = match
      if (locale && filePath) {
        if (!localesRaw[locale]) localesRaw[locale] = {}
        // 将路径拆分为数组
        const parts = filePath.split('/')
        // 构建嵌套键路径
        const key = parts.join('.')
        localesRaw[locale][key] = modules[path]
      }
    }
  }

  // 将原始 locale 数据转换为异步导入函数
  for (const [locale, files] of Object.entries(localesRaw)) {
    localesMap[locale] = async () => {
      const messages: Record<string, any> = {}

      for (const [key, importFn] of Object.entries(files)) {
        const keys = key.split('.')
        let current = messages

        // 逐级创建嵌套对象结构
        for (let i = 0; i < keys.length - 1; i++) {
          const k = keys[i]
          if (!current[k]) current[k] = {}
          current = current[k]
        }

        const imported = (await importFn()) as { default: any }
        current[keys[keys.length - 1]] = imported.default
      }

      return { default: messages }
    }
  }

  return localesMap
}

/**
 * 设置语言
 * @param locale
 */
function setI18nLanguage(locale: Locale) {
  i18n.global.locale.value = locale
  document?.querySelector('html')?.setAttribute('lang', locale)
}

async function setupI18n(app: App, options: LocaleSetupOptions = {}) {
  const { defaultLocale = 'zh' } = options
  // app可以自行扩展一些第三方库和组件库的国际化
  loadMessages = options.loadMessages || (async () => ({}))
  app.use(i18n)
  await loadLocaleMessages(defaultLocale)

  // 在控制台打印警告
  i18n.global.setMissingHandler((locale, key) => {
    if (options.missingWarn && key.includes('.')) {
      console.warn(`[intlify] Not found '${key}' key in '${locale}' locale messages.`)
    }
  })
}

/**
 * 加载语言
 * @param lang
 */
async function loadLocaleMessages(lang: SupportedLanguagesType) {
  if (unref(i18n.global.locale) === lang) {
    return setI18nLanguage(lang)
  }
  const message = await localesMap[lang]?.()
  if (message?.default) {
    i18n.global.setLocaleMessage(lang, message.default)
  }
  const mergeMessage = await loadMessages(lang)
  i18n.global.mergeLocaleMessage(lang, mergeMessage)
  return setI18nLanguage(lang)
}

export { i18n, loadLocaleMessages, loadLocalesMap, loadLocalesMapFromDir, setupI18n }
