<script setup lang="ts">
import { useForm, useField } from 'vee-validate';

const { handleSubmit } = useForm({})
const { value: name } = useField("name");
const { value: description } = useField("description", undefined, { initialValue: '' });

const create = handleSubmit(async () => {
  const team = {
    team: {
      "name": name.value,
      "description": description.value
    }
  };
  const options = useApiFetchOption();
  let { data } = await useFetch('teams', {
    method: 'POST',
    body: team,
    ...options,
  });
  const router = useRouter();
  router.push('/teams');
})

definePageMeta({
  requireLogin: true
})
</script>

<template>
  <div>
    <h2 class="py-4 text-3xl text-center font-bold">新規チーム作成</h2>
    <div id="profile-form" class="flex justify-center mb-5">
      <div class="w-3/4 md:w-96">
        <form @submit.prevent="create">
          <div class="form-control">
            <label for="name" class="label">
              <span class="label-text">チーム名</span>
              <span class="label-text-alt text-error">【必須】</span>
            </label>
            <ValidationField name="チーム名" v-model="name" rules="required|max:20" v-slot="{ errors, handleChange }">
              <input id="name" type="text" :value="name" @change="handleChange" class="input input-bordered w-full" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationField>
          </div>
          <div class="form-control">
            <label for="name" class="label">
              <span class="label-text">チームの説明（400字まで）</span>
            </label>
            <ValidationField name="チームの説明" v-model="description" rules="max:400" v-slot="{ errors, handleChange }">
              <textarea id="description" type="textarea" :value="description" @change="handleChange"
                class="textarea textarea-bordered w-full" />
              <span class="text-error mb-5">{{ errors[0] }}</span>
            </ValidationField>
          </div>
          <div class="flex justify-center">
            <button class="btn btn-primary text-white" @click="create">作成</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>
