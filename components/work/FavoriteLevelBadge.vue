<script setup lang="ts">
import { Level, toJapanese } from '~~/types/level';
const props = defineProps<{
  level: Level
}>();

const badgeColor = computed(() => {
  switch (props.level as Level) {
    case Level.General:
      return '';
    case Level.Ordinary:
      return 'badge-secondry';
    case Level.Like:
      return 'badge-accent';
    case Level.Love:
      return 'badge-error'
    case Level.Novice:
      return 'badge-secondry';
    case Level.Casual:
      return 'badge-accent';
    case Level.Hardcore:
      return 'badge-error'
    case Level.Entry:
      return 'badge-secondry';
    case Level.Amateur:
      return 'badge-accent';
    case Level.Professional:
      return 'badge-error'
  }
})
</script>

<template>
  <div class="badge badge-sm text-[5px]" :class="badgeColor">{{ toJapanese(props.level) }}</div>
</template>
