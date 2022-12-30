import { defineStore } from 'pinia';
import { Token } from '~/types/token';
import { UserInfo } from '~/types/userInfo';

export const useAuthUserStore = defineStore('authUser', {
  state: () => ({
    authUser: null as UserInfo | null,
  }),
  getters: {
    getAuthUser: (state) => state.authUser,
  },
  actions: {
    async loginUser(userForm: any) {
      // ログイン
      const options = useApiFetchOption();
      await useFetch<Token>('authentication', {
        method: 'POST',
        body: userForm,
        ...options,
      }).then((data) => {
        localStorage.auth_token = data.data.value?.token;
      });
      await this.fetchAuthUser();
    },
    // 自分のユーザー情報を取得
    async fetchAuthUser() {
      if (!localStorage.auth_token) return null;
      if (this.authUser) return this.authUser;

      const options = useApiFetchOption();
      const { data } = await useFetch<UserInfo>('users/me', {
        ...options,
      });
      this.authUser = data.value;
      return data.value;
    },
    async updateUser(formData: any) {
      const options = useApiFetchOption();
      await useFetch<UserInfo>(`profile/${this.authUser?.user.id}`, {
        method: 'PATCH',
        body: formData,
        ...options,
      });
      await this.fetchAuthUser();
    },
  },
});
