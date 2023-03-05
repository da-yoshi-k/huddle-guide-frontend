<script setup lang="ts">
import { useWorkshopStore } from '~~/stores/workshop';
import { useAuthUserStore } from '~~/stores/authUser';
const store = useWorkshopStore();
const authUserStore = useAuthUserStore();
const route = useRoute();
await store.fetchWorkshop(route.params.id as string)
await store.fetchPosts();

const twitterUrlBase = 'https://twitter.com/intent/tweet'
const siteUrlBase = 'https://huddle-guide.com?utm_source=twitter'

const mySimilarities = computed(() => {
  return store.posts?.posts.filter(post => post.user_id === authUserStore.authUser?.user.id && post.sameUsers && post.sameUsers?.length > 0)
})
const mySimilaritiesText = encodeURIComponent(`ワークを行い、自分と同じ共通点として${mySimilarities.value?.map(obj => obj.content).join(', ')}が見つかりました！\nあなたもHuddle Guideでチームメンバーとコミュニケーションを取りましょう！ #HuddleGuide\n`)
const mySimilaritieswitterUrl = `${twitterUrlBase}?url=${siteUrlBase}&text=${mySimilaritiesText}`

const noSimilarityText = encodeURIComponent('自分と同じ共通点がない個性豊かなチームでワークをしました！\nあなたもHuddle Guideでチームメンバーとコミュニケーションを取りましょう！ #HuddleGuide\n')
const noSimilarityTwitterUrl = `${twitterUrlBase}?url=${siteUrlBase}&text=${noSimilarityText}&hashtags=huddleguide`

const allSimilarities = computed(() => {
  const items = store.posts?.posts.filter(post => post.sameUsers && post.sameUsers?.length > 0)
  const uniqueItems = items?.filter((e, index, self) => {
    return self.findIndex((el) => el.content === e.content) === index;
  })
  return uniqueItems
})

const allSimilarityText = encodeURIComponent(`ワークを行い、チーム内では${allSimilarities.value?.map(obj => obj.content).join(', ')}が共通点として見つかりました！\nあなたもHuddle Guideでコミュニケーションを取りましょう！ #HuddleGuide\n`)
const allSimilarityTwitterUrl = `${twitterUrlBase}?url=${siteUrlBase}&text=${allSimilarityText}`

useHead({
  title: 'ワーク終了'
})
definePageMeta({
  requireLogin: true
})
</script>

<template>
  <h2 class="font-bold leading-tight text-2xl text-black m-4">共通点探し</h2>
  <div class="flex justify-center">
    <div class="w-[90%] min-h-[600px] bg-green-100 rounded-xl mb-8">
      <div class="text-xl text-center my-4">ワーク終了</div>
      <div class="flex justify-center mb-10">
        <div class="mr-4">{{ $formatDate(store.workshop!.workshop.work_date) }}</div>
        <div>{{ `実施したワーク： ${store.workshop!.workshop.work.name}` }}</div>
      </div>
      <div class="mb-12">
        <h3 class="text-lg font-bold mb-2 text-center">見つけた共通点</h3>
        <template v-if="!!mySimilarities?.length">
          <div v-for="item in mySimilarities">
            <div class="flex justify-center">
              <div class="mr-4">{{ `${item.content}：` }}</div>
              <div>{{ `チーム内の他${item.sameUsers!.length}人との共通点` }}</div>
            </div>
          </div>
          <div class="flex justify-center mt-3">
            <a :href="mySimilaritieswitterUrl" target="_blank" class="btn btn-sm btn-twitter">
              <div class="flex items-center">
                <span><img src="/img/twitter_icon.svg" alt="Twitter" width=30></span>
                <span class="ml-2 text-white">この内容でツイート</span>
              </div>
            </a>
          </div>
        </template>
        <template v-else>
          <div class="text-center mb-3">チーム内での共通点はありませんでした。<br />ワーク中に気になった趣味をメンバーに聞いてみましょう！</div>
          <div class="flex justify-center">
            <a :href="noSimilarityTwitterUrl" target="_blank" class="btn btn-sm btn-twitter">
              <div class="flex items-center">
                <span><img src="/img/twitter_icon.svg" alt="Twitter" width=30></span>
                <span class="ml-2 text-white">この内容でツイート</span>
              </div>
            </a>
          </div>
        </template>
        <template v-if="!!allSimilarities?.length">
          <h3 class="text-lg font-bold mt-12 mb-2 text-center">チーム内で見つかった共通点</h3>
          <div v-for="item in allSimilarities">
            <div class="flex justify-center">
              <div class="mr-4">{{ `${item.content}：` }}</div>
              <div>{{ `チーム内の${item.sameUsers!.length + 1}人の共通点` }}</div>
            </div>
          </div>
          <div class="flex justify-center mt-3">
            <a :href="allSimilarityTwitterUrl" target="_blank" class="btn btn-sm btn-twitter">
              <div class="flex items-center">
                <span><img src="/img/twitter_icon.svg" alt="Twitter" width=30></span>
                <span class="ml-2 text-white">この内容でツイート</span>
              </div>
            </a>
          </div>
        </template>
      </div>
      <div class="flex justify-center">
        <NuxtLink to="/home" class="btn btn-primary text-yellow-100">ホームに戻る</NuxtLink>
      </div>
    </div>
  </div>
</template>
