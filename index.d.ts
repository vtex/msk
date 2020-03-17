interface Msk {
  (str: string, mask: string): string
  fit: (str: string, mask: string) => string
}

declare const msk: Msk

export default msk
