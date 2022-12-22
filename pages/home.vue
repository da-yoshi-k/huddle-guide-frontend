<template>
  <div id="home">
    <div id="home-container" class="mt-4 mx-4 max-w-lg">
      <div id="work-container" class="mb-8">
        <h2 class="font-bold leading-tight text-2xl text-black mb-4">参加可能なワーク</h2>
        <div class="flex">
          <div class="self-center text-lg text-black pl-4 mr-4">現在参加可能なワークはありません</div>
          <button class="btn btn-primary text-yellow-100">ワークを開始する</button>
        </div>
      </div>
      <div id="team-container">
        <h2 class="font-bold leading-tight text-2xl text-black mb-5">参加しているチーム</h2>
        <div class="flex">
          <div class="self-center text-xl text-black pl-4 mr-20">現在参加可能なワークはありません</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['require-login']
})
</script>
