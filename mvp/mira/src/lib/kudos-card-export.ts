export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export function isClipboardImageCopySupported(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    'clipboard' in navigator &&
    typeof navigator.clipboard.write === 'function' &&
    typeof window !== 'undefined' &&
    typeof window.ClipboardItem === 'function'
  )
}

export async function copyBlobToClipboard(blob: Blob): Promise<void> {
  if (!isClipboardImageCopySupported()) {
    throw new Error('Clipboard image copy is not supported in this browser')
  }

  const item = new ClipboardItem({ [blob.type]: blob })
  await navigator.clipboard.write([item])
}
