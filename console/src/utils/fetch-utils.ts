import type { QuickInsert } from "@/type/editor";

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
