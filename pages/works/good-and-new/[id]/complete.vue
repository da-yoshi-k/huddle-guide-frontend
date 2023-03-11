<script setup lang="ts">
import { useWorkshopStore } from '~~/stores/workshop';
import { useAuthUserStore } from '~~/stores/authUser';
const store = useWorkshopStore();
const authUserStore = useAuthUserStore();
const route = useRoute();
await store.fetchWorkshop(route.params.id as string)
await store.fetchAdvancements();
useHead({
  title: 'ワーク終了'
})
definePageMeta({
  requireLogin: true
})
</script>

<template>
  <h2 class="font-bold leading-tight text-2xl text-black m-4">Good & New</h2>
  <div class="flex justify-center">
    <div class="w-[90%] min-h-[600px] bg-green-100 rounded-xl mb-8">
      <div class="text-xl text-center my-4">ワーク終了</div>
      <div class="flex justify-center mb-10">
        <div class="mr-4">{{ $formatDate(store.workshop!.workshop.work_date) }}</div>
        <div>{{ `実施したワーク： ${store.workshop!.workshop.work.name}` }}</div>
      </div>
      <div class="flex justify-center">
        <NuxtLink to="/home" class="btn btn-primary text-yellow-100">ホームに戻る</NuxtLink>
      </div>
    </div>
  </div>
</template>
