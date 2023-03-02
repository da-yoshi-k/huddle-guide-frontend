<script setup lang="ts">
import dayjs from 'dayjs';
const props = defineProps<{
  time: string | null,
  title: string
}>()
const nuxtApp = useNuxtApp();
let formatElapsedTime = ref('--:--')

const setFormatElapsedTime = () => {
  setInterval(() => {
    if (!props.time) {
      formatElapsedTime.value = '--:--'
      return
    }
    const dateStr = (new Date).toString()
    const diff = dayjs(dateStr).diff(nuxtApp.$validDate(props.time), 'second')
    formatElapsedTime.value = `${diff / 60 | 0}:${('0' + diff % 60).slice(-2)}`
  }, 1000)
}
// コンポーネントが存在する場合には常に実行
setFormatElapsedTime()
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div class="text-sm">{{ props.title }}</div>
    <div id="number" class="text-right tracking-wide">{{ formatElapsedTime }}</div>
  </div>
</template>

<style scoped>
#number {
  font-family: sans-serif;
}
</style>
