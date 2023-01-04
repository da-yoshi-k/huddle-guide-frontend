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
  <div class="sticky top-0 z-30 navbar bg-neutral bg-opacity-95 h-12 md:h-16">
    <!-- ワーク画面 -->
    <div class="flex-1">
      <img src="/img/nav_logo.png" alt="huddle-guide brand logo">
    </div>
    <div class="flex-none text-yellow-100 md:mr-4">
      <ul class="menu menu-horizontal px-1">
        <li tabindex="0">
          <div id="user-info">
            {{ store.authUser?.user.name }}
            <template v-if="!!store.authUser?.user.avatar_url">
              <div class="avatar">
                <div class="w-10 rounded-full">
                  <img :src="store.authUser.user.avatar_url" />
                </div>
              </div>
            </template>
          </div>
          <ul class="p-2 bg-neutral">
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

