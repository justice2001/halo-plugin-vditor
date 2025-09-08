import enUS from "@/i18n/en-US";
import zhCN from "@/i18n/zh-CN";
import zhTW from "@/i18n/zh-TW";
import type { I18nLang } from "@/type/i18n";
import { getLanguage } from "@/utils/vditor-utils";

const langDict = {
  zh_CN: zhCN,
  zh_TW: zhTW,
  en_US: enUS,
} satisfies Record<string, I18nLang>;

/**
 * 获取翻译的文本
 * @param key key
 * @param lang 目标语言
 */
export function t(key: string, lang: keyof II18n | undefined = undefined): string {
  if (!lang) lang = getLanguage(localStorage.getItem("locale") || "zh-CN");
  return langDict[lang][key];
}
