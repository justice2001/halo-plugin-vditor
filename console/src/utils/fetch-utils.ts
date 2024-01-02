import type { QuickInsert } from "@/type/editor";

/**
 * 获取所有快速插入的配置文件
 * @param quickInsertUrls 配置文件地址
 * @return 配置文件
 */
export const fetchAllQuickInsert = async (
  quickInsertUrls: { url: string }[]
): Promise<QuickInsert[]> => {
  const quickInsertList: QuickInsert[] = [];
  // Get Default Path
  for (const qi of quickInsertUrls) {
    try {
      const response = await fetch(qi.url);
      const quickInsertJson: QuickInsert = await response.json();
      quickInsertList.push(quickInsertJson);
    } catch (e) {
      // ignore this
    }
  }
  return quickInsertList;
};
