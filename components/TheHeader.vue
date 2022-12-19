<template>
  <div class="sticky top-0 z-30 navbar bg-neutral bg-opacity-95 h-12 md:h-16">
    <div class="flex-1">
      <NuxtLink to="/">
        <img src="/img/nav_logo.png" alt="huddle-guide brand logo">
      </NuxtLink>
    </div>
    <div class="flex-none">
      <NuxtLink to="/login" class="btn btn-active brn-primary shadow text-sm md:text-lg text-base-100">
        ログイン
      </NuxtLink>
    </div>
  </div>
</template>
