<template>
  <div class="text-center">
    <div class="top-container pt-10 grid grid-cols-1 md:grid-cols-2">
      <div class="flex justify-center md:justify-end md:mr-4">
        <img class="object-contain" src="/img/top_banner.png" alt="huddle-guide brand banner">
      </div>
      <div class="flex justify-center row-span-3 md:justify-start md:ml-4">
        <img class="object-contain" src="/img/top_discussion.png" alt="discussion image">
      </div>
      <div class="flex justify-center md:justify-end md:mr-16">
        <p class="pt-6 text-3xl">オンラインでもチーム内で<br>コミュニケーションが<br>取れていますか？</p>
      </div>
      <div class="my-6 flex justify-center md:justify-end md:mr-16">
        <NuxtLink to="/register" class="btn btn-active brn-primary shadow text-sm md:text-lg text-base-100 mr-12">
          使ってみる
        </NuxtLink>
        <NuxtLink to="/login" class="btn brn-neutral shadow text-sm md:text-lg text-base-100 ml-12">
          ログイン
        </NuxtLink>
      </div>
    </div>
    <div class="pt-24 text-3xl font-bold">使い方</div>
    <div class="hero bg-base-100">
      <div>
        <div class="my-8 hero-content flex-col md:flex-row">
          <img src="/img/top_signup.png" class="object-contain" />
          <div>
            <h1 class="text-2xl font-bold">1. まずはユーザー登録</h1>
            <p class="py-6 text-xl">チームを作成するユーザーは新規登録を行います</p>
          </div>
        </div>
        <div class="my-8 hero-content flex-col md:flex-row-reverse">
          <img src="/img/top_team_spirit.png" class="object-contain" />
          <div>
            <h1 class="text-2xl font-bold">2. チームを作成</h1>
            <p class="py-6 text-xl">ワークを一緒に行うチームを作成してメンバーを招待します</p>
          </div>
        </div>
        <div class="my-8 hero-content flex-col md:flex-row">
          <img src="/img/top_group_chat.png" class="object-contain" />
          <div>
            <h1 class="text-2xl font-bold">3. 簡単なワークを実施</h1>
            <p class="py-6 text-xl">10〜30分程度のワークを行います。<br>この際、別途ビデオ通話ツールなどを併用しても構いません。</p>
          </div>
        </div>
        <div class="my-8 hero-content flex-col md:flex-row-reverse">
          <img src="/img/top_group.png" class="object-contain" />
          <div>
            <h1 class="text-2xl font-bold">4. ワークの結果をふりかえる</h1>
            <p class="py-6 text-xl">ワーク後、SNSにシェアしたり<br>1on1の機会に繋げます</p>
          </div>
        </div>
      </div>
    </div>
    <div class="my-6 flex justify-center">
      <NuxtLink to="/register" class="btn btn-active brn-primary shadow text-sm md:text-lg text-base-100 mr-12">
        使ってみる
      </NuxtLink>
      <NuxtLink to="/login" class="btn brn-neutral shadow text-sm md:text-lg text-base-100 ml-12">
        ログイン
      </NuxtLink>
    </div>
    <a href="https://storyset.com/research">Illustration by Storyset</a>
  </div>
</template>

<script></script>

<style>

</style>
