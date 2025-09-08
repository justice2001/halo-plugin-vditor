/**
 * 将提供的html文本拷贝为富文本
 * @param html
 */
export function copyAsHTML(html: string): Promise<void> {
  // 生成纯文本版本
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  // 创建混合格式数据
  // const htmlBlob = new Blob([html], { type: 'text/html' });
  // const textBlob = new Blob([plainText], { type: 'text/plain' });
  // 使用现代Clipboard API
  const clipboardItem = new ClipboardItem({
    "text/html": new Blob([html], { type: "text/html" }),
    // 'text/plain': textBlob
  });
  return navigator.clipboard.write([clipboardItem]);
}
