<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { useAuthUserStore } from '~~/stores/authUser';
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification()
const store = useAuthUserStore();
const { handleSubmit } = useForm({})
const { value: email } = useField("email");
const { value: name } = useField("name");
const { value: password } = useField("password");
const { value: password_confirmataion } = useField("password_confirmataion");

const register = handleSubmit(async () => {
  const user = {
    user: {
      "name": name.value,
      "email": email.value,
      "password": password.value
    }
  };
  const options = useApiFetchOption();
  const { data, error } = await useFetch('users', {
    method: 'POST',
    body: user,
    ...options,
  })
  if (data.value) {
    const router = useRouter();
    router.push('/login');
    notify({ type: "success", text: "ユーザー登録が完了しました" });
  } else {
    notify({ type: "error", text: error.value?.response?._data.errors[0] })
  }
});

const handleGoogleLogin = async (response: any) => {
  await store.loginUserWithGoogle(response).then(() => {
    const router = useRouter()
    router.push('/home')
    notify({ type: 'success', text: 'ログインしました。' })
  }).catch(() => {
    notify({
      type: 'error',
      text: '認証に失敗しました。',
    });
  });
}

useHead(
  { title: '新規登録' },
)
definePageMeta({
  noLoginAccess: true,
  layout: "static",
});
</script>

<template>
  <div id="login-form" class="flex justify-center bg-green-100">
    <div class="card w-3/4 md:w-96 bg-base-100 shadow-md my-8">
      <div class="card-body">
        <h2 class="py-4 text-xl text-center text-black font-bold">新規登録</h2>
        <div>
          <form @submit.prevent="register">
            <div class="form-control">
              <label for="email" class="label">
                <span class="label-text">メールアドレス</span>
                <span class="label-text-alt text-error">【必須】</span>
              </label>
              <ValidationField name="メールアドレス" v-model="email" rules="required|email" v-slot="{ errors, handleChange }">
                <input id="email" type="text" @change="handleChange" placeholder="huddle@example.com"
                  class="input input-bordered w-full" />
                <span class="text-error my-2">{{ errors[0] }}</span>
              </ValidationField>
            </div>
            <div class="form-control">
              <label for="name" class="label">
                <span class="label-text">ニックネーム（表示名）</span>
                <span class="label-text-alt text-error">【必須】</span>
              </label>
              <ValidationField name="ニックネーム" v-model="name" rules="required|max:20" v-slot="{ errors, handleChange }">
                <input id="name" type="text" @change="handleChange" placeholder="ハドルタロウ"
                  class="input input-bordered w-full" />
                <span class="text-error my-2">{{ errors[0] }}</span>
              </ValidationField>
            </div>
            <div class="form-control">
              <label for="password" class="label">
                <span class="label-text">パスワード</span>
                <span class="label-text-alt text-error">【必須】</span>
              </label>
              <ValidationField name="パスワード" v-model="password" rules="required|min:8" v-slot="{ errors, handleChange }">
                <input id="password" type="password" @change="handleChange" placeholder="password"
                  class="input input-bordered w-full" />
                <span class="text-error my-2">{{ errors[0] }}</span>
              </ValidationField>
            </div>
            <div class="form-control">
              <label for="password_confirmation" class="label">
                <span class="label-text">パスワード（確認用）</span>
                <span class="label-text-alt text-error">【必須】</span>
              </label>
              <ValidationField name="パスワード（確認用）" v-model="password_confirmataion" rules="required|confirmed:@パスワード"
                v-slot="{ errors, handleChange }">
                <input id="password_confirmation" type="password" @change="handleChange" placeholder="password"
                  class="input input-bordered w-full" />
                <span class="text-error my-2">{{ errors[0] }}</span>
              </ValidationField>
            </div>
          </form>
        </div>
        <div class="mb-2">
          <NuxtLink to="/login" class="link-hover text-info">
            ログインはこちら
          </NuxtLink>
        </div>
        <div>
          <p class="my-2 text-xs">ユーザーが本サービスへの登録申込をしたことをもって<br />
            <NuxtLink to="/terms" class="link-hover text-info">利用規約</NuxtLink>
            および
            <NuxtLink to="/policy" class="link-hover text-info">プライバシーポリシー</NuxtLink>
            のすべての条項に同意したものとみなします。
          </p>
        </div>
        <div class="card-actions justify-center">
          <button class="btn btn-primary text-white" @click="register">登録</button>
        </div>
        <div class="divider">または</div>
        <div class="flex justify-center">
          <GoogleLogin :callback="handleGoogleLogin" />
        </div>
      </div>
    </div>
  </div>
</template>
