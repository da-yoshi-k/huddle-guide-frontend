<script setup lang="ts">
import { useAuthUserStore } from '~~/stores/authUser';
const store = useAuthUserStore();
const logout = () => {
  try {
    localStorage.removeItem('auth_token');
    store.$patch({
      authUser: null
    })
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="sticky top-0 z-30 navbar bg-neutral bg-opacity-95 h-12 md:h-16">
    <!-- 未ログイン -->
    <template v-if="!store.authUser?.user">
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
    <template v-else>
      <div class="flex-1">
        <NuxtLink to="/home">
          <img src="/img/nav_logo.png" alt="huddle-guide brand logo">
        </NuxtLink>
      </div>
      <div class="flex-none text-yellow-100 md:mr-4">
        <ul class="menu menu-horizontal px-1">
          <li tabindex="0">
            <div id="user-info">
              {{ store.authUser?.user.name }}
              <template v-if="!!store.authUser.user.avatar_url">
                <div class="avatar">
                  <div class="w-10 rounded-full">
                    <img :src="store.authUser.user.avatar_url" />
                  </div>
                </div>
              </template>
              <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </div>
            <ul class="p-2 bg-neutral">
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

