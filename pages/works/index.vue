<script setup lang="ts">
import { useTeamStore } from '~~/stores/teams';
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
const teamStore = useTeamStore();
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
    navigateTo(`/works/find-similarities/${workshopId}/standby`)
  })
})

definePageMeta({
  requireLogin: true
})
</script>

<template>
  <div id="work">
    <h2 class="py-4 text-3xl text-center text-black font-bold">ワーク</h2>
    <div id="ongoing-work-container" class="mt-4 mx-auto px-4 max-w-3xl">
      <div id="work-container" class="flex flex-col mb-8">
        <h2 class="font-bold leading-tight text-2xl text-black mb-4">参加可能なワーク（開発中）</h2>
        <div class="flex">
          <div class="self-center text-lg text-black pl-4 mr-4">現在参加可能なワークはありません</div>
        </div>
      </div>
      <h2 class="font-bold leading-tight text-2xl text-black mb-4">ワーク一覧</h2>
      <div id="works-container" class="flex flex-col items-center md:flex-row md:justify-around mb-8">
        <div class="card w-80 bg-gray-200 shadow-xl mb-8">
          <figure><img src="/img/works_news.svg" alt="Good&new" class="w-[200px] mt-4" /></figure>
          <div class="card-body">
            <h2 class="card-title">Good & New (開発中)</h2>
            <p>日々の中であった良かったことや<br />新しいニュースを共有しましょう</p>
            <div class="card-actions justify-around">
              <div class="tooltip" data-tip="開発中">
                <button class="btn btn-primary text-yellow-100">開始する</button>
              </div>
              <div class="tooltip" data-tip="開発中">
                <button class="btn btn-neutral text-yellow-100">使い方</button>
              </div>
            </div>
          </div>
        </div>
        <div class="card w-80 bg-base-100 shadow-xl mb-8">
          <figure><img src="/img/works_discussion.svg" alt="共通点探し" class="w-[200px] mt-4" /></figure>
          <div class="card-body">
            <h2 class="card-title">共通点探し</h2>
            <p>チームの仲間との共通点を探してみませんか？</p>
            <div class="card-actions justify-around">
              <div @click="handleShowSelectModal(1, '共通点探し')">
                <label for="work-select-modal" class="btn btn-primary text-yellow-100">開始する</label>
              </div>
              <div class="tooltip" data-tip="開発中">
                <button class="btn btn-neutral text-yellow-100">使い方</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 class="font-bold leading-tight text-2xl text-black mb-4">ワーク参加履歴(開発中)</h2>
      <div class="ml-4 mb-10">
        <div>2022/12/03 Good&New</div>
        <div>2022/12/02 Good&New</div>
        <div>2022/12/01 共通点探し</div>
      </div>
    </div>
    <div class="text-right">
      <a href="https://storyset.com/research" class="link-hover text-info text-xs">Illustration by Storyset</a>
    </div>
  </div>
  <div v-if="teams?.teams != null">
    <WorkSelectModal :work="selectedWork.work" :teams="teams?.teams" @standby-work="standby" />
  </div>
</template>
