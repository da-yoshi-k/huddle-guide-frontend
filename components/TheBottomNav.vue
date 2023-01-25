<script setup lang="ts">
const route = useRoute();
const path = computed(() => {
  const str = route.path.match(/^\/\w*$/) ? route.path : route.path.replace(/\/[^\/]*$/, '')
  return str;
})
</script>

<template>
  <div class="md:hidden">
    <section id="bottom-navigation" class="block fixed inset-x-0 bottom-0 z-10 h-16 bg-white">
      <div id="tabs" class="flex justify-between border">
        <NuxtLink to="/home" class="w-full justify-center inline-block text-center pt-2 pb-1">
          <div class="flex justify-center" :class="path === '/home' ? '' : 'opacity-60'">
            <img src="/img/nav_home.svg" class="w-6 h-6" />
          </div>
          <span class="tab block text-md" :class="path === '/home' ? 'text-gray-900' : ''">ホーム</span>
        </NuxtLink>
        <NuxtLink to="/works" class="w-full justify-center inline-block text-center pt-2 pb-1">
          <div class="flex justify-center" :class="path === '/works' ? '' : 'opacity-60'">
            <img src="/img/nav_work.svg" class="w-6 h-6" />
          </div>
          <span class="tab block text-md" :class="path === '/works' ? 'text-gray-900' : ''">ワーク</span>
        </NuxtLink>
        <NuxtLink to="/teams" class="w-full justify-center inline-block text-center pt-2 pb-1">
          <div class="flex justify-center" :class="path === '/teams' ? '' : 'opacity-60'">
            <img src="/img/nav_team.svg" class="w-6 h-6" />
          </div>
          <span class="tab block text-md" :class="path === '/teams' ? 'text-gray-900' : ''">チーム</span>
        </NuxtLink>
        <NuxtLink to="/profile" class="w-full justify-center inline-block text-center pt-2 pb-1">
          <div class="flex justify-center" :class="path === '/profile' ? '' : 'opacity-60'">
            <img src="/img/nav_profile.svg" class="w-6 h-6" />
          </div>
          <span class="tab block text-xs pt-1" :class="path === '/profile' ? 'text-gray-900' : ''">プロフィール</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
