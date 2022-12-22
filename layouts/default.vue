<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <div class="flex">
      <TheSidebar />
      <div class="flex flex-col min-h-screen w-full">
        <slot />
        <TheFooter />
      </div>
    </div>
  </div>
</template>
