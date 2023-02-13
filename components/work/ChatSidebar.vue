<script setup lang="ts">
import { Message } from '~~/types/message';
const props = defineProps<{
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
}>();
const handleCreateMessage = () => {
  emits('create-message', message.value)
  message.value.message.content = ''
}
</script>

<template>
  <div class="hidden md:inline-block">
    <aside class="flex sticky top-16 w-80 flex-col border-l border-gray-500 shadow-md"
      style="height: calc(100vh - 64px)">
      <div class="border-b p-2 bg-slate-100">
        <div class="text-black text-xl text-center">チャット</div>
      </div>
      <div id="chat-messages-container" ref="chatLog" class="overflow-x-hidden overflow-y-scroll bg-white"
        style="height: calc(100vh - 220px)">
        <div v-for="message in props.messages" :key="message.id">
          <WorkChatMessage :message="message" :auth-user-id="props.authUserId" :users="props.users" />
        </div>
      </div>
      <div class="mt-auto mx-2 pt-6 h-32 border-t">
        <form @submit.prevent>
          <input type="text" v-model="message.message.content" class="input input-bordered md:w-[220px] mx-2"
            @keypress.enter="handleCreateMessage">
          <div class="btn btn-primary btn-md text-white" @click.stop.prevent="handleCreateMessage">送信</div>
        </form>
      </div>
    </aside>
  </div>
</template>
