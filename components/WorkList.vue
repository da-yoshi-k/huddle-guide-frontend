<script setup>
const runTimeConfig = useRuntimeConfig();
const header = { credentials: 'include' };
const { data } = await useFetch(
  runTimeConfig.public.apiServerUrl
  , { headers: header });
</script>

<template>
  <div v-for="item in data.works" :key="item.id">
    <div>実装予定：{{ item.name }}</div>
  </div>
</template>
