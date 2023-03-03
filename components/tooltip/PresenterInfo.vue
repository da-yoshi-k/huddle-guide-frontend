<template>
  <div>
    <VMenu :delay="{ show: 500, hide: 50 }">
      <img src='/img/info.svg' />

      <template #popper>
        <div class="bg-white text-sm p-4 max-w-[320px]">
          発表順は 自由発表→左上→右上→・・→右下→自由発表 の順に進みます
        </div>
      </template>
    </VMenu>
  </div>
</template>
