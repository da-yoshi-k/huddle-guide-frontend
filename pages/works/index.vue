<script setup lang="ts">
import { useTeamsStore } from '~~/stores/teams';
import { useWorkshopsStore } from '~~/stores/workshops';
import { Workshop } from '~~/types/workshop';
const selectedWork = ref({
  work: {
    id: 1,
    name: '共通点探し'
  }
})
const handleShowSelectModal = (id: number, name: string) => {
  selectedWork.value.work.id = id
  selectedWork.value.work.name = name
}
const workshopsStore = useWorkshopsStore();
await workshopsStore.fetchWorkshops();
const teamStore = useTeamsStore();
const teams = await teamStore.fetchTeams();
const standby = (async (teamId: string) => {
  const workshop = {
    work_id: selectedWork.value.work.id,
    team_id: teamId,
  }
  const options = useApiFetchOption();
  await useFetch<Workshop>('workshops', {
    method: 'POST',
    body: workshop,
    ...options,
  }).then((data) => {
    const workshopId = data.data.value?.workshop.id
    switch (data.data.value?.workshop.work.id) {
      case 1:
        navigateTo(`/works/find-similarities/${workshopId}/standby`)
        break;
      case 2:
        navigateTo(`/works/good-and-new/${workshopId}/standby`)
        break;
    }
  })
})

useHead({ title: 'ワーク一覧' })
definePageMeta({
  requireLogin: true
})
</script>

<template>
  <div id="work">
    <h2 class="py-4 text-3xl text-center text-black font-bold">ワーク</h2>
    <div id="ongoing-work-container" class="mt-4 mx-auto px-4 max-w-3xl">
      <div id="work-container" class="mb-8">
        <h3 class="font-bold leading-tight text-2xl text-black mb-4">参加可能なワーク</h3>
        <WorkshopOngoingList :workshops="workshopsStore.workshops?.workshops" />
      </div>
      <h3 class="font-bold leading-tight text-2xl text-black mb-4">ワーク一覧</h3>
      <div id="works-container" class="flex flex-col items-center md:flex-row md:justify-around mb-8">
        <div class="card w-80 bg-base-100 shadow-xl mb-8">
          <figure><img src="/img/works_discussion.svg" alt="共通点探し" class="w-[200px] mt-4" /></figure>
          <div class="card-body">
            <h4 class="card-title">共通点探し</h4>
            <p>チームの仲間との共通点を探してみませんか？<br />（目安時間：30〜50分）</p>
            <div class="card-actions justify-around">
              <div @click="handleShowSelectModal(1, '共通点探し')">
                <label for="work-select-modal" class="btn btn-primary text-yellow-100">開始する</label>
              </div>
              <NuxtLink to="/works/find-similarities/about">
                <button class="btn btn-primary text-yellow-100">使い方</button>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="card w-80 shadow-xl mb-8">
          <figure><img src="/img/works_news.svg" alt="Good&new" class="w-[200px] mt-4" /></figure>
          <div class="card-body">
            <h4 class="card-title">Good & New</h4>
            <p>日々の中であった良かったことや<br />新しいニュースを共有しましょう<br />（目安時間：10〜20分）</p>
            <div class="card-actions justify-around">
              <div @click="handleShowSelectModal(2, 'Good & New')">
                <label for="work-select-modal" class="btn btn-primary text-yellow-100">開始する</label>
              </div>
              <NuxtLink to="/works/good-and-new/about">
                <button class="btn btn-primary text-yellow-100">使い方</button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-right">
      <a href="https://storyset.com/research" class="link-hover text-info text-xs mr-2">Illustration by Storyset</a>
    </div>
  </div>
  <WorkSelectModal :work="selectedWork.work" :teams="teams?.teams" @standby-work="standby" />
</template>
