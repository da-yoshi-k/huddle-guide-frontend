<script setup lang="ts">
import { useWorkshopStore } from '~~/stores/workshop';
import { useAuthUserStore } from '~~/stores/authUser';
import ActionCable from 'actioncable'
import { useNotification } from '@kyvg/vue3-notification';
import { Message } from '~~/types/message';
const { notify } = useNotification();

const store = useWorkshopStore();
const authUserStore = useAuthUserStore();
const route = useRoute();
const runTimeConfig = useRuntimeConfig();
const cable = ActionCable.createConsumer(runTimeConfig.public.actioncableUrl)
await store.fetchWorkshop(route.params.id as string).then(() => {
  if (store.workshop?.workshop.work_step.name === '終了') {
    cable.disconnect()
    navigateTo(`/works/find-similarities/${store.workshop?.workshop.id}/complete`)
  }
});
await store.fetchPosts(route.params.id as string);
await store.fetchMessages();
const workshopChannel = cable.subscriptions.create(
  { channel: 'WorkshopChannel', room: store.workshop?.workshop.id },
  {
    async received({ type, body }) {
      switch (type) {
        case 'create_post':
          await store.fetchPosts(store.workshop!.workshop.id)
          break
        case 'create_message':
          await store.fetchMessages()
          break
        case 'update_work_step':
          notify({ type: "info", text: "ステップが変更されました。", duration: 1000 })
          await store.fetchWorkshop(store.workshop!.workshop.id)
          break
        case 'update_presenter':
          await store.fetchWorkshop(store.workshop!.workshop.id)
          break
        case 'end_workshop':
          cable.disconnect();
          navigateTo(`/works/find-similarities/${store.workshop?.workshop.id}/complete`)
          break
      }
    }
  }
)

const isEditModalOpen = ref(false)
const isChatModalOpen = ref(false)
const facilitator = computed(() => {
  return store.workshop?.workshop.users.find(user => user.id === store.workshop?.workshop.facilitator)
})
const presenter = computed(() => {
  return store.workshop?.workshop.users.find(user => user.id === store.workshop?.workshop.presenter)
})
const workStep = computed(() => {
  return store.workshop!.workshop.work_step_id
})

const nextPresenter = async () => {
  await store.nextPresenter().then(() => {
    workshopChannel.perform('update_presenter', {})
  });
}
const handleModalOpen = () => {
  isEditModalOpen.value = true
}
const handleModalClose = () => {
  isEditModalOpen.value = false
}

const handleChatModalOpen = () => {
  isChatModalOpen.value = true
}
const handleChatModalClose = () => {
  isChatModalOpen.value = false
}

const handleWorkStep = async () => {
  await store.updateWorkStep(store.workshop!.workshop.work_step_id + 1).then(() => {
    workshopChannel.perform('update_work_step', {})
  })
}

const handlePostEdit = async (posts: any) => {
  await store.createPosts(posts);
  isEditModalOpen.value = false
}

const handleCreateMessage = async (message: Message) => {
  await store.createMessage(message);
}

const handleEndWorkshop = async () => {
  await store.updateWorkStep(store.workshop!.workshop.work_step_id + 1).then(() => {
    workshopChannel.perform('end_workshop', {})
  })
}

definePageMeta({
  requireLogin: true,
  layout: "work",
})
</script>

<template>
  <div class="flex justify-center w-full">
    <div class="w-full max-w-6xl">
      <div class="flex flex-col">
        <h2 class="font-bold leading-tight text-2xl text-black m-4">共通点探し</h2>
        <WorkStepList :step="workStep" />
        <div class="ml-8 flex gap-4 flex-wrap">
          <WorkFacilitatorCard :user="facilitator!" />
          <WorkPresenterCard :user="presenter" @next-presenter="nextPresenter" />
          <div class="flex items-center md:ml-auto mr-8">
            <WorkNextStepButton :step="workStep" @next-step="handleWorkStep" @end-work="handleEndWorkshop" />
          </div>
        </div>
        <div class="flex flex-row mt-8 place-content-around flex-wrap">
          <div v-for="user in store.workshop?.workshop.users" :key="user.id">
            <WorkFavoriteThingsCard :user="user" :posts="store.posts?.posts.filter(post => post.user_id === user.id)"
              :reactions=undefined :presenter-id="presenter?.id" @modal-open="handleModalOpen" />
          </div>
        </div>
        <div
          class="fixed right-5 md:right-10 bottom-5 md:bottom-10 flex justify-center items-center rounded-full border-2 border-black bg-white h-12 w-12 shadow-md hover:bg-gray-200"
          @click="handleChatModalOpen">
          <img src="/img/chat.svg" class="h-8 w-8" />
        </div>
        <WorkFavoriteEditModal :open-flag="isEditModalOpen" @close-modal="handleModalClose"
          @posts-edit="handlePostEdit" />
        <WorkChatMessageModal :open-flag="isChatModalOpen" :messages="store.messages?.messages"
          :users="store.workshop!.workshop.users" :auth-user-id="authUserStore.authUser!.user.id"
          @close-chat-modal="handleChatModalClose" @create-message="handleCreateMessage" />
      </div>
    </div>
  </div>
</template>
