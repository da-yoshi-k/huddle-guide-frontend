<script setup lang="ts">
import { useAuthUserStore } from '~~/stores/authUser';
const store = useAuthUserStore();
const props = defineProps<{ error: { message: string, statusCode: number } }>();
const handleError = () => clearError({ redirect: store.authUser !== null ? '/home' : '/' })
const isDev = process.dev;
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <div class="text-center">
      <template v-if="error.statusCode === 404">
        <h1 class="text-5xl font-bold mt-4">404</h1>
        <p class="my-4">ページが見つかりませんでした</p>
      </template>
      <template v-else>
        <p class="my-4">エラーが発生しました</p>
      </template>
      <button @click="handleError" class="btn btn-primary text-yellow-100">トップページに戻る</button>
      <div v-if="isDev" class="mt-4">
        {{ error.message }}
        {{ error.statusCode }}
      </div>
    </div>
    <TheFooter />
  </div>
</template>
