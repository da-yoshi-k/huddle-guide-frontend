<script setup>
const runTimeConfig = useRuntimeConfig();
if (runTimeConfig.public.stage === 'production') {
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} | Huddle Guide` : 'Huddle Guide';
    }
  });
} else {
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `(${runTimeConfig.public.stage})${titleChunk} | Huddle Guide` : `(${runTimeConfig.public.stage}) Huddle Guide`;
    },
    meta: { hid: "robots", name: "robots", content: "noindex" }
  });
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <NuxtLayout>
      <NuxtLoadingIndicator :height=5 style="top: 64px" />
      <NuxtPage />
    </NuxtLayout>
  </div>
  <CustomNotification />
</template>

<style>
html {
  font-family: 'BIZ UDPGothic', sans-serif;
}
</style>
