import { defineStore } from 'pinia';
import { Teams } from '~/types/teams';

export const useTeamsStore = defineStore('teams', {
  state: () => ({
    teams: null as Teams | null,
  }),
  getters: {
    getTeams: (state) => state.teams,
  },
  actions: {
    async fetchTeams() {
      const options = useApiFetchOption();
      const { data } = await useFetch<Teams>('teams', {
        ...options,
      });
      this.teams = data.value;
      return this.teams;
    },
  },
});
