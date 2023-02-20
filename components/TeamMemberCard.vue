<script setup lang="ts">
const props = defineProps<{
  team: {
    id: string,
    name: string,
    descriptipn?: string,
    users: {
      id: string,
      name: string,
      avatar_url?: string,
      description?: string
    }[]
  }
}>()
const MAX_MEMBER_COUNT = 6;
</script>

<template>
  <div class="bg-gray-200 rounded-xl hover:shadow-lg hover:transition-shadow duration-800 p-2">
    <NuxtLink :to='`/teams/${props.team.id}`' class="text-lg text-left ml-2 hover:link-info">{{ props.team.name }}
    </NuxtLink>
    <div class=" w-64 grid grid-cols-3 place-items-center">
      <div v-for="n of MAX_MEMBER_COUNT" :key="n">
        <div class="w-32 h-30 p-4 col-span-1 flex flex-col">
          <template v-if="!!props.team.users[n - 1]">
            <div class="flex justify-center">
              <UserProfileAvatar :user="props.team.users[n - 1]" :size=8 />
            </div>
            <div class="text-center text-xs">
              {{ props.team.users[n - 1] && props.team.users[n - 1]?.name }}
            </div>
          </template>
          <template v-else>
            <NuxtLink :to="'/teams/' + props.team.id + '/members/new'" class="flex flex-col">
              <div class="avatar justify-center opacity-40">
                <div class=" w-8 h-8">
                  <img src="/img/person_add.svg" />
                </div>
              </div>
              <div class="text-center text-xs text-gray-500">
                メンバー追加
              </div>
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
