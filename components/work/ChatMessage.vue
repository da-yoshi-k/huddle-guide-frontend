<script setup lang="ts">
const props = defineProps<{
  message: {
    id: number,
    content: string,
    user_id: string,
    created_at: string,
  },
  authUserId: string,
  users: {
    id: string,
    name: string,
    avatar_url?: string,
  }[]
}>();

const speakedUser = computed(() => {
  return props.users.find(user => user.id === props.message.user_id)
})

const messagePosition = computed(() => {
  return props.message.user_id !== props.authUserId ? 'chat-start' : 'chat-end'
})

const messageBgColor = computed(() => {
  return props.message.user_id !== props.authUserId ? 'bg-gray-200' : ''
})
</script>

<template>
  <div class="chat" :class="messagePosition">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full bg-white">
        <img :src="speakedUser?.avatar_url ? speakedUser?.avatar_url : '/img/default_account.svg'" />
      </div>
    </div>
    <div class="chat-header">
      {{ speakedUser?.name }}
    </div>
    <div class="chat-bubble break-all text-sm" :class="messageBgColor">{{ props.message.content }}</div>
  </div>
</template>
