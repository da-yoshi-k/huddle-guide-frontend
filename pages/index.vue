<script setup lang="ts">
definePageMeta({
  noLoginAccess: true,
  layout: "static",
});
</script>

<template>
  <div class="text-center">
    <div id="top-container" class="flex justify-center items-center h-[85vh] md:h-[650px]">
      <div class="top-container pt-5 grid grid-cols-1 md:grid-cols-2 md:max-h-[600px]">
        <div class="flex justify-center md:justify-end md:mr-4">
          <img class="w-3/5 my-8 md:mb-4 md:w-full max-w-[420px] object-contain shadow-lg rounded-3xl"
            src="/img/top_banner.svg" alt="huddle-guide brand banner">
        </div>
        <div class="flex justify-center row-span-3 md:justify-start md:ml-4">
          <img class="object-contain w-[600px]" src="/img/top_discussion.svg" alt="discussion image">
        </div>
        <div class="flex justify-center md:justify-end md:mr-16">
          <p class="pt-6 text-3xl">オンラインでもチームで<br>コミュニケーションが<br>取れていますか？</p>
        </div>
        <div class="my-6 flex justify-center md:justify-end md:mr-16">
          <NuxtLink to="/register"
            class="btn btn-active brn-primary shadow hover:shadow-lg text-sm md:text-lg text-base-100 mr-12">
            使ってみる
          </NuxtLink>
          <NuxtLink to="/login" class="btn btn-active brn-primary shadow text-sm md:text-lg text-base-100 ml-12">
            ログイン
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="hero my-6 md:py-12 bg-[#EEEEEE]">
      <div class="hero-content flex-col md:flex-row self-center center">
        <img src="/img/top_team_image.svg" alt="team" class="object-contain w-[500px]" />
        <div class="text-lg md:text-2xl text-center ">
          <p class="py-6 md:leading-10"><span class="font-bold">Huddle
              Guide</span>は、<br />チームメンバーの共通点を発見したり、<br />日々あった新しいことを同期的に共有することで<br />チームビルディングを行えるサービスです</p>
        </div>
      </div>
    </div>
    <div class="pt-24 text-3xl font-bold">使い方</div>
    <div class="hero bg-base-100">
      <div>
        <div class="my-8 hero-content flex-col md:flex-row">
          <img src="/img/top_signup.svg" class="object-contain w-[500px]" alt="signup" />
          <div>
            <h1 class="text-2xl font-bold">1. まずはユーザー登録</h1>
            <p class="py-6 text-xl">チームを作成するユーザーは新規登録を行います</p>
          </div>
        </div>
        <div class="my-8 hero-content flex-col md:flex-row-reverse">
          <img src="/img/top_together.svg" class="object-contain w-[500px]" alt="together" />
          <div>
            <h1 class="text-2xl font-bold">2. チームを作成</h1>
            <p class="py-6 text-xl">ワークを一緒に行うチームを作成して<br />メンバー追加画面からメンバーを招待します</p>
          </div>
        </div>
        <div class="my-8 hero-content flex-col md:flex-row">
          <img src="/img/top_group_chat.svg" class="object-contain w-[500px]" alt="group_chat" />
          <div>
            <h1 class="text-2xl font-bold">3. 簡単なワークを実施</h1>
            <p class="py-6 text-xl">10〜30分程度のワークを行います。<br>※この際、別途SlackやDiscordといった<br />ビデオ通話ツールなどを併用しても構いません。</p>
          </div>
        </div>
        <div class="my-8 hero-content flex-col md:flex-row-reverse">
          <img src="/img/top_group.png" class="object-contain w-[500px]" alt="group" />
          <div>
            <h1 class="text-2xl font-bold">4. ワークの結果をふりかえる</h1>
            <p class="py-6 text-xl">ワーク後、結果をSNSにシェアしたり<br>1on1での話題として活用します</p>
          </div>
        </div>
      </div>
    </div>
    <div class="my-6 flex justify-center">
      <NuxtLink to="/register"
        class="btn btn-active brn-primary shadow hover:shadow-lg text-sm md:text-lg text-base-100 mr-12">
        使ってみる
      </NuxtLink>
      <NuxtLink to="/login" class="btn btn-active brn-primary shadow text-sm md:text-lg text-base-100 ml-12">
        ログイン
      </NuxtLink>
    </div>
    <div class="text-right">
      <a href="https://storyset.com/research" class="link-hover text-info text-xs mr-2">Illustration by Storyset</a>
    </div>
  </div>
</template>
