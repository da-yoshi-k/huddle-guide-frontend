<template>
  <!-- aside -->
  <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />
  <div class="hidden md:inline-block">
    <aside class="flex sticky w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2" style="height: 88vh">
      <NuxtLink to="/home" class="flex items-center space-x-1 rounded-md px-5 py-3 hover:bg-gray-300">
        <span class="text-2xl"><i class="bx bx-home"></i></span>
        <span>ホーム</span>
      </NuxtLink>

      <NuxtLink to="/works" class="flex items-center space-x-1 rounded-md px-5 py-3 hover:bg-gray-300">
        <span class="text-2xl"><i class="bx bx-user-voice"></i></span>
        <span>ワーク</span>
      </NuxtLink>

      <NuxtLink to="/teams" class="flex items-center space-x-1 rounded-md px-5 py-3 hover:bg-gray-300">
        <span class="text-2xl"><i class="bx bx-group"></i></span>
        <span>チーム</span>
      </NuxtLink>

      <NuxtLink to="/profile" class="flex items-center space-x-1 rounded-md px-5 py-3 hover:bg-gray-300">
        <span class="text-2xl"><i class="bx bx-user"></i></span>
        <span>プロフィール</span>
      </NuxtLink>
    </aside>
  </div>
</template>
