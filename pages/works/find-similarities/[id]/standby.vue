<script setup lang="ts">
import { useWorkshopStore } from '~~/stores/workshop';
import ActionCable from 'actioncable'
import { useNotification } from '@kyvg/vue3-notification';
const { notify } = useNotification();
const store = useWorkshopStore();
const route = useRoute();
const MIN_MEMBER_COUNT = 1;
const runTimeConfig = useRuntimeConfig();
const cable = ActionCable.createConsumer(runTimeConfig.public.actioncableUrl)

const isConnecting = ref(true)
const fetchWorkshopInfo = async () => {
  await store.fetchWorkshop(route.params.id as string).then(() => {
    if (store.workshop?.workshop.work_step.name === '終了') {
      navigateTo(`/works/find-similarities/${store.workshop?.workshop.id}/complete`)
    } else if (store.workshop?.workshop.work_step.name !== '待機') {
      notify({ type: "info", text: "ワークに参加しました。", duration: 1000 })
      navigateTo(`/works/find-similarities/${store.workshop?.workshop.id}`)
    }
  })
}

await fetchWorkshopInfo()
const workshopStandbyChannel = cable.subscriptions.create(
  { channel: 'WorkshopStandbyChannel', room: store.workshop?.workshop.id },
  {
    async connected() {
      isConnecting.value = false
      await fetchWorkshopInfo()
    },
    disconnected() {
      isConnecting.value = true
    },
    received({ type, body }) {
      switch (type) {
        case 'join_member':
          store.fetchWorkshop(route.params.id as string)
          break
        case 'start_workshop':
          notify({ type: "info", text: "ワークが開始されました。", duration: 1000 })
          workshopStandbyChannel.unsubscribe();
          cable.disconnect();
          setTimeout(() => {
            navigateTo(`/works/find-similarities/${store.workshop?.workshop.id}`)
          }, 500);
          break
      }
    }
  }
)

const disabled = computed(() => {
  return { 'btn-disabled': store.workshop!.workshop.users.length < MIN_MEMBER_COUNT }
})

const startWorkshop = async () => {
  await store.updateWorkStep(2).then(() => {
    workshopStandbyChannel.perform('start_workshop', {})
  })
}

useHead({ title: '待機画面' })
definePageMeta({
  requireLogin: true,
  layout: "work",
})
</script>

<template>
  <h2 class="py-4 text-3xl text-center text-black font-bold">待機画面</h2>
  <div id="profile-form" class="flex justify-center mb-5">
    <div class="w-11/12 md:max-w-xl">
      <div id="work-info-container" class="flex flex-col mb-8">
        <div class="flex mb-2">
          <div class="font-bold leading-tight text-lg text-black">実施するワーク</div>
          <div class="text-lg text-black pl-4 mr-4">{{ store.workshop?.workshop.work.name }}</div>
        </div>
        <div class="flex mb-2">
          <h3 class="font-bold leading-tight text-lg text-black">チーム名</h3>
          <div class="text-lg text-black pl-4 mr-4">{{ store.workshop?.workshop.team.name }}</div>
        </div>
        <div class="mb-8">
          <h3 class="font-bold leading-tight text-lg text-black mb-2">ワークの流れ</h3>
          <ul class="list-decimal ml-8">
            <li class="text-black">自分のカードの鉛筆ボタンをクリックし、好きなことを入力します。</li>
            <li class="text-black">参加者全員が入力したら順番に発表していきます。<br />ファシリテーターは都度発表者を切り替えてください。</li>
            <li class="text-black">全員の発表が終わったら雑談タイムです。気になったことを深く聞いてみましょう。</li>
            <li class="text-black">完了画面では自分と他メンバーの共通点とチーム内で挙がった共通点が表示されるので、会話のきっかけにしましょう。</li>
          </ul>
        </div>
        <div class="mb-8">
          <h3 class="font-bold leading-tight text-lg text-black mb-2">ワークを行う上での心構え</h3>
          <ul class="list-decimal ml-8">
            <li class="text-black">ワークを盛り上げるため、リアクションを活発に行います。</li>
            <li class="text-black">お互いを尊重しあい、譲り合ってワークに参加します。</li>
            <li class="text-black">ハラスメントに繋がる言動を行っていないか省みつつ発言を行います。</li>
            <li class="text-black">ファシリテーターは発言者の偏りとタイムキープを意識しつつ適宜発言者を交代します。</li>
          </ul>
        </div>
        <div class="flex flex-col mb-8">
          <h3 class="font-bold leading-tight text-xl text-black">参加者一覧</h3>
          <div class="flex justify-center mt-4">
            <WorkParticipationCard :users="store.workshop?.workshop.users!" />
          </div>
        </div>
        <div class="flex justify-center">
          <button @click="startWorkshop" class="btn btn-primary w-48 justify-center text-yellow-100"
            :class="disabled">ワークを始める</button>
        </div>
      </div>
    </div>
    <WorkConnectingModal :open-flag="isConnecting" />
  </div>
</template>
