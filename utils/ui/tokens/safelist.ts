export function generateDarkSafelist(tokens: Record<string, any>): string[] {
  const safelist: string[] = []

  const darkColors = tokens?.['color scheme']?.['dark-mode']
  if (!darkColors) return safelist

  for (const colorName in darkColors) {
    const base = `dark:bg-${colorName}`
    safelist.push(base)
    safelist.push(`${base}/50`)
    safelist.push(`${base}/80`)
    safelist.push(`dark:text-${colorName}`)
  }

  return safelist
}
