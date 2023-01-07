<template>
  <!-- aside -->
  <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />
  <div class="hidden md:inline-block">
    <aside class="flex sticky top-16 w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2"
      style="height: calc(100vh - 64px)">
      <NuxtLink to="/home" class="flex items-center space-x-1 rounded-md px-5 py-3 hover:bg-gray-300">
        <div class="flex justify-center mr-2">
          <img src="/img/nav_home.svg" class="w-6 h-6" />
        </div>
        <span>ホーム</span>
      </NuxtLink>
      <NuxtLink to="/works" class="flex items-center space-x-1 rounded-md px-5 py-3 hover:bg-gray-300">
        <div class="flex justify-center mr-2">
          <img src="/img/nav_work.svg" class="w-6 h-6" />
        </div>
        <span>ワーク</span>
      </NuxtLink>
      <NuxtLink to="/teams" class="flex items-center space-x-1 rounded-md px-5 py-3 hover:bg-gray-300">
        <div class="flex justify-center mr-2">
          <img src="/img/nav_team.svg" class="w-6 h-6" />
        </div>
        <span>チーム</span>
      </NuxtLink>
      <NuxtLink to="/profile" class="flex items-center space-x-1 rounded-md px-5 py-3 hover:bg-gray-300">
        <div class="flex justify-center mr-2">
          <img src="/img/nav_profile.svg" class="w-6 h-6" />
        </div>
        <span>プロフィール</span>
      </NuxtLink>
    </aside>
  </div>
</template>
