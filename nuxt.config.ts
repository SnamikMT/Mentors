
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: [
    './src/assets/css/tailwind.css',
    './src/assets/css/font.css',
    './src/assets/css/scrollbar.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: '2025-11-05',
  modules: ['@pinia/nuxt'],
})
