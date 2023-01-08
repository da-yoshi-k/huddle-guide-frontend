<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { useAuthUserStore } from '~~/stores/authUser';
import { useNotification } from '@kyvg/vue3-notification';
const { notify } = useNotification();
const store = useAuthUserStore();
const { handleSubmit } = useForm({})
const { value: email } = useField("email");
const { value: password } = useField("password");

const login = handleSubmit(async () => {
  const user = {
    "email": email.value,
    "password": password.value
  }
  await store.loginUser(user).then(() => {
    const router = useRouter()
    router.push('/home')
    notify({ type: 'success', text: 'ログインに成功しました。' })
  }).catch(() => {
    notify({
      type: 'error',
      text: 'ユーザIDもしくはパスワードが違います。',
    });
  });
});

definePageMeta({
  layout: "static",
});
</script>

<template>
  <div id="login-form" class="flex justify-center">
    <div class="card w-3/4 md:w-96 bg-base-100 shadow-md my-12">
      <div class="card-body mb-7">
        <h2 class="py-4 text-xl text-center text-black font-bold">ログイン</h2>
        <div>
          <form @submit.prevent="login">
            <div class="form-control">
              <label for="email" class="label">
                <span class="label-text">メールアドレス</span>
                <span class="label-text-alt text-error">【必須】</span>
              </label>
              <ValidationField name="メールアドレス" v-model="email" rules="required|email" v-slot="{ errors, handleChange }">
                <input id="email" type="text" @change="handleChange" placeholder="huddle@example.com"
                  class="input input-bordered w-full" />
                <span class="text-error mt-2">{{ errors[0] }}</span>
              </ValidationField>
            </div>
            <div class="form-control">
              <label for="password" class="label">
                <span class="label-text">パスワード</span>
                <span class="label-text-alt text-error">【必須】</span>
              </label>
              <ValidationField name="パスワード" v-model="password" rules="required" v-slot="{ errors, handleChange }">
                <input id="password" type="password" @change="handleChange" placeholder="password"
                  class="input input-bordered w-full" />
                <span class="text-error my-2">{{ errors[0] }}</span>
              </ValidationField>
            </div>
            <div class="my-4">
              <NuxtLink to="/register" class="link-hover text-info">
                新規登録はこちら
              </NuxtLink>
            </div>
            <div class="mb-4 tooltip" data-tip="開発中">
              <NuxtLink to="#" class="link-hover text-info">
                パスワードを忘れた
              </NuxtLink>
            </div>
          </form>
        </div>
        <div class="card-actions justify-center">
          <button class="btn btn-primary text-white" @click="login">ログイン</button>
        </div>
      </div>
    </div>
  </div>
</template>
