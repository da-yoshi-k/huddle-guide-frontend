<script setup>
const runTimeConfig = useRuntimeConfig();
if (runTimeConfig.public.stage === 'production') {
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - Huddle Guide` : 'Huddle Guide';
    }
  });
} else {
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${runTimeConfig.public.stage} ${titleChunk} | Huddle Guide` : 'Huddle Guide';
    },
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
