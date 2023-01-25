import { useAuthUserStore } from '~~/stores/authUser';
export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useAuthUserStore();
  const route = useRoute();
  const authUser = await store.fetchAuthUser();

  if (route.meta.requireLogin && !authUser && to.path !== '/login') {
    return navigateTo('/login');
  } else if (route.meta.noLoginAccess && authUser && to.path !== '/home') {
    return navigateTo('/home');
  }
});
