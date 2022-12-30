import { defineStore } from 'pinia';
import { Teams } from '~/types/teams';

export const useTeamStore = defineStore('team', {
  state: () => ({
    teams: null as Teams | null,
  }),
  getters: {
    getTeams: (state) => state.teams,
  },
  actions: {
    // 自分の所属するチーム情報を取得
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
