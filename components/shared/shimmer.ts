export const shimmerBlur: string = (() => {
  if (typeof btoa !== 'function') return ''
  const svg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#E5DCC8"/><rect width="800" height="600" fill="url(#g)"><animate attributeName="x" from="-800" to="800" dur="1.5s" repeatCount="indefinite"/></rect><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#E5DCC8" stop-opacity="0.2"/><stop offset="50%" stop-color="#C9A24B" stop-opacity="0.08"/><stop offset="100%" stop-color="#E5DCC8" stop-opacity="0.2"/></linearGradient></defs></svg>`
  return `data:image/svg+xml;base64,${btoa(svg)}`
})()

export const shimmerImgProps = {
  placeholder: 'blur' as const,
  blurDataURL: shimmerBlur,
}
