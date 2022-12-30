<script setup lang="ts">
const props = defineProps<{
  user?: {
    id: string,
    name: string,
    descriptipn?: string,
    avatar_url?: string
  }
}>()

const emits = defineEmits<{
  (e: 'next-presenter'): void;
}>();

const handleNextPresenter = () => {
  emits('next-presenter')
}
</script>

<template>
  <div class="bg-green-200 rounded-xl w-2/5 h-20 md:w-80 grid grid-cols-4 place-content-center">
    <div class="col-span-1 flex flex-col place-items-center place-self-center">
      <div class="avatar w-8 md:w-12 h-8 md:h-12">
        <div class="rounded-full">
          <template v-if="!!props.user?.avatar_url">
            <img :src="props.user.avatar_url" />
          </template>
          <template v-else-if="!!props.user">
            <img src="/img/default_account.svg" />
          </template>
          <template v-else>
            <img src="/img/free.svg" />
          </template>
        </div>
      </div>
    </div>
    <div class="col-span-2 flex flex-col">
      <div class="text-left text-xs">
        発表者
      </div>
      <div class="text-left">
        <template v-if="!!props.user">
          {{ props.user?.name }}
        </template>
        <template v-else>
          <div class="text-gray-400">（自由発表）</div>
        </template>
      </div>
    </div>
    <div class="col-span-1 place-items-center place-self-center">
      <div class="btn btn-sm btn-primary text-xs text-yellow-100" @click="handleNextPresenter">次へ</div>
    </div>
  </div>
</template>
