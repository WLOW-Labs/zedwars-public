export default function string_truncate(inp: string, length: number) {
  return inp.slice(0, length) + '...' + inp.slice(-length)
}
