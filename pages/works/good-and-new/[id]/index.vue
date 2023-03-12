<script setup lang="ts">
import { useWorkshopStore } from '~~/stores/workshop';
import { useAuthUserStore } from '~~/stores/authUser';
import ActionCable from 'actioncable'
import { useNotification } from '@kyvg/vue3-notification';
import { Message } from '~~/types/message';
import { Advancement } from '~~/types/advancement';
const { notify } = useNotification();

const store = useWorkshopStore();
const authUserStore = useAuthUserStore();
const route = useRoute();
const runTimeConfig = useRuntimeConfig();
const cable = ActionCable.createConsumer(runTimeConfig.public.actioncableUrl);

const fetchWorkshopInfo = async () => {
  await store.fetchWorkshop(route.params.id as string).then(() => {
    if (store.workshop?.workshop.work_step.name === '終了') {
      endWorkshop();
    }
  });
  await store.fetchAdvancements();
  await store.fetchMessages();
}
const isConnecting = ref(true)
await fetchWorkshopInfo();
const workshopChannel = cable.subscriptions.create(
  { channel: 'WorkshopChannel', room: store.workshop?.workshop.id },
  {
    async connected() {
      isConnecting.value = false
      await fetchWorkshopInfo()
    },
    disconnected() {
      isConnecting.value = true
    },
    async received({ type, body }) {
      switch (type) {
        case 'join_workshop':
          await fetchWorkshopInfo()
          break
        case 'edit_advancement':
          await store.fetchAdvancements()
          break
        case 'create_message':
          await store.fetchMessages().then(() => {
            isChatModalOpen.value ? isMessageUnread.value = false : isMessageUnread.value = true
          })
          break
        case 'update_work_step':
          notify({ type: "info", text: "ステップが変更されました。", duration: 1000 })
          await store.fetchWorkshop(store.workshop!.workshop.id)
          break
        case 'update_presenter':
          notify({ type: "info", text: "発表者が変更されました。", duration: 400 })
          await store.fetchWorkshop(store.workshop!.workshop.id)
          break
        case 'end_workshop':
          await store.fetchWorkshop(store.workshop!.workshop.id)
          endWorkshop()
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
const isMessageUnread = ref(false);

const nextPresenter = async () => {
  await store.nextPresenter().then(() => {
    workshopChannel.perform('update_presenter', {})
  });
}
const handleEditModalOpen = () => {
  isEditModalOpen.value = true
}
const handleEditModalClose = () => {
  isEditModalOpen.value = false
}
const handleChatModalOpen = () => {
  isChatModalOpen.value = true
  isMessageUnread.value = false
}
const handleChatModalClose = () => {
  isChatModalOpen.value = false
}

const handleWorkStep = async () => {
  await store.updateWorkStep(store.workshop!.workshop.work_step_id + 1).then(() => {
    workshopChannel.perform('update_work_step', {})
  })
}

const handleEditAdvancement = async (advancement: Advancement) => {
  if (!!advancement.content) {
    await store.editAdvancement(advancement).then(() => {
      workshopChannel.perform('edit_advancement', {})
    });
  }
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
const endWorkshop = () => {
  notify({ type: "info", text: "ワークショップが終了されました。<br /> 5秒後に終了画面に遷移します。", duration: 4500 })
  workshopChannel.unsubscribe();
  cable.disconnect();
  setTimeout(() => {
    navigateTo(`/works/good-and-new/${store.workshop?.workshop.id}/complete`)
  }, 5000);
}

useHead({ title: 'Good & New' })
definePageMeta({
  requireLogin: true,
  layout: "work",
})
</script>

<template>
  <div class="flex flex-row">
    <div class="flex justify-center w-full">
      <div class="w-full max-w-6xl">
        <div class="flex flex-col">
          <div class="flex">
            <h2 class="font-bold leading-tight text-2xl text-black m-4">Good & New</h2>
            <WorkCountupTimer :title="'ワーク経過時間'" :time="store.workshop!.workshop.work_start_time" class="ml-auto mr-6" />
          </div>
          <WorkStepList :step="workStep" />
          <div class="ml-8 flex gap-4 flex-wrap">
            <WorkFacilitatorCard :user="facilitator!" />
            <WorkPresenterCard :user="presenter" :work_step="store.workshop!.workshop.work_step.name"
              @next-presenter="nextPresenter" />
            <WorkCountupTimer :title="'発表時間'" :time="store.workshop!.workshop.turn_start_time" />
            <div class="flex items-center md:ml-auto mr-8">
              <WorkNextStepButton :step="workStep" @next-step="handleWorkStep" @end-work="handleEndWorkshop" />
            </div>
          </div>
          <div id="advancements" class="flex flex-row mt-8 place-content-around flex-wrap">
            <div v-for="user in store.workshop?.workshop.users" :key="user.id">
              <WorkAdvancementCard :user="user"
                :advancements="store.advancements?.advancements.filter(advancement => advancement.user_id === user.id)"
                :reactions=undefined :presenter-id="presenter?.id" @modal-open="handleEditModalOpen" />
            </div>
          </div>
          <div
            class="fixed right-5 md:right-10 bottom-5 md:bottom-10 flex justify-center items-center rounded-full border-2 border-black bg-white h-12 w-12 shadow-md hover:bg-gray-200 lg:invisible"
            @click="handleChatModalOpen">
            <img :src="isMessageUnread ? '/img/unread_chat.svg' : '/img/chat.svg'" class="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
    <WorkConnectingModal :open-flag="isConnecting" />
    <WorkChatSidebar :messages="store.messages?.messages" :users="store.workshop!.workshop.users"
      :auth-user-id="authUserStore.authUser!.user.id" @create-message="handleCreateMessage" />
    <WorkAdvancementEditModal :open-flag="isEditModalOpen" @close-modal="handleEditModalClose"
      @advancement-edit="handleEditAdvancement" />
    <WorkChatMessageModal :open-flag="isChatModalOpen" :messages="store.messages?.messages"
      :users="store.workshop!.workshop.users" :auth-user-id="authUserStore.authUser!.user.id"
      @close-chat-modal="handleChatModalClose" @create-message="handleCreateMessage" />
  </div>
</template>

<style scoped>
#advancements:after {
  content: "";
  display: block;
  width: 396px;
  height: 0;
}
</style>
