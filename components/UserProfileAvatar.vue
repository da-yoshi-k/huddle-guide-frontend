<script setup lang="ts">
const props = defineProps<{
  user: {
    id: string,
    name: string,
    avatar_url?: string,
    description?: string
  },
  size: number
}>()
</script>

<template>
  <div>
    <VMenu :delay="{ show: 500, hide: 50 }">
      <div class="avatar">
        <div class="rounded-full" :class="`w-${props.size} h-${props.size}`">
          <img :src="props.user.avatar_url ? props.user.avatar_url : '/img/default_account.svg'" />
        </div>
      </div>
      <template #popper>
        <div class="bg-white p-4 max-w-[200px]">
          <div class="flex mb-2">
            <div class="avatar">
              <div class="w-8 h-8 rounded-full self-center">
                <img :src="props.user.avatar_url ? props.user.avatar_url : '/img/default_account.svg'" />
              </div>
            </div>
            <div class="ml-2 self-center">{{ props.user.name }}</div>
          </div>
          <div id="description" class="text-sm">{{ props.user.description }}</div>
        </div>
      </template>
    </VMenu>
  </div>
</template>

<style scoped>
#description {
  white-space: pre-wrap;
}
</style>
