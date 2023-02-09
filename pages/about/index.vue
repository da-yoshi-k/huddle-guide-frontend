<script setup lang="ts">
useHead({ title: 'Huddle Guideとは' })
definePageMeta({
  layout: "static",
});
</script>

<template>
  <div class="text-center">
    <div class="pt-24 text-3xl font-bold">Huddle Guideとは</div>
    <div>
      <p class="py-6">Huddle Guideはチームメンバーの共通点を発見したり、<br />日々あった新しいことを共有するような<br />複数の同期型のワークを提供するサービスです</p>
    </div>
    <div class="pt-24 text-3xl font-bold">使い方</div>
    <div class="hero bg-base-100">
      <div>
        <div class="my-8 hero-content flex-col md:flex-row">
          <img src="/img/top_signup.svg" class="object-contain w-[500px]" />
          <div>
            <h1 class="text-2xl font-bold">1. まずはユーザー登録</h1>
            <p class="py-6 text-xl">チームを作成するユーザーは新規登録を行います</p>
          </div>
        </div>
        <div class="my-8 hero-content flex-col md:flex-row-reverse">
          <img src="/img/top_together.svg" class="object-contain w-[500px]" />
          <div>
            <h1 class="text-2xl font-bold">2. チームを作成</h1>
            <p class="py-6 text-xl">ワークを一緒に行うチームを作成してメンバーを招待します</p>
          </div>
        </div>
        <div class="my-8 hero-content flex-col md:flex-row">
          <img src="/img/top_group_chat.svg" class="object-contain w-[500px]" />
          <div>
            <h1 class="text-2xl font-bold">3. 簡単なワークを実施</h1>
            <p class="py-6 text-xl">10〜30分程度のワークを行います。<br>この際、別途ビデオ通話ツールなどを併用しても構いません。</p>
          </div>
        </div>
        <div class="my-8 hero-content flex-col md:flex-row-reverse">
          <img src="/img/top_group.png" class="object-contain w-[500px]" />
          <div>
            <h1 class="text-2xl font-bold">4. ワークの結果をふりかえる</h1>
            <p class="py-6 text-xl">ワーク後、SNSにシェアしたり<br>1on1の機会に繋げます</p>
          </div>
        </div>
      </div>
    </div>
    <div class="text-right">
      <a href="https://storyset.com/research" class="link-hover text-info text-xs mr-2">Illustration by Storyset</a>
    </div>
  </div>
</template>
