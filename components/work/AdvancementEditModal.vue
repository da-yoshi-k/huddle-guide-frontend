<script setup lang="ts">
import { useWorkshopStore } from '~~/stores/workshop';
import { useAuthUserStore } from '~~/stores/authUser';
import { AdvancementType, toJapanese } from '~~/types/advancementType'
const authUserStore = useAuthUserStore();
const workShopStore = useWorkshopStore();

const props = defineProps<{
  openFlag: boolean
}>();
const modalOpen = computed(() => {
  if (!props.openFlag) {
    fetchPrevAdvancement()
    handleFormValid()
  }
  return props.openFlag ? 'modal-open' : ''
})

const advancementType = [AdvancementType.Good, AdvancementType.New]
let defaultAdvancement = reactive({
  advancement: {
    id: 0,
    content: '',
    workshop_id: workShopStore.workshop?.workshop.id,
    user_id: authUserStore.authUser?.user.id,
    advancement_type: 0 as AdvancementType
  }
})

const advancement = computed({
  get() {
    return defaultAdvancement
  },
  set(newValue) {
    defaultAdvancement = { ...newValue }
  }
})
let selectedType = ref<AdvancementType>(0)
let contentValue = ref('')

let errors = ref([''])
const MAX_CONTENT_LENGTH = 50
const MAX_CONTENT_LENGTH_MESSAGE = '投稿は50文字以下で記入してください。'
const EMPTY_MESSAGE = '投稿の内容は必須項目です。'
const handleFormValid = () => {
  // バリデーションチェック
  errors.value = []
  if (contentValue.value.length > MAX_CONTENT_LENGTH) {
    errors.value.push(MAX_CONTENT_LENGTH_MESSAGE)
  }
}
const handleFormEmptyValid = () => {
  errors.value = []
  if (contentValue.value.length == 0) {
    errors.value.push(EMPTY_MESSAGE)
  }
}
const isSubmitDisabled = computed(() => {
  return errors.value.length !== 0
})

const fetchPrevAdvancement = () => {
  let prevAdvancements = workShopStore.advancements?.advancements.filter(advancement => advancement.user_id === authUserStore.authUser?.user.id)
  if (prevAdvancements?.length !== 0 && prevAdvancements != undefined) {
    const prevAdvancement = { advancement: prevAdvancements[0] }
    advancement.value.advancement.id = prevAdvancement.advancement.id
    selectedType.value = prevAdvancement.advancement.advancement_type
    contentValue.value = prevAdvancement.advancement.content
  }
}

const emits = defineEmits<{
  (e: 'advancement-edit', advancements: any): void;
  (e: 'close-modal'): void;
}>();

const setAdvancement = async () => {
  advancement.value.advancement.advancement_type = selectedType.value
  advancement.value.advancement.content = contentValue.value
}

const handleEditAdvancement = () => {
  handleFormEmptyValid()
  if (!isSubmitDisabled.value) {
    setAdvancement().then(() => {
      emits('advancement-edit', advancement.value.advancement)
    })
  }
}
const handleCloseModal = () => {
  emits('close-modal')
}
</script>

<template>
  <label for="advancement-edit-modal" class="modal bg-slate-100 bg-opacity-50" :class="modalOpen">
    <label class="modal-box relative" for="">
      <label for="advancement-edit-modal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="handleCloseModal">✕</label>
      <h3 class="text-xl font-bold mb-4">最近の良かったことや新しく知ったことを<br />記入してください</h3>
      <span class="text-error">{{ errors[0] }}</span>
      <form @submit.prevent>
        <div class="label-text">種類</div>
        <div class="form-control flex-row justify-around mb-4">
          <div v-for="(value, key) in advancementType" :key="key">
            <label class="label cursor-pointer">
              <input type="radio" class="radio radio-sm mr-2" v-model="selectedType" :value="value" />
              <span class="label-text text-lg">{{ toJapanese(value) }}</span>
            </label>
          </div>
        </div>
        <div class="form-control inline">
          <label class="label">
            <span class="label-text">内容</span>
          </label>
          <input type="text" v-model.trim="contentValue" @keyup="handleFormValid" class="input input-bordered w-full">
        </div>
        <div class="flex justify-center mt-4">
          <button class="btn btn-primary text-white" @click.prevent="handleEditAdvancement"
            :disabled="isSubmitDisabled ? true : undefined">登録</button>
        </div>
      </form>
    </label>
  </label>
</template>
