<template>
  <div id="login-form" class="flex justify-center bg-green-100">
    <div class="card w-3/4 md:w-96 bg-base-100 shadow-md my-12">
      <div class="card-body">
        <h2 class="py-4 text-xl text-center font-bold">新規登録</h2>
        <div>
          <form @submit.prevent="">
            <div calss="form-control">
              <label for="email" class="label">
                <span class="label-text">メールアドレス</span>
                <span class="label-text-alt text-error">【必須】</span>
              </label>
              <input id="email" type="text" placeholder="huddle@example.com" class="input input-bordered w-full mb-5" />
            </div>
            <div calss="form-control">
              <label for="name" class="label">
                <span class="label-text">ニックネーム（表示名）</span>
                <span class="label-text-alt text-error">【必須】</span>
              </label>
              <input id="name" type="text" placeholder="ハドルタロウ" class="input input-bordered w-full mb-5" />
            </div>
            <div calss="form-control">
              <label for="password" class="label">
                <span class="label-text">パスワード</span>
                <span class="label-text-alt text-error">【必須】</span>
              </label>
              <input id="password" type="password" placeholder="password" class="input input-bordered w-full mb-5" />
            </div>
            <div calss="form-control">
              <label for="password_confirmation" class="label">
                <span class="label-text">パスワード（確認用）</span>
                <span class="label-text-alt text-error">【必須】</span>
              </label>
              <input id="password_confirmation" type="password" placeholder="password"
                class="input input-bordered w-full mb-5" />
            </div>
          </form>
        </div>
        <div class="mb-4">
          <NuxtLink to="/login" class="link-hover text-info">
            ログインはこちら
          </NuxtLink>
        </div>
        <div class="card-actions justify-center">
          <button class="btn btn-primary text-white">登録</button>
        </div>
      </div>
    </div>
  </div>
</template>
