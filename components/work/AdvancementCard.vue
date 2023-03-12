<script setup lang="ts">
import { useAuthUserStore } from '~~/stores/authUser';
import { AdvancementType, toJapanese } from '~~/types/advancementType';
const store = useAuthUserStore();

const props = defineProps<{
  user: {
    id: string,
    name: string,
    descriptipn?: string,
    avatar_url?: string
  }
  advancements?: {
    id: number,
    content: string,
    workshop_id: string,
    user_id?: string,
    advancement_type: AdvancementType,
  }[]
  reactions?: [{
    advancement_id: number,
    user_id: string,
    reaction_type: number
  }]
  presenterId?: string
}>()

const isGuide = ref(true)

const bgColor = computed(() => {
  return props.presenterId === props.user.id ? 'bg-green-200' : 'bg-gray-200'
})
const blankForm = computed(() => {
  return props.user.id === store.authUser?.user.id && props.advancements?.length === 0 && isGuide.value ? 'click-here' : ''
})
const emits = defineEmits<{
  (e: 'modal-open'): void;
}>();
const handleEditModalOpen = () => {
  isGuide.value = false
  emits('modal-open')
}
</script>

<template>
  <div class="rounded-xl w-[380px] h-48 grid grid-cols-8 grid-rows-4 mb-4 mr-4 p-1 shadow-md" :class="bgColor">
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
        class="btn btn-circle btn-ghost" :class="blankForm">
        <img src="/img/edit.svg" class="w-6 h-6" />
      </button>
    </div>
    <div class="col-span-7 row-span-3 px-2">
      <template v-if="props.advancements?.length !== 0">
        <div v-for="advancement in props.advancements">
          <div class="flex flex-col">
            <div class="badge badge-secondary badge-lg text-black shadow-md">
              {{ toJapanese(advancement.advancement_type) }}
            </div>
            <div class="h-12 p-2 break-all">
              {{ advancement.content }}
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

<style scoped>
.click-here {
  animation: bgchange 2s ease infinite;
}

@keyframes bgchange {
  0% {}

  50% {
    background: #f9e9c0;
  }

  100% {}
}
</style>
