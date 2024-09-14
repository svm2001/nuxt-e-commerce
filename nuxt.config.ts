// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    ssr: true,
    modules: [
      '@nuxtjs/tailwindcss',
      'shadcn-nuxt',
      '@nuxt/icon',
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
      '@nuxt/image',
      '@nuxtjs/color-mode',
      "@formkit/auto-animate/nuxt",
      ['@nuxtjs/google-fonts', {
          families: {
              SUSE: {
                  wght: [300, 400, 700],
                  ital: [300]
              },
          }
      }],
      '@nuxtjs/color-mode',
    ],
    pinia: {
        storesDirs: ['./store/**'],
    },
    shadcn: {
        prefix: '',
        componentDir: './components/ui'
    },
})