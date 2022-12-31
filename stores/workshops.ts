import { defineStore } from 'pinia';
import { Workshops } from '~/types/workshops';

export const useWorkshopsStore = defineStore('workshops', {
  state: () => ({
    workshops: null as Workshops | null,
  }),
  getters: {
    getWorkshops: (state) => state.workshops,
  },
  actions: {
    async fetchWorkshops() {
      const options = useApiFetchOption();
      const { data } = await useFetch<Workshops>('workshops', {
        ...options,
      });
      this.workshops = data.value;
    },
  },
});
