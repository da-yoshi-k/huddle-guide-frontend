<script setup lang="ts">
const props = defineProps<{
  user?: {
    id: string,
    name: string,
    descriptipn?: string,
    avatar_url?: string
  },
  work_step: string,
}>()

const typing = computed(() => {
  return props.work_step === '投稿'
})

const emits = defineEmits<{
  (e: 'next-presenter'): void;
}>();

const handleNextPresenter = () => {
  emits('next-presenter')
}
</script>

<template>
  <div class="bg-green-200 rounded-xl w-1/2 md:w-80 h-20 grid grid-cols-4 place-content-center">
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
      <div class="flex items-center">
        <div class="text-left text-xs text-gray-600">
          発表者
        </div>
        <div class="ml-1 w-3 h-3">
          <TooltipPresenterInfo />
        </div>
      </div>
      <div class="text-left text-sm md:text-base">
        <template v-if="!!props.user">
          {{ props.user?.name }}
        </template>
        <template v-else>
          <div class="text-gray-400">{{ props.work_step === '投稿' ? '(投稿中)' : '（自由発表）' }}</div>
        </template>
      </div>
    </div>
    <div class="col-span-1 place-items-center place-self-center">
      <div v-if="!typing" class="btn btn-sm p-2 btn-primary text-xs text-yellow-100" @click="handleNextPresenter">次へ
      </div>
    </div>
  </div>
</template>
