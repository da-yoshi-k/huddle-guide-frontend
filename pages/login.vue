<template>
  <div id="login-form" class="flex justify-center">
    <div class="card max-w-md bg-base-100 shadow-md mt-24">
      <div class="card-body">
        <h2 class="py-4 text-xl text-center">ログイン</h2>
        <div>
          <form @submit.prevent="">
            <div calss="form-control w-full max-w-md">
              <label for="email">
                <span class="label-text">メールアドレス</span>
              </label>
              <input id="email" type="text" placeholder="huddle@example.com"
                class="input input-bordered w-full max-w-md mb-5" />
            </div>
            <div calss="form-control w-full max-w-md">
              <label for="email">
                <span class="label-text">パスワード</span>
              </label>
              <input id="password" type="password" placeholder="password"
                class="input input-bordered w-full max-w-md mb-5" />
            </div>
          </form>
        </div>
        <div class="card-actions justify-center">
          <button class="btn btn-primary text-white">ログイン</button>
        </div>
      </div>
    </div>
  </div>
</template>
