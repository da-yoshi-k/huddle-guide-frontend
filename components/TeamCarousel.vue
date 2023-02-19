<script setup lang="ts">
import TeamMemberCard from './TeamMemberCard.vue';

const props = defineProps<{
  teams?: {
    id: string,
    name: string,
    descriptipn?: string,
    users: {
      id: string,
      name: string,
      avatar_url?: string,
      description?: string
    }[]
  }[]
}>();

const route = useRoute();
</script>

<template>
  <div class="carousel carousel-center md:w-[calc(100vw-276px)] md:max-w-2xl py-4 px-4 space-x-4 bg-white rounded-box">
    <template v-if="teams?.length !== 0">
      <div v-for="team in props.teams">
        <TeamMemberCard :team="team" />
      </div>
    </template>
    <template v-else>
      <div class="flex flex-row gap-12">
        <div class="text-black flex items-center">
          ワークに参加するにはチームに所属している必要があります
        </div>
        <div v-if="route.path !== '/teams'">
          <NuxtLink to="/teams/new" class="btn btn-primary text-yellow-100">チームを作成する</NuxtLink>
        </div>
      </div>
    </template>
</div>
</template>
