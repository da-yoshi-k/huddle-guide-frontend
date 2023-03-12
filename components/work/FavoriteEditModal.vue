<script setup lang="ts">
import { useWorkshopStore } from '~~/stores/workshop';
import { useAuthUserStore } from '~~/stores/authUser';
import { Level, toJapanese } from '~~/types/level'
const authUserStore = useAuthUserStore();
const workShopStore = useWorkshopStore();

const props = defineProps<{
  openFlag: boolean
}>();
const modalOpen = computed(() => {
  if (!props.openFlag) {
    fetchPrevPosts()
    handleFormValid()
  }
  return props.openFlag ? 'modal-open' : ''
})

const defaultPost = {
  id: 0,
  content: '',
  workshop_id: workShopStore.workshop?.workshop.id,
  user_id: authUserStore.authUser?.user.id,
  level: 0 as Level
}

let defaultPosts = reactive({
  posts: [{
    id: 0,
    content: '',
    workshop_id: workShopStore.workshop?.workshop.id,
    user_id: authUserStore.authUser?.user.id,
    level: 0 as Level
  }, {
    id: 0,
    content: '',
    workshop_id: workShopStore.workshop?.workshop.id,
    user_id: authUserStore.authUser?.user.id,
    level: 0 as Level
  }, {
    id: 0,
    content: '',
    workshop_id: workShopStore.workshop?.workshop.id,
    user_id: authUserStore.authUser?.user.id,
    level: 0 as Level
  }]
})

const posts = computed({
  get() {
    return defaultPosts
  },
  set(newValue) {
    defaultPosts = { ...newValue }
  }
})

const isFirstPostBlank = ref(true)
const isSecondPostBlank = ref(true)
let errors = ref([''])
const MAX_CONTENT_LENGTH = 20
const MAX_CONTENT_LENGTH_MESSAGE = '各投稿は20文字以下で記入してください。'
const MAX_CONTENT_DUPLICATE_MESSAGE = '同じ内容の投稿は行えません'
const handleFormValid = () => {
  isFirstPostBlank.value = posts.value.posts[0].content === '' && posts.value.posts[1].content === ''
  isSecondPostBlank.value = posts.value.posts[1].content === '' && posts.value.posts[2].content === ''
  // バリデーションチェック
  errors.value = []
  if (posts.value.posts.filter(item => item.content.length > MAX_CONTENT_LENGTH).length !== 0) {
    errors.value.push(MAX_CONTENT_LENGTH_MESSAGE)
  }
  const nonEmptyContent = posts.value.posts.filter(p => p.content.trim() !== '');
  const uniqueContentValues = new Set(nonEmptyContent.map(p => p.content));
  if (uniqueContentValues.size !== nonEmptyContent.length) {
    errors.value.push(MAX_CONTENT_DUPLICATE_MESSAGE)
  }
}
const isSubmitDisabled = computed(() => {
  return errors.value.length !== 0
})

const fetchPrevPosts = () => {
  let prevPosts = workShopStore.posts?.posts.filter(post => post.user_id === authUserStore.authUser?.user.id)
    .sort(function (a, b) {
      return (a.id < b.id) ? -1 : 1
    })
  if (prevPosts != null) {
    for (let i = 0; i < prevPosts.length; i++) {
      posts.value.posts[i] = { ...prevPosts[i] }
    }
  }
}

const handleSettiongLevel = (level: Level, index: number) => {
  posts.value.posts[index].level = level
}
const emits = defineEmits<{
  (e: 'posts-edit', posts: any): void;
  (e: 'post-delete', postId: number): void;
  (e: 'close-modal'): void;
}>();
const handleEditFavoriteThings = () => {
  if (!isSubmitDisabled.value) {
    const submittingPosts = {
      posts: posts.value.posts.filter(post => post.content !== '')
    }
    for (let i = 0; i < posts.value.posts.length; i++) {
      if (submittingPosts.posts[i] != null) {
        posts.value.posts[i] = { ...submittingPosts.posts[i] }
      } else {
        posts.value.posts[i] = { ...defaultPost }
      }
    }
    emits('posts-edit', submittingPosts)
  }
}
const handleDeletePost = (index: number, postId: number) => {
  emits('post-delete', postId)
  posts.value.posts[index] = defaultPost
  const remainingPosts = {
    posts: posts.value.posts.filter(post => post.content !== '')
  }
  for (let i = 0; i < posts.value.posts.length; i++) {
    if (remainingPosts.posts[i] != null) {
      posts.value.posts[i] = { ...remainingPosts.posts[i] }
    } else {
      posts.value.posts[i] = { ...defaultPost }
    }
  }
  handleFormValid()
}
const handleCloseModal = () => {
  emits('close-modal')
}
</script>

<template>
  <label for="favorite-edit-modal" class="modal bg-slate-100 bg-opacity-50" :class="modalOpen">
    <label class="modal-box relative" for="">
      <label for="favorite-edit-modal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="handleCloseModal">✕</label>
      <h3 class="text-xl font-bold mb-4">自分の好きなことを最大3つまで入力してください</h3>
      <span class="text-error">{{ errors[0] }}</span>
      <form @submit.prevent>
        <div class="form-control inline">
          <label class="label">
            <span class="label-text">1つ目</span>
          </label>
          <input type="text" v-model.trim="posts.posts[0].content" @keyup="handleFormValid"
            class="input input-bordered w-[180px] md:w-[270px] mr-2">
          <div class="inline-block">
            <WorkFavoliteLevelSelect :disabled="false" :index=0 :selected-level="posts.posts[0].level"
              @set-level="handleSettiongLevel" />
          </div>
          <div v-if="posts.posts[0].id !== 0" class="ml-4 align-middle inline-block"
            @click="handleDeletePost(0, posts.posts[0].id)">
            <button class="btn btn-sm btn-circle btn-outline btn-error">✕</button>
          </div>
        </div>
        <div class="form-control inline">
          <label class="label">
            <span class="label-text">2つ目</span>
          </label>
          <input type="text" v-model.trim="posts.posts[1].content" @keyup="handleFormValid"
            class="input input-bordered w-[180px] md:w-[270px] mr-2" :disabled="isFirstPostBlank ? true : undefined">
          <div class="inline-block">
            <WorkFavoliteLevelSelect :disabled="isFirstPostBlank" :index=1 :selected-level="posts.posts[1].level"
              @set-level="handleSettiongLevel" />
          </div>
          <div v-if="posts.posts[1].id !== 0" class="ml-4 align-middle inline-block"
            @click="handleDeletePost(1, posts.posts[1].id)">
            <button class="btn btn-sm btn-circle btn-outline btn-error">✕</button>
          </div>
        </div>
        <div class="form-control inline">
          <label class="label">
            <span class="label-text">3つ目</span>
          </label>
          <input type="text" v-model.trim="posts.posts[2].content" @keyup="handleFormValid"
            class="input input-bordered w-[180px] md:w-[270px] mr-2" :disabled="isSecondPostBlank ? true : undefined">
          <div class="inline-block">
            <WorkFavoliteLevelSelect :disabled="isSecondPostBlank" :index=2 :selected-level="posts.posts[2].level"
              @set-level="handleSettiongLevel" />
          </div>
          <div v-if="posts.posts[2].id !== 0" class="ml-4 align-middle inline-block"
            @click="handleDeletePost(2, posts.posts[2].id)">
            <button class="btn btn-sm btn-circle btn-outline btn-error">✕</button>
          </div>
        </div>
        <div class="flex justify-center mt-4">
          <button class="btn btn-primary text-white" @click.prevent="handleEditFavoriteThings"
            :disabled="isSubmitDisabled ? true : undefined">登録</button>
        </div>
      </form>
    </label>
  </label>
</template>
