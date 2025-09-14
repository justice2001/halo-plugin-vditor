export const addScript = (url: string, id: string): HTMLElement => {
  const headElement = document.getElementsByTagName("head")[0];
  const scriptElement = document.createElement("script");
  scriptElement.id = id;
  scriptElement.src = url;
  if (headElement) {
    headElement.append(scriptElement);
  }
  return scriptElement;
};

export const addStyleSheet = (url: string, id: string): HTMLElement => {
  const headElement = document.getElementsByTagName("head")[0];
  const linkElement = document.createElement("link");
  linkElement.id = id;
  linkElement.rel = "stylesheet";
  linkElement.href = url;
  if (headElement) {
    headElement.append(linkElement);
  }
  return linkElement;
};

export const addStyle = (style: string, id: string): HTMLElement => {
  const headElement = document.getElementsByTagName("head")[0];
  const styleElement = document.createElement("style");
  styleElement.id = id;
  styleElement.innerHTML = style;
  if (headElement) {
    headElement.append(styleElement);
  }
  return styleElement;
};
