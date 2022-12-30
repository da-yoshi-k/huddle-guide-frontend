<script setup>
const runTimeConfig = useRuntimeConfig();
if (runTimeConfig.public.stage === 'development') {
  useHead({
    meta: { hid: "robots", name: "robots", content: "noindex" }
  });
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
html {
  font-family: 'BIZ UDPGothic', sans-serif;
}
</style>
