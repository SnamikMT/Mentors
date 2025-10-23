import path from 'path'
import { fileURLToPath } from 'url'
import { parseTokensAll } from './utils/ui/tokens/parseTokens.ts'
import { generateDarkSafelist } from './utils/ui/tokens/safelist.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const tokenPath = path.resolve(__dirname, './utils/ui/tokens/tokens.json')
const rawTokens = parseTokensAll(tokenPath)
const safelist = generateDarkSafelist(rawTokens)

function prefixKeys(obj = {}, prefix = 'token') {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [`${prefix}-${k}`, v])
  )
}

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,ts}',
    './pages/**/*.{vue,ts}',
    './layouts/**/*.{vue,ts}',
    './app.vue'
  ],
  safelist,
  theme: {
    extend: {
      colors: prefixKeys(rawTokens.core?.colors),
      spacing: prefixKeys(rawTokens.core?.spacing),
      fontSize: prefixKeys(rawTokens.core?.fontSizes),
      fontFamily: prefixKeys(rawTokens.core?.fontFamilies),
      lineHeight: prefixKeys(rawTokens.core?.lineHeights),
      letterSpacing: prefixKeys(rawTokens.core?.letterSpacing),
      borderRadius: prefixKeys(rawTokens.core?.borderRadius),
      opacity: prefixKeys(rawTokens.core?.opacity),
      zIndex: prefixKeys(rawTokens['Z-index Level'])
    }
  }
}
