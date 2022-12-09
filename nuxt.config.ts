// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        'data-theme': 'mytheme',
      },
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
});
