// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Huddle Guide',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }, // これを追記する
      ],
      htmlAttrs: {
        'data-theme': 'mytheme',
      },
    },
  },
  ssr: false,
  runtimeConfig: {
    public: {
      apiServerUrl: process.env.API_SERVER_URL,
    },
  },
  modules: [['@nuxtjs/tailwindcss'], ['@nuxtjs/google-fonts']],
  googleFonts: {
    families: {
      'BIZ+UDPGothic': true,
    },
    display: 'swap',
    download: true,
  },
});
