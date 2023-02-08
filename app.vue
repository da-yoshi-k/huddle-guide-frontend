<script setup>
import { useSeoMeta } from '@unhead/vue';

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
useSeoMeta({
  description: '「Huddle Guide」は同期型のワークを提供するチームビルディングサポートサービス。共通点探しやGood&Newといったワークでチームメンバーと交流しよう。',
  ogTitle: 'Huddle Guide',
  ogSiteName: 'Huddle Guide',
  ogType: 'website',
  ogUrl: 'https://huddle-guide.com/',
  ogDescription: '「Huddle Guide」は同期型のワークを提供するチームビルディングサポートサービス。共通点探しやGood&Newといったワークでチームメンバーと交流しよう。',
  ogLocale: 'ja_JP',
  ogImage: 'https://huddle-guide.com/img/ogp_image.svg',
  keywords: 'チームビルディング,リモートワーク',
  twitterCard: 'summary_large_image',
  twitterSite: '@da_yoshi_k',
  twitterTitle: 'Huddle Guide',
  twitterDescription: '「Huddle Guide」は同期型のワークを提供するチームビルディングサポートサービス。共通点探しやGood&Newでチームメンバーと交流しよう。',
  twitterImage: 'https://huddle-guide.com/img/ogp_image.svg',
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <NuxtLayout>
      <NuxtLoadingIndicator :height=5 />
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
