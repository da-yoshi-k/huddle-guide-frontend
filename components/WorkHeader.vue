<script setup lang="ts">
import { useAuthUserStore } from '~~/stores/authUser';
import ActionCable from 'actioncable'
const runTimeConfig = useRuntimeConfig();
const handleCloseConnect = () => {
  const cable = ActionCable.createConsumer(runTimeConfig.public.actioncableUrl)
  cable.disconnect();
}
const store = useAuthUserStore();

</script>

<template>
  <div class="sticky top-0 z-30 navbar bg-neutral bg-opacity-95 h-12 md:h-16 shadow-sm">
    <!-- ワーク画面 -->
    <div class="flex-1">
      <img src="/img/nav_logo.svg" class="h-11 md:h-14 rounded-xl" alt="huddle-guide brand logo">
    </div>
    <div class="flex-none text-yellow-100">
      <ul class="menu menu-horizontal md:mr-8">
        <li tabindex="0">
          <div id="user-info">
            <div class="text-sm md:text-base">
              {{ store.authUser?.user.name }}
            </div>
            <div class="avatar">
              <div class="w-6 md:w-10 rounded-full bg-white">
                <img
                  :src="store.authUser?.user.avatar_url ? store.authUser.user.avatar_url : '/img/default_account.svg'" />
              </div>
            </div>
          </div>
          <ul class="p-3 bg-neutral rounded-lg" style="transform:translate(-20px)">
            <li>
              <NuxtLink to="/home" @click="handleCloseConnect">
                ワークを退出する
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

