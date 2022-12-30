import { defineStore } from 'pinia';
import { Workshop } from '~~/types/workshop';
import { Posts } from '~~/types/posts';

export const useWorkshopStore = defineStore('workshop', {
  state: () => ({
    workshop: null as Workshop | null,
    posts: null as Posts | null,
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
    async nextPresenter() {
      const prev = this.workshop!.workshop.presenter;
      if (prev === null || prev === undefined) {
        this.workshop!.workshop.presenter = this.workshop!.workshop.users[0].id;
      } else {
        const prevIndex = this.workshop!.workshop.users.findIndex(
          (user) => user.id === prev
        );
        if (prevIndex === this.workshop!.workshop.users.length - 1) {
          this.workshop!.workshop.presenter = null;
        } else {
          this.workshop!.workshop.presenter =
            this.workshop!.workshop.users[prevIndex + 1].id;
        }
      }
    },
    async fetchPosts(workshopId: string) {
      const options = useApiFetchOption();
      await useFetch<Posts>('posts', {
        query: { workshop: workshopId },
        ...options,
      })
        .then((data) => {
          if (!!data.data.value) this.posts = data.data.value;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async createPosts(posts: any) {
      const options = useApiFetchOption();
      await useFetch<Posts>('posts', {
        method: 'POST',
        body: posts,
        ...options,
      })
        .then((data) => {
          this.posts = data.data.value;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // async editPosts(posts: any) {
    //   const options = useApiFetchOption();
    //   posts.forEach(async (post: any) => {
    //     await useFetch<Posts>(`posts/${post.id}`, {
    //       method: 'PATCH',
    //       body: post,
    //       ...options,
    //     }).catch((error) => {
    //       console.log(error);
    //     });
    //   });
    // },
    async updateWorkStep(stepNum: number) {
      const options = useApiFetchOption();
      const bodyParam = {
        workshop: {
          work_step_id: stepNum,
        },
      };
      await useFetch(`workshops/${this.workshop?.workshop.id}`, {
        method: 'PATCH',
        body: bodyParam,
        ...options,
      });
      this.workshop!.workshop.work_step_id = stepNum;
    },
  },
});
