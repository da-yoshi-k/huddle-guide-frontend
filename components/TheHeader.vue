<script setup lang="ts">
import { useAuthUserStore } from '~~/stores/authUser';
import { useNotification } from '@kyvg/vue3-notification';
const { notify } = useNotification();
const store = useAuthUserStore();
const isLogin = ref(store.authUser?.user);
const logout = () => {
  try {
    localStorage.removeItem('auth_token');
    store.$patch({
      authUser: null
    })
    notify({ type: 'success', text: "ログアウトしました。" })
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="sticky top-0 z-30 navbar bg-neutral bg-opacity-95 h-12 md:h-16 shadow-sm">
    <!-- 未ログイン -->
    <template v-if="!isLogin">
      <div class="flex-1">
        <NuxtLink to="/">
          <img src="/img/nav_logo.png" alt="huddle-guide brand logo">
        </NuxtLink>
      </div>
      <div class="flex-none">
        <NuxtLink to="/login" class="btn btn-active brn-primary shadow text-sm md:text-lg text-base-100">
          ログイン
        </NuxtLink>
      </div>
    </template>
    <!-- ログイン後 -->
    <template v-else-if="isLogin">
      <div class="flex-1">
        <NuxtLink to="/home">
          <img src="/img/nav_logo.png" alt="huddle-guide brand logo">
        </NuxtLink>
      </div>
      <div class="flex-none text-yellow-100">
        <ul class="menu menu-horizontal">
          <li tabindex="0">
            <div id="user-info">
              <div class="text-sm md:text-base">
                {{ store.authUser?.user.name }}
              </div>
              <template v-if="!!store.authUser?.user.avatar_url">
                <div class="avatar">
                  <div class="w-6 md:w-10 rounded-full">
                    <img :src="store.authUser.user.avatar_url" />
                  </div>
                </div>
              </template>
              <div class="w-4 md:w-5 h-4 md:h-5">
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </div>
            </div>
            <ul class="p-3 bg-neutral rounded-lg">
              <li>
                <NuxtLink to="/login" @click="logout()">
                  ログアウト
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

