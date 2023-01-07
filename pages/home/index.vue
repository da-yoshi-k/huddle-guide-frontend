<script setup lang="ts">
import { useTeamStore } from '~~/stores/teams';
import { useWorkshopsStore } from '~~/stores/workshops';

const workshopsStore = useWorkshopsStore();
const teamStore = useTeamStore();
await workshopsStore.fetchWorkshops();
await teamStore.fetchTeams();
definePageMeta({
  requireLogin: true
})
</script>

<template>
  <div id="home">
    <h2 class="py-4 text-3xl text-center text-black font-bold">ホーム</h2>
    <div id="home-container" class="mt-4 mx-auto px-4 max-w-3xl">
      <WorkshopOngoingList :workshops="workshopsStore.workshops?.workshops" />
      <div id="team-container" class="mb-8">
        <h3 class="leading-tight text-2xl text-black font-bold">参加中のチーム</h3>
        <TeamCarousel :teams="teamStore.teams?.teams" />
      </div>
    </div>
  </div>
</template>

