import { useAuthUserStore } from '~~/stores/authUser';
export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useAuthUserStore();
  const route = useRoute();
  const authUser = await store.fetchAuthUser();

  if (route.meta.requireLogin === true && !authUser && to.path !== '/login') {
    return navigateTo('/login');
  }
});
