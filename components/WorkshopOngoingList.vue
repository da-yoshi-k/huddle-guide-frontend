<script setup lang="ts">
const nuxtApp = useNuxtApp();
const props = defineProps<{
  workshops?: {
    id: string,
    created_at: string,
    work: {
      name: string
    },
    team: {
      name: string
    },
    work_step: {
      name: string
    }
  }[]
}>()

const route = useRoute();

const ongoingWorkshops = computed(() => {
  return props.workshops?.filter(workshop => workshop.work_step.name !== "終了")
})

const formatCreatedAt = (createdAt: string) => {
  return nuxtApp.$formatDateTime(createdAt)
}

const handleParticipateWorkshop = async (workshopId: string, workshopName: string) => {
  const options = useApiFetchOption();
  await useFetch(`workshops/${workshopId}/participations`, {
    method: "POST",
    ...options,
  }).then(() => {
    switch (workshopName) {
      case '共通点探し':
        navigateTo(`/works/find-similarities/${workshopId}/standby`)
        break;
      case 'Good & New':
        navigateTo(`/works/good-and-new/${workshopId}/standby`)
        break;
    }
  }).catch((error) => {
    console.log(error)
  });
}
</script>

<template>
  <template v-if="ongoingWorkshops?.length !== 0">
    <div v-for="workshop in ongoingWorkshops" :key="workshop.id">
      <div class="flex flex-row justify-center gap-2 md:gap-10 mb-4">
        <div class="flex items-center">{{ workshop.team.name }}</div>
        <div class="flex items-center justify-center w-[110px]">{{ workshop.work.name }}</div>
        <div class="flex flex-col">
          <div class="flex justify-center text-sm">開始日時</div>
          <div class="flex items-center text-sm">{{ formatCreatedAt(workshop.created_at) }}</div>
        </div>
        <button class="btn btn-primary text-yellow-100"
          @click="handleParticipateWorkshop(workshop.id, workshop.work.name)">参加する</button>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="flex flex-row gap-12">
      <div class="text-black ml-4 flex items-center">参加可能なワークがありません</div>
      <template v-if="route.path !== '/works'">
        <NuxtLink to="/works" class="btn btn-primary text-yellow-100">
          ワークを開始する
        </NuxtLink>
      </template>
    </div>
  </template>
</template>
