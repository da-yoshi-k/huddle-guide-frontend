<script setup>
const runTimeConfig = useRuntimeConfig();
const { data } = await useFetch(
  runTimeConfig.public.apiServerUrl
);
</script>

<template>
  <div v-for="item in data.works" :key="item.id">
    <div>実装予定：{{ item.name }}</div>
  </div>
</template>
