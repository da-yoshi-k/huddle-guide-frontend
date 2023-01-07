<script setup lang="ts">
import { useTeamStore } from '~~/stores/teams';
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification()
const store = useTeamStore();
store.fetchTeams();
definePageMeta({
  requireLogin: true
})
</script>

<template>
  <div>
    <h2 class="py-4 text-3xl text-center text-black font-bold">チーム</h2>
    <div id="team-container" class="mt-4 mx-auto px-4 max-w-3xl">
      <div class="ml-8 mb-8">
        <NuxtLink to="/teams/new" class="btn btn-primary text-yellow-100">
          チームを作成する
        </NuxtLink>
      </div>
      <div id="team-container" class="mb-8">
        <h3 class="leading-tight text-2xl text-black font-bold mb-5">参加中のチーム</h3>
        <TeamCarousel :teams="store.teams?.teams" />
      </div>
    </div>
  </div>
</template>
