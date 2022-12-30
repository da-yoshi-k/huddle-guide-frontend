<script setup lang="ts">
const props = defineProps<{
  step: number
}>();

const emits = defineEmits<{
  (e: 'next-step'): void;
  (e: 'end-work'): void;
}>();

const handleNextStep = () => {
  emits('next-step')
}

const handleWorkEnd = () => {
  emits('end-work')
}
</script>

<template>
  <template v-if="props.step === 2">
    <button class="btn btn-primary text-yellow-100" @click="handleNextStep">発表に移る</button>
  </template>
  <template v-else-if="props.step === 3">
    <button class="btn btn-primary text-yellow-100" @click="handleNextStep">雑談に移る</button>
  </template>
  <template v-else-if="props.step === 4">
    <button class="btn btn-primary text-yellow-100" @click="handleWorkEnd">ワークを終了する</button>
  </template>
</template>
