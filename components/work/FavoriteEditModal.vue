<script setup lang="ts">
import { useWorkshopStore } from '~~/stores/workshop';
import { useAuthUserStore } from '~~/stores/authUser';
import { Level, toJapanese } from '~~/types/level'
const authUserStore = useAuthUserStore();
const workShopStore = useWorkshopStore();
const level: Level[] = [0, 1, 2, 3, 4]

const props = defineProps<{
  openFlag: boolean
}>();

const modalOpen = computed(() => {
  if (!props.openFlag) {
    fetchPrevPosts()
    handleFormDisabled()
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
const handleFormDisabled = () => {
  isFirstPostBlank.value = posts.value.posts[0].content === '' && posts.value.posts[1].content === ''
  isSecondPostBlank.value = posts.value.posts[1].content === '' && posts.value.posts[2].content === ''
}

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

const emits = defineEmits<{
  (e: 'posts-edit', posts: any): void;
  (e: 'post-delete', postId: number): void;
  (e: 'close-modal'): void;
}>();
const handleEditFavoriteThings = () => {
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
  handleFormDisabled()
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
      <h3 class="text-xl font-bold mb-4">自分の好きなことを3つまで入力してください</h3>
      <form @submit.prevent ref="postForm">
        <div class="form-control inline">
          <label class="label">
            <span class="label-text">1つ目</span>
          </label>
          <input type="text" v-model.lazy.trim="posts.posts[0].content" maxlength=20 @change="handleFormDisabled"
            class="input input-bordered w-[180px] md:w-[300px] mr-2">
          <select v-model.lazy="posts.posts[0].level" class="select select-bordered text-xs">
            <option v-for="(value, key) in level" :key="key" :value="value">{{ toJapanese(value) }}</option>
          </select>
          <div v-if="posts.posts[0].id !== 0" class="ml-4 align-middle inline-block"
            @click="handleDeletePost(0, posts.posts[0].id)">
            <button class="btn btn-sm btn-circle btn-outline btn-error">✕</button>
          </div>
        </div>
        <div class="form-control inline">
          <label class="label">
            <span class="label-text">2つ目</span>
          </label>
          <input type="text" v-model.lazy.trim="posts.posts[1].content" maxlength=20 @change="handleFormDisabled"
            class="input input-bordered w-[180px] md:w-[300px] mr-2" :disabled="isFirstPostBlank ? true : undefined">
          <select v-model.lazy="posts.posts[1].level" class="select select-bordered text-xs"
            :disabled="isFirstPostBlank ? true : undefined">
            <option v-for="(value, key) in level" :key="key" :value="value">{{ toJapanese(value) }}</option>
          </select>
          <div v-if="posts.posts[1].id !== 0" class="ml-4 align-middle inline-block"
            @click="handleDeletePost(1, posts.posts[1].id)">
            <button class="btn btn-sm btn-circle btn-outline btn-error">✕</button>
          </div>
        </div>
        <div class="form-control inline">
          <label class="label">
            <span class="label-text">3つ目</span>
          </label>
          <input type="text" v-model.lazy.trim="posts.posts[2].content" maxlength=20 @change="handleFormDisabled"
            class="input input-bordered w-[180px] md:w-[300px] mr-2" :disabled="isSecondPostBlank ? true : undefined">
          <select v-model.lazy="posts.posts[2].level" class="select select-bordered text-xs"
            :disabled="isSecondPostBlank ? true : undefined">
            <option v-for="(value, key) in level" :key="key" :value="value">{{ toJapanese(value) }}</option>
          </select>
          <div v-if="posts.posts[2].id !== 0" class="ml-4 align-middle inline-block"
            @click="handleDeletePost(2, posts.posts[2].id)">
            <button class="btn btn-sm btn-circle btn-outline btn-error">✕</button>
          </div>
        </div>
        <div class="flex justify-center mt-4">
          <button class="btn btn-primary text-white" @click.prevent="handleEditFavoriteThings">登録</button>
        </div>
      </form>
    </label>
</label>
</template>
