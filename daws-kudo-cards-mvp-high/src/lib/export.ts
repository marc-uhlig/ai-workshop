import type { CardData } from './card'
import { downloadBaseName } from './card'

const exportOptions = {
  width: 1080,
  height: 1080,
  pixelRatio: 1,
  cacheBust: true,
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

export async function createPng(node: HTMLElement) {
  const { toPng } = await import('html-to-image')
  return toPng(node, exportOptions)
}

export async function downloadPng(node: HTMLElement, card: CardData) {
  const dataUrl = await createPng(node)
  const response = await fetch(dataUrl)
  const blob = await response.blob()
  saveBlob(blob, `${downloadBaseName(card)}.png`)
}

export async function downloadPdf(node: HTMLElement, card: CardData) {
  const image = await createPng(node)
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a6' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  pdf.addImage(image, 'PNG', 0, 0, pageWidth, pageHeight)
  saveBlob(pdf.output('blob'), `${downloadBaseName(card)}.pdf`)
}

export { exportOptions }
