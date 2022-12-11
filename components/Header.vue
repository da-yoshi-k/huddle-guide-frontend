<template>
  <div class="sticky top-0 z-30 navbar bg-neutral">
    <div class="flex-1">
      <NuxtLink to="/" class="">
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
