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
      const { data, error } = await useFetch<Teams>('teams', {
        ...options,
      });
      if (data.value) {
        this.teams = data.value;
        return this.teams;
      } else {
        if (error.value?.statusCode === 401) {
          const router = useRouter();
          router.push('/login');
        }
      }
    },
  },
});
