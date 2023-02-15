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
  <div class="hidden lg:inline-block">
    <div class="flex flex-col sticky top-20 w-80 bg-white shadow-xl rounded-lg mt-2 mr-2 overflow-hidden"
      style="height: calc(100vh - 80px)">
      <div class="p-2 bg-slate-200">
        <div class="text-black text-xl ml-4">チャット</div>
      </div>
      <div id="chat-messages-container" ref="chatLog" class="px-2 overflow-x-hidden overflow-y-scroll bg-slate-50"
        style="height: calc(100vh - 220px)">
        <div v-for="message in props.messages" :key="message.id">
          <WorkChatMessage :message="message" :auth-user-id="props.authUserId" :users="props.users" />
        </div>
      </div>
      <div class="mt-auto pt-8 px-2 h-28 border-t border-gray-800 bg-slate-100">
        <form @submit.prevent>
          <input type="text" v-model="message.message.content" class="input input-bordered md:w-[220px] mx-2"
            @keypress.enter="handleCreateMessage">
          <div class="btn btn-primary btn-md text-white" @click.stop.prevent="handleCreateMessage">送信</div>
        </form>
      </div>
    </div>
  </div>
</template>
