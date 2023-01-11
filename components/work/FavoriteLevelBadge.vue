<script setup lang="ts">
import { Level, toJapanese } from '~~/types/level';
const props = defineProps<{
  level: number
}>();

const badgeColor = computed(() => {
  switch (props.level as Level) {
    case Level.General:
      return '';
    case Level.Beginner:
      return 'badge-info';
    case Level.Casual:
      return 'badge-secondry';
    case Level.Hardcore:
      return 'badge-error'
  }
})

</script>

<template>
  <div class="badge badge-sm" :class="badgeColor">{{ toJapanese(props.level as Level) }}</div>
</template>
