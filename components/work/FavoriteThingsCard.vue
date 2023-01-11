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
  posts?: {
    id: number,
    content: string,
    workshop_id: string,
    user_id?: string,
    level: number,
    sameUsers?: {
      name: string,
      avatar_url?: string,
    }[]
  }[]
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
const emits = defineEmits<{
  (e: 'modal-open'): void;
}>();
const handleEditModalOpen = () => {
  emits('modal-open')
}
</script>

<template>
  <div class="rounded-xl w-[380px] h-48 grid grid-cols-8 grid-rows-4 mb-4 mr-4 shadow-md" :class="bgColor">
    <div class="col-span-1 flex place-self-center place-items-center">
      <div class="avatar w-8 h-8">
        <div class="w-14 rounded-full">
          <img :src="props.user.avatar_url ? props.user.avatar_url : '/img/default_account.svg'" />
        </div>
      </div>
    </div>
    <div class="col-span-7 flex items-center pl-2">
      <div class="text-left text-bold">
        {{ props.user?.name }}
      </div>
    </div>
    <div class="col-span-1 row-span-3 flex items-center">
      <button for="favorite-edit-modal" v-if="props.user.id === store.authUser?.user.id" @click="handleEditModalOpen"
        class="btn btn-circle btn-ghost">
        <img src="/img/edit.svg" class="w-6 h-6" />
      </button>
    </div>
    <div class="col-span-7 row-span-3 flex flex-col">
      <template v-if="props.posts?.length !== 0">
        <div v-for="post in props.posts">
          <div class="flex">
            <div class="h-12 flex justify-center items-center w-16">
              <WorkFavoriteLevelBadge :level="post.level" v-if="post.level !== 0" />
            </div>
            <div class="h-12 flex items-center">
              {{ post.content }}
            </div>
            <div v-if="post.sameUsers" class="flex ml-auto mr-2 items-center">
              <div class="avatar-group -space-x-4">
                <div v-for="user in post.sameUsers">
                  <div class="avatar bg-white">
                    <div class="w-6">
                      <img :src="user.avatar_url ? user.avatar_url : '/img/default_account.svg'" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="text-black">
          まだ投稿されていません。
        </div>
      </template>
    </div>
  </div>
</template>
