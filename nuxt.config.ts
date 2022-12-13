// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Huddle Guide',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      htmlAttrs: {
        'data-theme': 'mytheme',
      },
    },
  },
  ssr: false,
  modules: [['@nuxtjs/tailwindcss'], ['@nuxtjs/google-fonts']],
  googleFonts: {
    families: {
      'BIZ+UDPGothic': true,
    },
    display: 'swap',
    download: true,
  },
});
