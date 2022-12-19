<script setup lang="ts">
import { useAuthUserStore } from '~~/stores/authUser';
const store = useAuthUserStore();
const email = ref('' as string)
const password = ref('' as string)
const user = { email, password }
const login = () => {
  store.loginUser(user);
  const router = useRouter()
  router.push('/home')
}
</script>

<template>
  <div id="login-form" class="flex justify-center">
    <div class="card w-3/4 md:w-96 bg-base-100 shadow-md my-12">
      <div class="card-body mb-7">
        <h2 class="py-4 text-xl text-center font-bold">ログイン</h2>
        <div>
          <form @submit.prevent="">
            <div calss="form-control">
              <label for="email" class="label">
                <span class="label-text">メールアドレス</span>
                <span class="label-text-alt text-error">【必須】</span>
              </label>
              <input id="email" type="text" v-model="email" placeholder="huddle@example.com"
                class="input input-bordered w-full mb-5" />
            </div>
            <div calss="form-control">
              <label for="password" class="label">
                <span class="label-text">パスワード</span>
                <span class="label-text-alt text-error">【必須】</span>
              </label>
              <input id="password" type="password" v-model="password" placeholder="password"
                class="input input-bordered w-full mb-5" />
            </div>
            <div class="mb-4">
              <NuxtLink to="/register" class="link-hover text-info">
                新規登録はこちら
              </NuxtLink>
            </div>
            <div class="mb-4">
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
