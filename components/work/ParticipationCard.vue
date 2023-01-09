<script setup lang="ts">
const props = defineProps<{
  users: [{
    id: string,
    name: string,
    descriptipn?: string,
    avatar_url?: string
  }]
}>()
const MAX_MEMBER_COUNT = 6;
</script>

<template>
  <div class="bg-gray-200 rounded-xl w-11/12 grid grid-cols-3 place-items-center">
    <div v-for="n of MAX_MEMBER_COUNT" :key="n">
      <div class="w-32 h-30 p-4 col-span-1 flex flex-col">
        <template v-if="!!props.users[n - 1]">
          <div class="avatar justify-center">
            <div class="w-14 rounded-full">
              <img :src="props.users[n - 1].avatar_url ? props.users[n - 1].avatar_url : '/img/default_account.svg'" />
            </div>
          </div>
          <div class="text-center text-sm">
            {{ props.users[n - 1] && props.users[n - 1]?.name }}
          </div>
        </template>
        <template v-else>
          <div class="avatar justify-center opacity-30">
            <div class="w-14 rounded-full">
              <img src="/img/default_account.svg" />
            </div>
          </div>
          <div class="text-center text-sm">
            未参加
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
