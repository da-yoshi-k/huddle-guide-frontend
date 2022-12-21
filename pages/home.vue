<template>
  <div id="home">
    <div>Home</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['require-login']
})
</script>
