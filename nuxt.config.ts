// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            '「Huddle Guide」は同期型のワークを提供するチームビルディングサポートサービス。共通点探しやGood&Newといったワークでチームメンバーと交流しましょう。',
        },
        { property: 'og:title', content: 'Huddle Guide' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Huddle Guide' },
        { property: 'og:url', content: 'https://huddle-guide.com/' },
        {
          property: 'og:image',
          content: 'https://huddle-guide.com/img/ogp_image.png',
        },
        {
          property: 'og:description',
          content:
            '「Huddle Guide」は同期型のワークを提供するチームビルディングサポートサービス。共通点探しやGood&Newといったワークでチームメンバーと交流しましょう。',
        },
        { property: 'og:locale', content: 'ja_JP' },
        { name: 'keywords', content: 'チームビルディング,リモートワーク' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:site', content: '@da_yoshi_k' },
        { property: 'twitter:title', content: 'Huddle Guide' },
        {
          property: 'twitter:image',
          content: 'https://huddle-guide.com/img/ogp_image.png',
        },
        {
          property: 'twitter:description',
          content:
            '「Huddle Guide」は同期型のワークを提供するチームビルディングサポートサービス。共通点探しやGood&Newといったワークでチームメンバーと交流しましょう。',
        },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      htmlAttrs: {
        'data-theme': 'mytheme',
      },
    },
  },
  ssr: false,
  routeRules: {
    '/': { ssr: true },
  },
  runtimeConfig: {
    public: {
      apiServerUrl: '',
      stage: '',
      actioncableUrl: '',
      googleClientId: '',
    },
  },
  modules: [
    ['@nuxtjs/tailwindcss'],
    ['@nuxtjs/google-fonts'],
    ['@pinia/nuxt'],
    ['@pinia-plugin-persistedstate/nuxt'],
  ],
  googleFonts: {
    families: {
      'BIZ+UDPGothic': true,
    },
    display: 'swap',
  },
});
