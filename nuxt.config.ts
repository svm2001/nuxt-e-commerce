// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    ssr: true,
    modules: [
        '@nuxtjs/tailwindcss',
        'shadcn-nuxt',
        '@nuxt/icon',
        "@pinia-plugin-persistedstate/nuxt",
        '@pinia/nuxt',
        '@nuxt/image',
        "@formkit/auto-animate/nuxt",
        ['@nuxtjs/google-fonts', {
            families: {
                SUSE: {
                    wght: [300, 400, 700],
                    ital: [300]
                },
            }
        }],
    ],
    pinia: {
        storesDirs: ['./store/**'],
    },
    shadcn: {
        prefix: '',
        componentDir: './components/ui'
    },
})