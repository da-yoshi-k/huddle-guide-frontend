import { defineStore } from 'pinia';
import { TeamInfo } from '~/types/teamInfo';

export const useTeamStore = defineStore('team', {
  state: () => ({
    team: null as TeamInfo | null,
  }),
  getters: {
    getTeam: (state) => state.team,
  },
  actions: {
    async fetchTeam(teamId: string) {
      const options = useApiFetchOption();
      const { data } = await useFetch<TeamInfo>(`teams/${teamId}`, {
        ...options,
      });
      this.team = data.value;
    },
  },
});
