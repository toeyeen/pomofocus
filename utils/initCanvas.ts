interface Style {
  width: number,
  height: number,
  border?: string
}

export default function initCanvas(canvas: HTMLCanvasElement, style: Style) {
  const ctx = canvas.getContext('2d')
  canvas.width = style.width
  canvas.height = style.height
  canvas.style.border = style.border || '1px solid #000'
  return ctx
}
