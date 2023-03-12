<script setup lang="ts">
const props = defineProps<{
  step: number
}>();

const doneStep = (num: number) => {
  return num <= props.step ? 'step-primary' : ''
}
</script>

<template>
  <ul class="steps mb-4">
    <li class="step" :class="doneStep(1)">待機</li>
    <li class="step" :class="doneStep(2)">投稿</li>
    <li class="step" :class="doneStep(3)">順番に発表</li>
    <li class="step" :class="doneStep(4)">雑談</li>
    <li class="step" :class="doneStep(5)">終了</li>
  </ul>
</template>
