<script setup lang="ts">
const props = defineProps<{
  workshops?: {
    id: string,
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

const ongoingWorkshops = computed(() => {
  return props.workshops?.filter(workshop => workshop.work_step.name !== "終了")
})

const handleParticipateWorkshop = async (workshopId: string) => {
  const options = useApiFetchOption();
  await useFetch(`workshops/${workshopId}/participations`, {
    method: "POST",
    ...options,
  }).then(() => {
    // TODO ワークごとに遷移先を決定する
    navigateTo(`/works/find-similarities/${workshopId}/standby`)
  }).catch((error) => {
    console.log(error)
  });
}
</script>

<template>
  <div class="mb-10">
    <h2 class="font-bold leading-tight text-2xl text-black mb-4">参加可能なワーク</h2>
    <template v-if="ongoingWorkshops?.length !== 0">
      <div v-for="workshop in ongoingWorkshops" :key="workshop.id">
        <div class="flex flex-row justify-center gap-10 mb-2">
          <div class="flex items-center">{{ workshop.team.name }}</div>
          <div class="flex items-center">{{ workshop.work.name }}</div>
          <button class="btn btn-primary text-yellow-100" @click="handleParticipateWorkshop(workshop.id)">参加する</button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex flex-row gap-12">
        <div class="text-black ml-4 flex items-center">参加可能なワークがありません</div>
        <NuxtLink to="/works" class="btn btn-primary text-yellow-100">
          ワークを開始する
        </NuxtLink>
      </div>
    </template>
  </div>
</template>
