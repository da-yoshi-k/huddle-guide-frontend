<script setup lang="ts">
import { useTeamStore } from '~~/stores/team';
import { useForm, useField } from 'vee-validate';
import { useAuthUserStore } from '~~/stores/authUser';
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification()
const store = useTeamStore();
const authUserStore = useAuthUserStore();
const route = useRoute();
await store.fetchTeam(route.params.id as string);

const MAX_MEMBER_COUNT = 8;

// チームの情報
const { handleSubmit } = useForm({})
const { value: name } = useField("name", undefined, { initialValue: store.team?.team.name });
const { value: description } = useField("description", undefined, { initialValue: store.team?.team.description });

const isTeamEdit = ref(false)
const handleEdit = (() => {
  isTeamEdit.value = true
})
const editTeamInfo = handleSubmit(async () => {
  const team = {
    team: {
      "name": name.value,
      "description": description.value
    }
  };
  const options = useApiFetchOption();
  await useFetch(`teams/${route.params.id}`, {
    method: 'PATCH',
    body: team,
    ...options,
  }).then(() => {
    store.team!.team.name = name.value
    store.team!.team.description = description.value
    isTeamEdit.value = false
  });
})
const handleCancelEdit = (() => {
  name.value = store.team!.team.name
  description.value = store.team!.team.description
  isTeamEdit.value = false
})
const handleTeamDelete = (async () => {
  const conf = confirm('チームを本当に削除しますか？\n※今までチームで実行したワークの履歴も削除されます');
  if (conf) {
    const options = useApiFetchOption();
    await useFetch(`teams/${route.params.id}`, {
      method: 'DELETE',
      ...options,
    }).then(() => {
      notify({ type: "success", text: 'チームの削除が完了しました。' })
      const router = useRouter();
      router.push('/teams');
    });
  }
})

// メンバーの情報
const adminUserId = computed(() => {
  const adminUser = store.team!.team.members!.find(member => member.role === 'admin')
  return adminUser?.user_id
})
const isMemberEdit = ref(false)

const handleMemberEdit = (() => {
  isMemberEdit.value = true
})
const handleCancelMemberEdit = (() => {
  isMemberEdit.value = false
})
const handleAdminMemberChange = (async (userId: string) => {
  const updateMember = store.team?.team.members?.find(member => member.user_id === userId)
  const memberId = updateMember?.id
  const member = {
    member: {
      "id": memberId,
      "role": "admin"
    }
  };
  const options = useApiFetchOption();
  await useFetch(`teams/${route.params.id}/members/${memberId}`, {
    method: 'PATCH',
    body: member,
    ...options,
  }).then(() => {
    notify({ type: "success", text: 'チームの管理者を変更しました。' })
    store.fetchTeam(route.params.id as string);
    isMemberEdit.value = false
  });
})
const handleMemberDelete = (async (userId: string) => {
  const conf = confirm('選択したユーザーを本当にチームから脱退させますか？');
  if (conf) {
    const deleteMember = store.team?.team.members?.find(member => member.user_id === userId)
    const memberId = deleteMember?.id
    const options = useApiFetchOption();
    await useFetch(`teams/${route.params.id}/members/${memberId}`, {
      method: 'DELETE',
      ...options,
    }).then(() => {
      // チームの管理者の場合、データの不整合が無いように再度データを取得する
      if (authUserStore.authUser?.user.id === adminUserId.value) {
        store.fetchTeam(route.params.id as string);
      }
      notify({ type: "success", text: 'メンバーの脱退が完了しました。' })
      const router = useRouter();
      router.push('/teams');
    });
  }
})

useHead({ title: 'チーム詳細' })
definePageMeta({
  requireLogin: true
});
</script>

<template>
  <div>
    <h2 class="py-4 text-3xl text-center text-black font-bold">チーム</h2>
    <div id="team-container" class="mt-4 mx-auto px-4 max-w-3xl">
      <div class="flex">
        <div class="text-lg font-bold self-center">チームの情報</div>
        <div class="ml-auto">
          <div v-if="isTeamEdit">
            <button class="btn btn-sm btn-outline btn-error mr-4" @click="handleTeamDelete"
              v-if="authUserStore.authUser?.user.id === adminUserId">チームを削除</button>
            <button class="btn btn-sm btn-outline btn-accent mr-4" @click="editTeamInfo">更新</button>
            <button class="btn btn-sm btn-outline btn-ghost" @click="handleCancelEdit">キャンセル</button>
          </div>
          <div v-else>
            <button class="btn btn-sm btn-outline btn-accent" @click="handleEdit">編集</button>
          </div>
        </div>
      </div>
      <div class="ml-4">
        <div class="flex my-4">
          <div class="self-center font-bold w-24 mr-4">チーム名</div>
          <div v-if="isTeamEdit">
            <ValidationField name="チーム名" v-model="name" rules="required|max:20" v-slot="{ errors, handleChange }">
              <input id="name" type="text" :value="name" @change="handleChange" class="input input-bordered w-60 h-8" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationField>
          </div>
          <div v-else>
            {{ store.team?.team.name }}
          </div>
        </div>
        <div class="flex">
          <div class="self-center text-md font-bold w-24 mr-4">チームの説明</div>
          <div v-if="isTeamEdit">
            <ValidationField name="チームの説明" v-model="description" rules="max:400" v-slot="{ errors, handleChange }">
              <textarea id="description" type="textarea" :value="description" @change="handleChange"
                class="textarea textarea-bordered w-60 md:w-96" />
              <span class="text-error mb-5">{{ errors[0] }}</span>
            </ValidationField>
          </div>
          <div v-else>
            <div id="description">{{ store.team?.team.description }}</div>
          </div>
        </div>
      </div>
    </div>
    <div id="member-container" class="mt-4 mx-auto px-4 max-w-3xl">
      <div class="flex">
        <div class="text-lg font-bold self-center">メンバー</div>
        <div class="ml-auto">
          <div v-if="isMemberEdit">
            <button class="btn btn-sm btn-outline btn-ghost" @click="handleCancelMemberEdit">キャンセル</button>
          </div>
          <div v-else>
            <button class="btn btn-sm btn-outline btn-accent" @click="handleMemberEdit">編集</button>
          </div>
        </div>
      </div>
      <div id="member-box" class="flex flex-row place-content-around flex-wrap mt-4">
        <div v-for="member in store.team!.team.users">
          <div class="flex items-center w-80 h-16 mb-4">
            <UserProfileAvatar :user="member" :size=10 />
            <div class="ml-4 flex flex-col justify-center">
              <div class="text-xs text-gray-500" v-if="member.id === adminUserId">チーム管理者</div>
              <div>{{ member.name }}</div>
            </div>
            <div class="flex flex-col flex-wrap w-24 ml-auto">
              <div v-if="isMemberEdit">
                <button class="btn btn-accent btn-outline btn-xs" @click="handleAdminMemberChange(member.id)"
                  v-if="authUserStore.authUser?.user.id === adminUserId && member.id !== adminUserId">管理者に変更</button>
                <button class="btn btn-error btn-outline btn-xs" @click="handleMemberDelete(member.id)"
                  v-if="adminUserId !== member.id && (authUserStore.authUser?.user.id === adminUserId || authUserStore.authUser?.user.id === member.id)">脱退</button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="store.team!.team.users!.length < MAX_MEMBER_COUNT">
          <div class="flex items-center w-80 h-16 mb-4 opacity-50">
            <div class="justify-center w-10 h-10">
              <img :src="'/img/person_add.svg'" />
            </div>
            <div class="ml-4 flex flex-col justify-center">
              <NuxtLink :to="`/teams/${route.params.id}/members/new`">メンバー追加</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#description {
  white-space: pre-wrap;
}

#member-box:after {
  content: "";
  display: block;
  width: 320px;
  height: 0;
}
</style>
