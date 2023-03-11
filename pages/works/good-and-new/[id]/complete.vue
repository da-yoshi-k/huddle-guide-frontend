<script setup lang="ts">
import { useWorkshopStore } from '~~/stores/workshop';
import { useAuthUserStore } from '~~/stores/authUser';
import { AdvancementType } from '~~/types/advancementType';
const store = useWorkshopStore();
const authUserStore = useAuthUserStore();
const route = useRoute();
await store.fetchWorkshop(route.params.id as string)
await store.fetchAdvancements();

const goodItems = computed(() => {
  return store.advancements?.advancements.filter(item => item.advancement_type === AdvancementType.Good)
})

const newItems = computed(() => {
  return store.advancements?.advancements.filter(item => item.advancement_type === AdvancementType.New)
})

const participants = computed(() => {
  return store.workshop?.workshop.users
})

useHead({
  title: 'ワーク終了'
})
definePageMeta({
  requireLogin: true
})
</script>

<template>
  <h2 class="font-bold leading-tight text-2xl text-black m-4">Good & New</h2>
  <div class="flex justify-center">
    <div class="w-[90%] min-h-[600px] bg-green-100 rounded-xl mb-8">
      <div class="text-xl text-center my-4">ワーク終了</div>
      <div class="flex justify-center mb-10">
        <div class="mr-4">{{ $formatDate(store.workshop!.workshop.work_date) }}</div>
        <div>{{ `実施したワーク： ${store.workshop!.workshop.work.name}` }}</div>
      </div>
      <div class="flex justify-center">
        <div class="w-4/5 max-w-xl break-all">
          <div class="mb-8">
            <div class="text-bold text-lg underline underline-offset-4 mb-2">Goodに関する投稿</div>
            <div class="mx-2">
              <template v-if="goodItems?.length !== 0">
                <div v-for="item in goodItems" :key="item.id">
                  <div class="flex items-center gap-2 mb-1">
                    <UserProfileAvatar :user="participants!.find(user => user.id === item.user_id)!" :size=6 />
                    {{ item.content }}
                  </div>
                </div>
              </template>
              <template v-else>
                この話題に関する投稿はありませんでした。
              </template>
            </div>
          </div>
          <div class="mb-8">
            <div class="text-bold text-lg underline underline-offset-4 mb-2">Newに関する投稿</div>
            <div class="mx-2">
              <template v-if="newItems?.length !== 0">
                <div v-for="item in newItems" :key="item.id">
                  <div class="flex items-center gap-2 mb-1">
                    <UserProfileAvatar :user="participants!.find(user => user.id === item.user_id)!" :size=6 />
                    {{ item.content }}
                  </div>
                </div>
              </template>
              <template v-else>
                この話題に関する投稿はありませんでした。
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <NuxtLink to="/home" class="btn btn-primary text-yellow-100">ホームに戻る</NuxtLink>
      </div>
    </div>
  </div>
</template>
