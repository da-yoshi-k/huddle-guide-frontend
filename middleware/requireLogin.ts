import { useAuthUserStore } from '~~/stores/authUser';
export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useAuthUserStore();
  const authUser = await store.fetchAuthUser();
  if (!authUser) {
    return navigateTo('/login');
  }
});
