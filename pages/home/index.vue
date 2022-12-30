<script setup lang="ts">
definePageMeta({
  requireLogin: true
})
</script>

<template>
  <div id="home">
    <h2 class="py-4 text-3xl text-center font-bold">ホーム</h2>
    <div id="home-container" class="mt-4 mx-auto px-4 max-w-3xl">
      <div id="ongoing-work-container" class="flex flex-col mb-8">
        <h2 class="font-bold leading-tight text-2xl text-black mb-4">参加可能なワーク</h2>
        <div class="flex">
          <div class="self-center text-lg text-black pl-4 mr-4">現在参加可能なワークはありません</div>
          <NuxtLink to="/works" class="btn btn-primary text-yellow-100">
            ワークを開始する
          </NuxtLink>
        </div>
      </div>
      <div id="team-container">
        <h2 class="font-bold leading-tight text-2xl text-black mb-5">参加中のチーム</h2>
        <div class="flex">
          <div class="self-center text-xl text-black pl-4 mr-20">参加中のチーム</div>
        </div>
      </div>
    </div>
  </div>
</template>

