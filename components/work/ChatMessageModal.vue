<script setup lang="ts">
import { Message } from '~~/types/message';

const props = defineProps<{
  openFlag: boolean,
  messages?: [{
    id: number,
    content: string,
    user_id: string,
    created_at: string,
  }],
  authUserId: string,
  users: {
    id: string,
    name: string,
    avatar_url?: string,
  }[]
}>();

const chatLog = ref();

const modalOpen = computed(() => {
  return props.openFlag ? 'modal-open' : ''
})

const message = computed(() => {
  return {
    message: { content: '' }
  }
})

watch(
  () => props.messages,
  () => {
    nextTick(() => { chatLog.value.scrollTop = chatLog.value.scrollHeight })
  }
)

const emits = defineEmits<{
  (e: 'create-message', message: Message): void;
  (e: 'close-chat-modal'): void;
}>();
const handleCreateMessage = () => {
  emits('create-message', message.value)
  message.value.message.content = ''
}
const handleCloseModal = () => {
  emits('close-chat-modal')
}
</script>

<template>
  <label for="chat-message-modal" class="modal bg-slate-100 bg-opacity-50" :class="modalOpen"
    @click.self="handleCloseModal">
    <label class="modal-box relative" for="">
      <label for="chat-message-modal" class="btn btn-md btn-circle btn-ghost absolute right-2 top-2"
        @click="handleCloseModal">✕</label>
      <h3 class="text-xl font-bold mb-4 border border-gray-100">チャット</h3>
      <div id="chat-messages-container" ref="chatLog" class="m-4 max-h-[500px] overflow-scroll">
        <div v-for="message in props.messages" :key="message.id">
          <WorkChatMessage :message="message" :auth-user-id="props.authUserId" :users="props.users" />
        </div>
      </div>
      <form @submit.prevent>
        <input type="text" v-model="message.message.content"
          class="input input-bordered w-[200px] md:w-[360px] mr-2 md:mr-4" @keypress.enter="handleCreateMessage">
        <div class="btn btn-primary btn-sm md:btn-md text-white" @click.stop.prevent="handleCreateMessage">送信</div>
      </form>
    </label>
  </label>
</template>

<style>
#chat-messages-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

#chat-messages-container::-webkit-scrollbar {
  display: none;
}
</style>
