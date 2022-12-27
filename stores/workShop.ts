import { defineStore } from 'pinia';
import { Workshop } from '~~/types/workshop';

export const useWorkshopStore = defineStore('workshop', {
  state: () => ({
    workshop: null as Workshop | null,
    posts: null,
    reactions: null,
    messages: null,
  }),
  getters: {
    getWorkshop: (state) => state.workshop,
    getPosts: (state) => state.posts,
    getReactions: (state) => state.reactions,
    getMessages: (state) => state.messages,
  },
  actions: {
    async fetchWorkshop(workshopId: string) {
      const options = useApiFetchOption();
      await useFetch<Workshop>(`workshops/${workshopId}`, {
        ...options,
      })
        .then((data) => {
          this.workshop = data.data.value;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
