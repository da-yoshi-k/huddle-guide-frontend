<script setup lang="ts">
import { useWorkshopStore } from '~~/stores/workshop';
import { useAuthUserStore } from '~~/stores/authUser';
const store = useWorkshopStore();
const authUserStore = useAuthUserStore();
const route = useRoute();
await store.fetchWorkshop(route.params.id as string)
await store.fetchPosts();
definePageMeta({
  requireLogin: true
})
const mySimilarities = computed(() => {
  return store.posts?.posts.filter(post => post.user_id === authUserStore.authUser?.user.id && post.sameUsers && post.sameUsers?.length > 0)
})
const allSimilarities = computed(() => {
  const items = store.posts?.posts.filter(post => post.sameUsers && post.sameUsers?.length > 0)
  const uniqueItems = items?.filter((e, index, self) => {
    return self.findIndex((el) => el.content === e.content) === index;
  })
  return uniqueItems
})
</script>

<template>
  <h2 class="font-bold leading-tight text-2xl text-black m-4">共通点探し</h2>
  <div class="flex justify-center">
    <div class="w-[90%] min-h-[600px] bg-green-100 rounded-xl mb-8">
      <div class="text-xl text-center my-4">ワーク終了</div>
      <div class="flex justify-center mb-4">
        <div class="mr-4">{{ $formatDate(store.workshop!.workshop.work_date) }}</div>
        <div>{{ `実施したワーク： ${store.workshop!.workshop.work.name}` }}</div>
      </div>
      <div>
        <h3 class="text-lg font-bold mb-2 text-center">見つけた共通点</h3>
        <template v-if="!!mySimilarities?.length">
          <div v-for="item in mySimilarities">
            <div class="flex justify-center">
              <div class="mr-4">{{ `${item.content}：` }}</div>
              <div>{{ `チーム内の他${item.sameUsers!.length}人との共通点` }}</div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="text-center">チーム内での共通点はありませんでした。ワーク中に気になった趣味をメンバーに聞いてみましょう！</div>
        </template>
        <template v-if="!!allSimilarities?.length">
          <h3 class="text-lg font-bold mt-6 mb-2 text-center">チーム内で見つかった他の共通点</h3>
          <div v-for="item in allSimilarities">
            <div class="flex justify-center">
              <div class="mr-4">{{ `${item.content}：` }}</div>
              <div>{{ `チーム内の${item.sameUsers!.length + 1}人の共通点` }}</div>
            </div>
          </div>
        </template>
      </div>
      <div class="flex justify-center mt-4">
        <NuxtLink to="/home" class="btn btn-primary text-yellow-100">ホームに戻る</NuxtLink>
      </div>
    </div>
  </div>
</template>
