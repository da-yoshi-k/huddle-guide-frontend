<script setup lang="ts">
import { useTeamStore } from '~~/stores/team';
import { useForm, useField } from 'vee-validate';
const store = useTeamStore();
const route = useRoute();
await store.fetchTeam(route.params.id as string);

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

// メンバーの情報
const adminUserId = computed(() => {
  const adminUser = store.team!.team.members!.find(member => member.role === 'admin')
  return adminUser?.user_id
})

const isMemberEdit = ref(false)

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
            <button class="btn btn-outline btn-accent mr-4" @click="editTeamInfo">更新</button>
            <button class="btn btn-outline btn-ghost" @click="handleCancelEdit">キャンセル</button>
          </div>
          <div v-else>
            <button class="btn btn-outline btn-accent" @click="handleEdit">編集</button>
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
      <div class="text-lg font-bold self-center mb-4">メンバー</div>
      <div class="flex">
        <div v-for="member in store.team!.team.users">
          <div class="w-96 flex">
            <div class="avatar justify-center w-10">
              <div class="rounded-full">
                <img :src="member.avatar_url ? member.avatar_url : '/img/default_account.svg'" />
              </div>
            </div>
            <div class="ml-4">
              <div class="text-xs text-gray-500" v-show="member.id === adminUserId">チーム管理者</div>
              <div>{{ member.name }}</div>
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
</style>
