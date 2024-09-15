// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false, },

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    // '@nuxt/fonts',
  ],

  pinia: {
    storesDirs: ['./stores/**'],
    disableVuex: true,
  },

  imports: {
    dirs: ['./stores'],
  },

  css: ['~/styles/global.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  plugins: ['~/plugins/index.ts'],
  compatibilityDate: '2024-09-12',
})
