<script setup lang="ts">
import { UserInfo } from '~~/types/userInfo';

const searchParam = ref('')
const showSearchResult = ref(false)
const searchResultUser = ref(null as UserInfo | null)

const handleUserSearch = async () => {
  const options = useApiFetchOption();
  const userParam = {
    user: {
      email: searchParam.value
    }
  }
  await useFetch<UserInfo>('users/search', {
    method: "POST",
    body: userParam,
    ...options
  }).then((data) => {
    searchResultUser.value = data.data.value
    showSearchResult.value = true
  })
}

const handleMemberAdd = async () => {
  const userParam = {
    user: {
      id: searchResultUser.value?.user.id
    }
  }
  const options = useApiFetchOption();
  const route = useRoute();
  const router = useRouter();
  await useFetch(`teams/${route.params.id}/members`, {
    method: "POST",
    body: userParam,
    ...options
  }).then(() => {
    router.push('/home')
  })
}

definePageMeta({
  requireLogin: true
})
</script>

<template>
  <div>
    <h2 class="py-4 text-3xl text-center text-black font-bold">メンバー追加</h2>
    <h3 class="text-center text-lg mb-4">追加するメンバーのメールアドレスで検索してください</h3>
    <div class="form-controll flex justify-center mb-8">
      <input type="text" class="input input-bordered w-full max-w-sm mr-4" v-model.lazy="searchParam">
      <button class="btn btn-primary text-yellow-100" @click="handleUserSearch">検索</button>
    </div>
    <div v-show="showSearchResult">
      <template v-if="!!searchResultUser?.user.id">
        <div class="flex flex-row justify-center gap-8">
          <div class="avatar">
            <div class="w-12 rounded-full">
              <template v-if="!!searchResultUser.user.avatar_url">
                <img :src="searchResultUser.user.avatar_url" />
              </template>
              <template v-else>
                <img src="/img/default_account.svg" />
              </template>
            </div>
          </div>
          <div class="text-lg flex items-center">
            {{ searchResultUser.user.name }}
          </div>
          <button class="btn btn-primary text-yellow-100 flex items-center" @click="handleMemberAdd">メンバー追加</button>
        </div>
      </template>
      <template v-else>
        <div class="text-center text-black">ユーザーが見つかりませんでした</div>
      </template>
    </div>
  </div>
</template>
