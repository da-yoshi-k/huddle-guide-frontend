<script setup lang="ts">
definePageMeta({
  requireLogin: true
})
</script>

<template>
  <h2 class="font-bold leading-tight text-2xl text-black m-4">共通点探し</h2>
  <div class="flex justify-center">
    <div class="w-[90%] min-h-[600px] bg-green-100 rounded-xl mb-8">
      <div class="text-xl text-center my-4">ワーク終了</div>
      <div class="text-lg text-center mb-8">試していただきありがとうございます！<br />順次機能を追加していくので楽しみにしてください</div>
      <div class="flex justify-center">
        <NuxtLink to="/home" class="btn btn-primary text-yellow-100">ホームに戻る</NuxtLink>
      </div>
    </div>
  </div>
</template>
