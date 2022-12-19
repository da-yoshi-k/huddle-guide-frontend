import { defineStore } from 'pinia';
import { Token } from '~/types/token';
import { UserInfo } from '~/types/userInfo';

const options = useApiFetchOption();
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
      let { data } = await useFetch<Token>('authentication', {
        method: 'POST',
        body: userForm,
        ...options,
      });
      localStorage.auth_token = data.value?.token;
      const getMyUserData = async (): Promise<UserInfo | null> => {
        const { data } = useFetch<UserInfo>('users/me', {
          ...options,
        });
        return data.value;
      };
      await getMyUserData().then((data) => {
        this.authUser = data;
      });
    },
  },
});
