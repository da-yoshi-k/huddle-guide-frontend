<script setup lang="ts">
import { Level, toJapanese } from '~~/types/level';
const props = defineProps<{
  level: Level
}>();

const badgeColor = computed(() => {
  switch (props.level as Level) {
    case Level.General:
      return '';
    case Level.Beginner:
      return 'badge-info';
    case Level.Casual:
      return 'badge-secondry';
    case Level.Professional:
      return 'badge-accent'
    case Level.Hardcore:
      return 'badge-error'
  }
})
</script>

<template>
  <div class="badge badge-sm" :class="badgeColor">{{ toJapanese(props.level) }}</div>
</template>
