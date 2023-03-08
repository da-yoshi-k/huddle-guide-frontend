<script setup lang="ts">
import { useAuthUserStore } from '~~/stores/authUser';
import { useForm, useField } from 'vee-validate';
import { useNotification } from '@kyvg/vue3-notification';
import { LoginType } from '~~/types/loginType';
const { notify } = useNotification();
const store = useAuthUserStore();

// ログアウト後の戻るボタンへの対処
if (!store.authUser) {
  const router = useRouter();
  router.push('/login');
}

const { handleSubmit } = useForm({})
const { value: name } = useField("name", undefined, { initialValue: store.authUser?.user.name });
const { value: description } = useField("description", undefined, { initialValue: store.authUser?.user.description });
const avatarFile = ref<File | null>();

const handleAvatarFile = async ($event: Event) => {
  const target = $event.target as HTMLInputElement
  if (target && target.files) {
    avatarFile.value = target.files[0]
  }
}

const edit = handleSubmit(async () => {
  const formData = new FormData();
  formData.append("user[name]", name.value);
  if (description.value) {
    formData.append("user[description]", description.value);
  }
  if (avatarFile !== null) {
    formData.append("user[avatar]", avatarFile.value as Blob);
  }
  try {
    notify({ type: "success", text: 'プロフィールを変更しました。' })
    await store.updateUser(formData);
    location.reload()
  } catch (error) {
    console.log(error);
  }
})

useHead({ title: 'プロフィール' })
definePageMeta({
  requireLogin: true
})
</script>

<template>
  <div>
    <h2 class="py-4 text-3xl text-center text-black font-bold">プロフィール</h2>
    <h3 class="py-4 text-xl text-center text-black font-bold">アカウント情報</h3>
    <div id="account-info" class="mb-12">
      <div class="flex justify-center overflow-x-auto pt-4">
        <table class="table text-center text-sm w-3/4 ">
          <tbody>
            <tr>
              <td class="text-xs">メールアドレス</td>
              <td>{{ store.authUser?.user.email }}</td>
              <td>
              </td>
            </tr>
            <template v-if="store.authUser?.user.login_type === LoginType.Default">
              <tr>
                <td>パスワード</td>
                <td>************</td>
                <td>
                  <div class="tooltip" data-tip="開発中">
                    <button class="btn btn-outline btn-disabled">変更</button>
                  </div>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td>アカウント種別</td>
                <td>Googleアカウント</td>
                <td>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <h3 class="py-4 text-xl text-center text-black font-bold">プロフィール情報</h3>
    <div id="profile-form" class="flex justify-center mb-5">
      <div class="w-3/4 md:w-96">
        <form @submit.prevent="edit">
          <div class="form-control">
            <label for="name" class="label">
              <span class="label-text">ニックネーム（表示名）</span>
              <span class="label-text-alt text-error">【必須】</span>
            </label>
            <ValidationField name="ニックネーム" v-model="name" rules="required|max:20" v-slot="{ errors, handleChange }">
              <input id="name" type="text" :value="name" @change="handleChange" class="input input-bordered w-full" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationField>
          </div>
          <div class="form-control">
            <label for="description" class="label">
              <span class="label-text">自己紹介（400字まで）</span>
            </label>
            <ValidationField name="自己紹介" v-model="description" rules="max:400" v-slot="{ errors, handleChange }">
              <textarea id="description" type="textarea" :value="description" @change="handleChange"
                class="textarea textarea-bordered w-full" />
              <span class="text-error mb-5">{{ errors[0] }}</span>
            </ValidationField>
          </div>
          <div class="form-control">
            <label for="avatar" class="label">
              <span class="label-text">プロフィール画像</span>
            </label>
            <ValidationField name="プロフィール画像" v-model="avatarFile" rules="image" v-slot="{ errors, handleChange }">
              <input id="avatar" type="file" @change="handleAvatarFile" class="file-input file-input-bordered" />
              <span class="text-error mb-5">{{ errors[0] }}</span>
            </ValidationField>
          </div>
          <div class="flex justify-center">
            <button class="btn btn-primary text-white" @click="edit">更新</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
