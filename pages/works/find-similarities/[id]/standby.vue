<script setup lang="ts">
import { useWorkshopStore } from '@/stores/workshop';
const store = useWorkshopStore();
const route = useRoute();
await store.fetchWorkshop(route.params.id as string)

definePageMeta({
  requireLogin: true,
  workPage: true,
  layout: "work",
})
</script>

<template>
  <h2 class="py-4 text-3xl text-center font-bold">待機画面</h2>
  <div id="profile-form" class="flex justify-center mb-5">
    <div class="w-11/12 md:max-w-xl">
      <div id="work-info-container" class="flex flex-col mb-8">
        <div class="flex mb-4">
          <div class="font-bold leading-tight text-xl text-black">実施するワーク</div>
          <div class="text-lg text-black pl-4 mr-4">{{ store.workshop?.workshop.work.name }}</div>
        </div>
        <div class="flex mb-8">
          <h2 class="font-bold leading-tight text-xl text-black">チーム名</h2>
          <div class="text-lg text-black pl-4 mr-4">{{ store.workshop?.workshop.team.name }}</div>
        </div>
        <div class="mb-8">
          <h2 class="font-bold leading-tight text-xl text-black mb-4">ワークを行う上での心構え</h2>
          <ul class="list-decimal ml-8">
            <li class="text-black">ワークを盛り上げるため、リアクションを活発に行います。</li>
            <li class="text-black">お互いを尊重しあい、譲り合ってワークに参加します。</li>
            <li class="text-black">ハラスメントに繋がる言動を行っていないか省みつつ発言を行います。</li>
            <li class="text-black">ファシリテーターは発言者の偏りとタイムキープを意識しつつ適宜発言者を交代します。</li>
          </ul>
        </div>
        <div class="flex mb-8">
          <h2 class="font-bold leading-tight text-xl text-black">参加者一覧</h2>
        </div>
        <ParticipationCard :users="store.workshop?.workshop.users!" />
      </div>
    </div>
  </div>
</template>
