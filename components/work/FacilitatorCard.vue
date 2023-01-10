<script setup lang="ts">
const props = defineProps<{
  user: {
    id: string,
    name: string,
    descriptipn?: string,
    avatar_url?: string
  }
}>()
</script>

<template>
  <div class="bg-gray-200 rounded-xl w-2/5 md:w-64 h-20 grid grid-cols-3 place-content-center">
    <div class="col-span-1 flex flex-col place-items-center place-self-center">
      <div class="avatar w-8 md:w-12 h-8 md:h-12">
        <div class="w-14 rounded-full">
          <img :src="props.user.avatar_url ? props.user.avatar_url : '/img/default_account.svg'" />
        </div>
      </div>
    </div>
    <div class="col-span-2 flex flex-col">
      <div class="text-left text-xs text-gray-600">
        ファシリテーター
      </div>
      <div class="text-left text-sm md:text-base">
        {{ props.user?.name }}
      </div>
    </div>
  </div>
</template>
