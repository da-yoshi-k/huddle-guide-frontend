<script setup lang="ts">
const props = defineProps<{
  work: {
    id: number,
    name: string,
  },
  teams?: [{
    id: string,
    name: string
  }]
}>()

const emits = defineEmits<{
  (e: 'standby-work', teamId: string): void;
}>();

const selectedTeamId = ref(props.teams ? props.teams[0]?.id : '')

const disabled = computed(() => {
  return selectedTeamId.value != null ? '' : 'btn-disabled'
})

const handleStandbyWork = () => {
  emits('standby-work', selectedTeamId.value)
}
</script>

<template>
  <input type="checkbox" id="work-select-modal" class="modal-toggle" />
  <label for="work-select-modal" class="modal cursor-pointer bg-slate-100 bg-opacity-50">
    <label class="modal-box relative" for="">
      <label for="work-select-modal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
      <h3 class="text-xl font-bold mb-4">ワーク開始</h3>
      <p>実施するワーク: {{ props.work.name }}</p>
      <p class="py-4">ワークを行うチームを選択してください</p>
      <form @submit.prevent>
        <select v-model="selectedTeamId" class="select select-bordered w-full max-w-xs">
          <option v-for="item in props.teams" :key="item.id" :value="item.id">{{ item.name }}</option>
        </select>
        <span class="text-error" v-if="!!disabled"><br />チームに参加していない場合にはワークを開始できません。</span>
        <div class="flex justify-center mt-4">
          <button class="btn btn-primary text-white" :class="disabled" @click="handleStandbyWork">ワークを開始</button>
        </div>
      </form>
    </label>
  </label>
</template>
