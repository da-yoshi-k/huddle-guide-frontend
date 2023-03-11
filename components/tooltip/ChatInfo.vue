<template>
  <div>
    <VMenu :delay="{ show: 500, hide: 50 }">
      <img src='/img/info.svg' />

      <template #popper>
        <div class="bg-white text-sm p-4 max-w-[320px]">
          チャットでメンバーの趣味を聞いてみましょう。<br />サービス内のチャット以外でもSlackやDiscordなどのコミュニケーションツールを併用しても構いません。<br />ワーク終了後はチャットの内容は参照できません。
        </div>
      </template>
    </VMenu>
  </div>
</template>
