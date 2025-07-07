import { $t, setupI18n as coreSetup, loadLocalesMapFromDir } from './locales'
import type { LocaleSetupOptions, SupportedLanguagesType } from './locales'
import defaultLocale from 'element-plus/es/locale/lang/zh-cn'
import type { Language } from 'element-plus/es/locale'
import enLocale from 'element-plus/es/locale/lang/en'
import { local } from '@/utils/storage'
import type { App } from 'vue'
import dayjs from 'dayjs'

const elementLocale = ref<Language>(defaultLocale)

const modules = import.meta.glob('../locales/**/*.json?(5)')
const localesMap = loadLocalesMapFromDir(
  /^\.\.\/locales\/([^/]+)\/(.*?)(?:\.json5?|\.json)$/,
  modules
)
/**
 * 加载应用特有的语言包
 * @param lang
 */
async function loadMessages(lang: SupportedLanguagesType) {
  const [appLocaleMessages] = await Promise.all([localesMap[lang]?.(), loadThirdPartyMessage(lang)])
  return appLocaleMessages?.default
}

/**
 * 加载第三方组件库的语言包
 * @param lang
 */
async function loadThirdPartyMessage(lang: SupportedLanguagesType) {
  await Promise.all([loadElementLocale(lang), loadDayjsLocale(lang)])
}

/**
 * 加载dayjs的语言包
 * @param lang
 */
async function loadDayjsLocale(lang: SupportedLanguagesType) {
  let locale
  switch (lang) {
    case 'en': {
      locale = await import('dayjs/locale/en')
      break
    }
    case 'zh': {
      locale = await import('dayjs/locale/zh-cn')
      break
    }
    // 默认
    default: {
      locale = await import('dayjs/locale/zh-cn')
    }
  }
  if (locale) {
    dayjs.locale(locale)
  } else {
    console.error(`Failed to load dayjs locale for ${lang}`)
  }
}

/**
 * 加载element-plus的语言包
 * @param lang
 */
async function loadElementLocale(lang: SupportedLanguagesType) {
  switch (lang) {
    case 'en':
      elementLocale.value = enLocale
      break
    case 'zh':
      elementLocale.value = defaultLocale
      break
  }
}

async function setupI18n(app: App, options: LocaleSetupOptions = {}) {
  await coreSetup(app, {
    defaultLocale: local.get('lang') ?? import.meta.env.VITE_APP_LOCALE ?? 'zh',
    loadMessages,
    missingWarn: import.meta.env.DEV,
    ...options
  })
}

export { $t, elementLocale, setupI18n }
