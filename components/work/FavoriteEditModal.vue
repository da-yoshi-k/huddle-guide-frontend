<script setup lang="ts">
const props = defineProps<{
  posts: [{
    id: number,
    name: string,
  }]
}>()
</script>

<template>
  <!-- <input type="checkbox" id="work-select-modal" class="modal-toggle" />
  <label for="work-select-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
      <label for="work-select-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <h3 class="text-xl font-bold mb-4">ワーク開始</h3>
      <p>実施するワーク: {{ props.work.name }}</p>
      <p class="py-4">ワークを行うチームを選択してください</p>
      <form>
        <select v-model="selectedTeamId" class="select select-bordered w-full max-w-xs">
          <option v-for="item in props.teams" :key="item.id" :value="item.id">{{ item.name }}</option>
        </select>
        <div class="flex justify-center mt-4">
          <div class="btn btn-primary text-white" @click="handleStandbyWork">ワークを開始</div>
        </div>
      </form>
    </label>
  </label> -->
</template>
