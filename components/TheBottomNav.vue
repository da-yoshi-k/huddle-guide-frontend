<template>
  <div class="md:hidden">
    <section id="bottom-navigation" class="block fixed inset-x-0 bottom-0 z-10 h-16 bg-white">
      <div id="tabs" class="flex justify-between border">
        <NuxtLink to="/home"
          class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
          <span class="text-2xl"><i class="bx bx-home"></i></span>
          <span class="tab tab-home block text-md">ホーム</span>
        </NuxtLink>
        <NuxtLink to="/works"
          class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
          <span class="text-2xl"><i class="bx bx-user-voice"></i></span>
          <span class="tab tab-work block text-md">ワーク</span>
        </NuxtLink>
        <NuxtLink to="/teams"
          class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
          <span class="text-2xl"><i class="bx bx-group"></i></span>
          <span class="tab tab-team block text-md">チーム</span>
        </NuxtLink>
        <NuxtLink to="/profile"
          class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
          <span class="text-2xl"><i class="bx bx-user"></i></span>
          <span class="tab tab-profile block text-xs pt-1">プロフィール</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
