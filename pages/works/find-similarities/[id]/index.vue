<script setup lang="ts">
import { useWorkshopStore } from '~~/stores/workshop';
import ActionCable from 'actioncable'
const store = useWorkshopStore();
const route = useRoute();
await store.fetchWorkshop(route.params.id as string);
await store.fetchPosts(route.params.id as string);
const isEditModalOpen = ref(false)
const runTimeConfig = useRuntimeConfig();
const cable = ActionCable.createConsumer(runTimeConfig.public.actioncableUrl)
const workshopChannel = cable.subscriptions.create(
  { channel: 'WorkshopChannel', room: store.workshop?.workshop.id },
  {
    received({ type, body }) {
      switch (type) {
        case 'create_post':
          store.fetchPosts(store.workshop!.workshop.id)
          break
        case 'update_work_step':
          store.fetchWorkshop(store.workshop!.workshop.id)
          break
        case 'update_presenter':
          store.fetchWorkshop(store.workshop!.workshop.id)
          break
        case 'end_workshop':
          navigateTo(`/works/find-similarities/${store.workshop?.workshop.id}/complete`)
          break
      }
    }
  }
)
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
const handleWorkStep = async () => {
  await store.updateWorkStep(store.workshop!.workshop.work_step_id + 1).then(() => {
    workshopChannel.perform('update_work_step', {})
  })
}

const handlePostEdit = async (posts: any) => {
  await store.createPosts(posts);
  isEditModalOpen.value = false
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
  <h2 class="font-bold leading-tight text-2xl text-black m-4">共通点探し</h2>
  <WorkStepList :step="workStep" />
  <div class="ml-8 flex gap-6">
    <WorkFacilitatorCard :user="facilitator!" />
    <WorkPresenterCard :user="presenter" @next-presenter="nextPresenter" />
    <div class="flex items-center ml-auto mr-8">
      <WorkNextStepButton :step="workStep" @next-step="handleWorkStep" @end-work="handleEndWorkshop" />
    </div>
  </div>
  <div class="flex flex-row mt-8 place-content-around flex-wrap">
    <div v-for="user in store.workshop?.workshop.users" :key="user.id">
      <WorkFavoriteThingsCard :user="user" :posts="store.posts?.posts.filter(post => post.user_id === user.id)"
        :reactions=undefined :presenter-id="presenter?.id" @modal-open="handleModalOpen" />
    </div>
  </div>
  <WorkFavoriteEditModal :open-flag="isEditModalOpen" @close-modal="handleModalClose" @posts-edit="handlePostEdit" />
</template>
