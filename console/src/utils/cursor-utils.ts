export function getCursor() {
  return window.getSelection()?.getRangeAt(0).cloneRange();
}

export function setCursor(range: Range | undefined) {
  if (!range) return;
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}
