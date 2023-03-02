<script setup lang="ts">
import dayjs from 'dayjs';
const props = defineProps<{
  time: string | null,
  title: string
}>()

let formatElapsedTime = ref('--:--')

const setFormatElapsedTime = () => {
  setInterval(() => {
    if (!props.time) {
      return
    }
    const dateStr = (new Date).toString()
    const diff = dayjs(dateStr).diff(dayjs(props.time), 'second')
    formatElapsedTime.value = `${diff / 60 | 0}:${('0' + diff % 60).slice(-2)}`
  }, 1000)
}
setFormatElapsedTime()
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div class="text-sm">{{ props.title }}</div>
    <div class="text-right">{{ formatElapsedTime }}</div>
  </div>
</template>
