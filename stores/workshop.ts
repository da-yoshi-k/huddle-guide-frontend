import { defineStore } from 'pinia';
import { Workshop } from '~~/types/workshop';
import { Posts } from '~~/types/posts';
import { Messages } from '~~/types/messages';
import { Message } from '~~/types/message';
import { User } from '~~/types/user';

export const useWorkshopStore = defineStore('workshop', {
  state: () => ({
    workshop: null as Workshop | null,
    posts: null as Posts | null,
    reactions: null,
    messages: null as Messages | null,
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
      let nextPresenter: string;
      if (!prev) {
        nextPresenter = this.workshop!.workshop.users[0].id;
      } else {
        const prevIndex = this.workshop!.workshop.users.findIndex(
          (user) => user.id === prev
        );
        if (prevIndex === this.workshop!.workshop.users.length - 1) {
          nextPresenter = '';
        } else {
          nextPresenter = this.workshop!.workshop.users[prevIndex + 1].id;
        }
      }
      this.workshop!.workshop.presenter = nextPresenter;
      const options = useApiFetchOption();
      const param = {
        workshop: {
          presenter: nextPresenter,
        },
      };
      await useFetch(`workshops/${this.workshop!.workshop.id}`, {
        method: 'PATCH',
        body: param,
        ...options,
      });
    },
    async fetchPosts() {
      const options = useApiFetchOption();
      await useFetch<Posts>(`workshops/${this.workshop!.workshop.id}/posts`, {
        ...options,
      })
        .then((data) => {
          if (!!data.data.value) {
            this.posts = data.data.value;
            this.findSamePosts();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    findSamePosts() {
      this.posts?.posts.forEach((post) => {
        const users: User[] = [];
        const samePosts = this.posts?.posts.filter(
          (item) =>
            post.user_id !== item.user_id && post.content === item.content
        );
        samePosts?.forEach((pst) => {
          const user = this.workshop!.workshop.users.find(
            (user) => user.id === pst.user_id
          );
          if (user != null) {
            users.push(user);
          }
        });
        post.sameUsers = users;
      });
    },
    async editPosts(posts: Posts) {
      const options = useApiFetchOption();
      for (const post of posts.posts) {
        if (post.id === 0) {
          await useFetch<Posts>(
            `workshops/${this.workshop!.workshop.id}/posts`,
            {
              method: 'POST',
              body: { post: post },
              ...options,
            }
          );
        } else if (post.content != null) {
          await useFetch(
            `workshops/${this.workshop!.workshop.id}/posts/${post.id}`,
            {
              method: 'PATCH',
              body: { post: post },
              ...options,
            }
          );
        }
      }
      const message = 'finish';
      return message;
    },
    async deletePost(postId: number) {
      const options = useApiFetchOption();
      await useFetch(
        `workshops/${this.workshop!.workshop.id}/posts/${postId}`,
        {
          method: 'DELETE',
          ...options,
        }
      );
      this.fetchPosts();
    },
    async updateWorkStep(stepNum: number) {
      const options = useApiFetchOption();
      const bodyParam = {
        workshop: {
          work_step_id: stepNum,
        },
      };
      await useFetch(`workshops/${this.workshop!.workshop.id}`, {
        method: 'PATCH',
        body: bodyParam,
        ...options,
      });
      this.workshop!.workshop.work_step_id = stepNum;
    },
    async fetchMessages() {
      const options = useApiFetchOption();
      await useFetch<Messages>(
        `workshops/${this.workshop!.workshop.id}/messages`,
        { ...options }
      )
        .then((data) => {
          this.messages = data.data.value;
          return this.messages;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async createMessage(message: Message) {
      const options = useApiFetchOption();
      await useFetch(`workshops/${this.workshop!.workshop.id}/messages`, {
        method: 'POST',
        body: message,
        ...options,
      }).then(() => {
        return;
      });
    },
  },
});
