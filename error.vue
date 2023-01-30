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
      <template v-if="error.statusCode === 403">
        <h1 class="text-5xl font-bold mt-4">403</h1>
        <p class="my-4">指定されたページへのアクセスは制限されています。</p>
      </template>
      <template v-else-if="error.statusCode === 404">
        <h1 class="text-5xl font-bold mt-4">404</h1>
        <p class="my-4">お探しのページは見つかりません。<br />指定されたページは存在しないか、または移動した可能性があります。</p>
      </template>
      <template v-else>
        <h1 class="text-5xl font-bold mt-4">{{ error.statusCode }}</h1>
        <p class="my-4">エラーが発生しました。</p>
      </template>
      <button @click="handleError" class="btn btn-primary text-yellow-100">トップページに戻る</button>
      <div v-if="isDev" class="mt-4">
        {{ error.message }}
      </div>
    </div>
    <TheFooter />
  </div>
</template>
