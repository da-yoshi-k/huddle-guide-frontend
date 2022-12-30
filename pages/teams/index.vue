<script setup lang="ts">
definePageMeta({
  requireLogin: true
})
</script>

<template>
  <div>
    <h2 class="py-4 text-3xl text-center font-bold">チーム</h2>
    <div id="team-container" class="mt-4 mx-auto px-4 max-w-3xl">
      <div class="ml-8 mb-8">
        <NuxtLink to="/teams/new" class="btn btn-primary text-yellow-100">
          チームを作成する
        </NuxtLink>
      </div>
      <div id="team-container">
        <h2 class="font-bold leading-tight text-2xl text-black mb-5">参加中のチーム</h2>
        <TeamCarousel />
      </div>
    </div>
  </div>
</template>
