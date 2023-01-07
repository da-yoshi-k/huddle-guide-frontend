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
</script>

<template>
  <div class="carousel carousel-center md:w-[calc(100vw-276px)] md:max-w-2xl pt-4 space-x-4 bg-white rounded-box">
    <template v-if="teams?.length !== 0">
      <div v-for="team in props.teams">
        <TeamMemberCard :team="team" />
      </div>
    </template>
    <template v-else>
      <div class="text-gray-700">参加中のチームがありません</div>
    </template>
  </div>
</template>
