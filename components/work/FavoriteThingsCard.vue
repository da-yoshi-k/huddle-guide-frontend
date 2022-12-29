<script setup lang="ts">
import { useAuthUserStore } from '~~/stores/authUser';
const store = useAuthUserStore();

const props = defineProps<{
  user: {
    id: string,
    name: string,
    descriptipn?: string,
    avatar_url?: string
  }
  posts?: [{
    id: number,
    content: string,
    workshop_id: string,
    user_id?: string,
  }]
  reactions?: [{
    post_id: number,
    user_id: string,
    reaction_type: number
  }]
  presenterId?: string
}>()

const bgColor = computed(() => {
  return props.presenterId === props.user.id ? 'bg-green-200' : 'bg-gray-200'
})
</script>

<template>
  <div class="rounded-xl w-[380px] h-48 grid grid-cols-8 grid-rows-4 mb-4" :class="bgColor">
    <div class="col-span-1 flex place-self-center place-items-center">
      <div class="avatar w-8 h-8">
        <div class="w-14 rounded-full">
          <template v-if="!!props.user.avatar_url">
            <img :src="props.user.avatar_url" />
          </template>
          <template v-else>
            <img src="/img/default_account.svg" />
          </template>
        </div>
      </div>
    </div>
    <div class="col-span-7 flex items-center pl-2">
      <div class="text-left">
        {{ props.user?.name }}
      </div>
    </div>
    <div class="col-span-1 row-span-3 flex items-center">
      <button v-if="props.user.id === store.authUser?.user.id" class="btn btn-circle btn-ghost">
        <img src="/img/edit.svg" class="w-6 h-6" />
      </button>
    </div>
    <template v-if="!!props.posts">
      <div v-for="post in props.posts">
        <ul>
          <li>{{ post.content }}</li>
        </ul>
      </div>
    </template>
  </div>
</template>
