<script setup lang="ts">
import { Level } from '~~/types/level'
const like: Level[] = [1, 2, 3]
const degree: Level[] = [4, 5, 6]
const proficiency: Level[] = [7, 8, 9]

const props = defineProps<{
  index: number,
  selectedLevel: Level,
  disabled: boolean
}>();

const isDefaultLevel = computed(() => {
  return props.selectedLevel === 0
})

const emits = defineEmits<{
  (e: 'set-level', level: Level, index: number): void;
}>();

const handleSelectLevel = (level: Level) => {
  emits('set-level', level, props.index)
}
</script>

<template>
  <div class="flex items-center">
    <WorkFavoriteLevelBadge :level="props.selectedLevel" v-show="!isDefaultLevel" class="mr-2" />
    <VDropdown>
      <button class="btn btn-sm btn-outline btn-info text-xs" :disabled="props.disabled ? true : undefined">
        {{ isDefaultLevel ? 'レベル選択' : '変更' }}
      </button>

      <template #popper="{ hide }">
        <div class="p-4">
          <div class="text-xs mb-2">当てはまるものを1つ選択してください</div>
          <div class="mb-2">
            <div class="text-xs font-bold text-black">好み</div>
            <div class="flex gap-2">
              <div v-for="(value, key) in like" :key="key" class="cursor-pointer"
                @click="handleSelectLevel(value); hide()">
                <WorkFavoriteLevelBadge :level="value" />
              </div>
            </div>
          </div>
          <div class="mb-2">
            <div class="text-xs font-bold text-black">深さ</div>
            <div class="flex gap-2">
              <div v-for="(value, key) in degree" :key="key" class="cursor-pointer"
                @click="handleSelectLevel(value); hide()">
                <WorkFavoriteLevelBadge :level="value" />
              </div>
            </div>
          </div>
          <div class="mb-2">
            <div class="text-xs font-bold text-black">習熟度</div>
            <div class="flex gap-2">
              <div v-for="(value, key) in proficiency" :key="key" class="cursor-pointer"
                @click="handleSelectLevel(value); hide()">
                <WorkFavoriteLevelBadge :level="value" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </VDropdown>
  </div>
</template>

<style>
.v-popper--theme-dropdown .v-popper__inner {
  background: #f3f4f6;
  border: 1px solid #ddd;
  box-shadow: 0 6px 30px rgba(0, 0, 0, .1);
}
</style>
