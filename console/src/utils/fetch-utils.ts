import type {QuickInsert} from "@/type/editor";

export const fetchAllQuickInsert = async (): Promise<QuickInsert[]> => {
  const quickInsertList: QuickInsert[] = [];
  // Get Default Path
  try {
    const response = await fetch("/plugins/vditor-mde/assets/static/test.json");
    const quickInsertJson: QuickInsert = await response.json();
    quickInsertList.push(quickInsertJson);
  } catch (e) {
    // ignore this
  }
  return quickInsertList;
};
