<script setup lang="ts">
import { UserInfo } from '~~/types/userInfo';
import { useTeamStore } from '~~/stores/team';
import { useNotification } from '@kyvg/vue3-notification';
const { notify } = useNotification();

const store = useTeamStore();
const route = useRoute();
const router = useRouter();
await store.fetchTeam(route.params.id as string);

const searchParam = ref('')
const showSearchResult = ref(false)
const searchResultUser = ref(null as UserInfo | null)

const isAdded = computed(() => {
  return !!store.team?.team.users?.find(user => user.id === searchResultUser.value?.user.id)
})

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
  const { data, error } = await useFetch(`teams/${route.params.id}/members`, {
    method: "POST",
    body: userParam,
    ...options
  })
  if (error.value) {
    notify({ type: 'error', text: error.value.data.errors[0] })
    router.push('/home')
  } else {
    notify({ type: 'success', text: 'メンバーを追加しました。' })
    router.push('/home')
  }
}

useHead({ title: 'メンバー追加' })
definePageMeta({
  requireLogin: true
})
</script>

<template>
  <div>
    <h2 class="py-4 text-3xl text-center text-black font-bold mb-2">メンバー追加</h2>
    <div class="flex justify-center mb-6">
      <h3 class="font-bold leading-tight text-xl text-black">追加対象のチーム： </h3>
      <div class="text-lg text-black pl-4 mr-4">{{ store.team?.team.name }}</div>
    </div>
    <h3 class="text-center text-lg mb-4">追加するメンバーをメールアドレスで検索してください</h3>
    <div class="form-controll flex justify-center mb-8">
      <input type="text" class="input input-bordered w-full max-w-sm mr-4" v-model="searchParam"
        @keypress.enter="handleUserSearch">
      <button class="btn btn-primary text-yellow-100" @click="handleUserSearch">検索</button>
    </div>
    <div v-show="showSearchResult">
      <template v-if="!!searchResultUser?.user.id">
        <div class="flex flex-row justify-center gap-8">
          <div class="avatar">
            <div class="w-12 rounded-full">
              <img
                :src="searchResultUser.user.avatar_url ? searchResultUser.user.avatar_url : '/img/default_account.svg'" />
            </div>
          </div>
          <div class="text-lg flex items-center">
            {{ searchResultUser.user.name }}
          </div>
          <template v-if="isAdded">
            <button class="btn btn-primary flex items-center btn-disabled">追加済み</button>
          </template>
          <template v-else>
            <button class="btn btn-primary text-yellow-100 flex items-center" @click="handleMemberAdd">メンバー追加</button>
          </template>
        </div>
      </template>
      <template v-else>
        <div class="text-center text-black">ユーザーが見つかりませんでした</div>
      </template>
    </div>
  </div>
</template>
