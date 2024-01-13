import type { Inject } from "@/type/editor";
import { addScript, addStyleSheet } from "@/utils/dom-utils";

export const quickInsertInject = (injectList: Inject[], id: string): void => {
  injectList.forEach((inject) => {
    const injectId = `${id}-${inject.id}`;
    switch (inject.type) {
      case "script":
        addScript(inject.url || "", injectId);
        break;
      case "style":
        addStyleSheet(inject.url || "", injectId);
        break;
    }
  });
};
