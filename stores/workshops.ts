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
      const { data, error } = await useFetch<Workshops>('workshops', {
        ...options,
      });
      if (data.value) {
        this.workshops = data.value;
      } else {
        if (error.value?.statusCode === 401) {
          const router = useRouter();
          router.push('/login');
        }
      }
    },
  },
});
