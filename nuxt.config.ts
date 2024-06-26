// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false, },
  modules: [
    '@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt',
  ],
  css: ['~/styles/global.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

})
