<script setup>
const runTimeConfig = useRuntimeConfig();
const options = useApiFetchOption();
const { data } = await useFetch("works", options);
</script>

<template>
  <div v-for="item in data.works" :key="item.id">
    <div>実装予定：{{ item.name }}</div>
  </div>
</template>
