<script setup lang="ts">
import { useWorkshopStore } from '~~/stores/workshop';
const store = useWorkshopStore();
const route = useRoute();
await store.fetchWorkshop(route.params.id as string)

const facilitator = computed(() => {
  return store.workshop?.workshop.users.find(user => user.id === store.workshop?.workshop.facilitator)
})
const presenter = computed(() => {
  return store.workshop?.workshop.users.find(user => user.id === store.workshop?.workshop.presenter)
})

const nextPresenter = () => {
  store.nextPresenter();
}

const endWorkshop = () => {
  navigateTo(`/works/find-similarities/${store.workshop?.workshop.id}`)
}

definePageMeta({
  requireLogin: true,
  layout: "work",
})
</script>

<template>
  <h2 class="font-bold leading-tight text-2xl text-black m-8">共通点探し</h2>
  <div class="ml-8 flex gap-6">
    <WorkFacilitatorCard :user="facilitator!" />
    <WorkPresenterCard :user="presenter" @next-presenter="nextPresenter" />
  </div>
  <div class="flex flex-row mt-8 place-content-around flex-wrap">
    <div v-for="participant in store.workshop?.workshop.users" :key="participant.id">
      <WorkFavoriteThingsCard :user="participant"
        :posts?="store.getPosts?.posts.filter((post) => { post.user_id === participant.id })" :reactions?="null"
        :presenter-id="presenter?.id" />
    </div>
  </div>
</template>
