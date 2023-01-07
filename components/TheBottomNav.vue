<template>
  <div class="md:hidden">
    <section id="bottom-navigation" class="block fixed inset-x-0 bottom-0 z-10 h-16 bg-white">
      <div id="tabs" class="flex justify-between border">
        <NuxtLink to="/home"
          class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
          <div class="flex justify-center">
            <img src="/img/nav_home.svg" class="w-6 h-6" />
          </div>
          <span class="tab block text-md">ホーム</span>
        </NuxtLink>
        <NuxtLink to="/works"
          class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
          <div class="flex justify-center">
            <img src="/img/nav_work.svg" class="w-6 h-6" />
          </div>
          <span class="tab block text-md">ワーク</span>
        </NuxtLink>
        <NuxtLink to="/teams"
          class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
          <div class="flex justify-center">
            <img src="/img/nav_team.svg" class="w-6 h-6" />
          </div>
          <span class="tab block text-md">チーム</span>
        </NuxtLink>
        <NuxtLink to="/profile"
          class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
          <div class="flex justify-center">
            <img src="/img/nav_profile.svg" class="w-6 h-6" />
          </div>
          <span class="tab block text-xs pt-1">プロフィール</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
