import zhCN from "@/i18n/zh-CN";
import type {I18nLang} from "@/type/i18n";
import zhTW from "@/i18n/zh-TW";
import enUS from "@/i18n/en-US";

const langDict: {[key: string]: I18nLang} = {
  "zh_CN": zhCN,
  "zh_TW": zhTW,
  "en_US": enUS
}

/**
 * 获取翻译的文本
 * @param key key
 * @param lang 目标语言
 */
export function t(key: string, lang: keyof II18n): string {
  return langDict[lang][key]
}
