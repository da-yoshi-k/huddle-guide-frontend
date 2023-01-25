<script setup lang="ts">
import { useAuthUserStore } from '~~/stores/authUser';
const store = useAuthUserStore();
const isLogin = ref(store.authUser?.user);
</script>

<template>
  <footer class="footer p-10 pb-20 md:pb-10 bg-neutral text-base-content mt-auto">
    <div>
      <NuxtLink :to="isLogin ? '/home' : '/'">
        <div class="text-4xl text-yellow-100">Huddle</div>
        <div class="text-4xl text-yellow-100">Guide</div>
      </NuxtLink>
    </div>
    <div>
      <NuxtLink to="/terms" class="link link-hover text-xl text-yellow-100">利用規約</NuxtLink>
      <NuxtLink to="/policy" class="link link-hover text-xl text-yellow-100">プライバシーポリシー</NuxtLink>
      <NuxtLink to="/about" class="link link-hover text-xl text-yellow-100">Huddle Guideとは</NuxtLink>
      <a class="link link-hover text-xl text-yellow-100" target="_blank" href="https://twitter.com/da_yoshi_k">お問合せ</a>
    </div>
  </footer>
</template>
