<script setup lang="ts">
useHead({ title: 'Huddle Guideとは' })
definePageMeta({
  layout: "static",
});
</script>

<template>
  <div class="text-center">
    <div class="pt-24 text-3xl font-bold underline underline-offset-4">Huddle Guideとは</div>
    <div class="text-2xl text-center mx-4 my-12 leading-10">
      <p class="py-6"><span class="font-bold">Huddle
          Guide</span>は、<br />チームメンバーの共通点を発見したり、<br />日々あった新しいことを同期的に共有することで<br />チームビルディングを行えるサービスです</p>
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
    <div class="text-right">
      <a href="https://storyset.com/research" class="link-hover text-info text-xs mr-2">Illustration by Storyset</a>
    </div>
</div>
</template>
