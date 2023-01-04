import type { notify } from '@kyvg/vue3-notification';
declare module '#app' {
  interface NuxtApp {
    $notify: typeof notify;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $notify: typeof notify;
  }
}
