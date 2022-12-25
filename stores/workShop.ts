import { defineStore } from 'pinia';

export const useWorkShopStore = defineStore('workshop', {
  state: () => ({
    work: null,
    workStep: null,
    participants: null,
    facilitator: null,
    presenter: null,
    posts: null,
    reactions: null,
    messages: null,
  }),
  getters: {},
  actions: {},
});
