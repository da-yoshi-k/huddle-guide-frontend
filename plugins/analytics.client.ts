import { defineNuxtPlugin } from '#app';
import VueGtag from 'vue-gtag';

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();

  nuxtApp.vueApp.use(
    VueGtag,
    {
      appName: 'huddle-guide',
      pageTrackerScreenviewEnabled: true,
      config: { id: `G-XW88X9Z7D5` },
    },
    router
  );
});
