/** 支持的语言类型 */
export type SupportedLanguagesType = 'en' | 'zh'

/** 语言包导入函数类型 */
export type ImportLocaleFn = () => Promise<{ default: LocaleMessages }>

/** 语言包消息类型 */
export type LocaleMessages = Record<string, any>

/** 加载消息函数类型 */
export type LoadMessageFn = (lang: SupportedLanguagesType) => Promise<LocaleMessages | undefined>

/** 国际化设置选项 */
export interface LocaleSetupOptions {
  /**
   * 默认语言
   * @default 'zh'
   */
  defaultLocale?: SupportedLanguagesType
  /**
   * 加载消息功能，用于扩展第三方库的国际化
   * @param lang 目标语言
   * @returns 返回扩展的消息对象
   */
  loadMessages?: LoadMessageFn
  /**
   * 是否在找不到 key 时发出警告
   * @default true
   */
  missingWarn?: boolean
}

/** 语言切换函数类型 */
export type SwitchLanguageFn = (lang: SupportedLanguagesType) => Promise<void> | void

/** 第三方库本地化配置 */
export interface ThirdPartyLocaleConfig {
  /** Element Plus 语言包 */
  elementLocale?: import('element-plus/es/locale').Language
  /** Dayjs 语言包 */
  dayjsLocale?: any
}

/** 语言包映射类型 */
export type LocalesMap = Record<SupportedLanguagesType, ImportLocaleFn>

/** 核心设置返回类型 */
export interface CoreSetupResult {
  /** i18n 实例 */
  i18n: import('vue-i18n').VueI18n
  /** 加载本地化消息函数 */
  loadLocaleMessages: (lang: SupportedLanguagesType, localesMap: LocalesMap) => Promise<void>
}
