export type SupportedLanguagesType = 'en' | 'zh' | string

export type ImportLocaleFn = () => Promise<{ default: Record<string, string> }>

export type LoadMessageFn = (
  lang: SupportedLanguagesType
) => Promise<Record<string, string> | undefined>

export interface LocaleSetupOptions {
  /**
   * 默认语言
   * @default zh-CN
   */
  defaultLocale?: SupportedLanguagesType
  /**
   * 加载消息功能
   * @param lang
   * @returns
   */
  loadMessages?: LoadMessageFn
  /**
   * 是否在找不到 key 时发出警告
   */
  missingWarn?: boolean
}
