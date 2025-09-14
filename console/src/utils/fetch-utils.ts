import type { QuickInsert } from "@/type/editor";

/**
 * 获取所有快速插入的配置文件
 * @param quickInsertUrls 配置文件地址
 * @return 配置文件
 */
export const fetchAllQuickInsert = async (quickInsertUrls: { url: string }[]): Promise<QuickInsert[]> => {
  const quickInsertList: QuickInsert[] = [];
  // Get Default Path
  for (const qi of quickInsertUrls) {
    try {
      const response = await fetch(qi.url);
      const quickInsertJson: QuickInsert = await response.json();
      quickInsertList.push(quickInsertJson);
    } catch {
      // ignore this
    }
  }
  return quickInsertList;
};

/**
 * 获取所有自定义渲染器的脚本
 * @param customRenders URL列表
 * @return {string[]} 渲染器脚本文本
 */
export const fetchAllCustomRenderScripts = async (customRenders: { url: string }[]): Promise<string[]> => {
  const scripts: string[] = [];
  for (const render of customRenders) {
    try {
      const response = await fetch(render.url);
      scripts.push(await response.text());
    } catch {
      // Ignore this
      console.error("Load custom render scripts failed! url => " + render.url);
    }
  }
  return scripts;
};
