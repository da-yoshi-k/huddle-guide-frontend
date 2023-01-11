<script setup lang="ts">
import { useWorkshopStore } from '~~/stores/workshop';
import { useAuthUserStore } from '~~/stores/authUser';
import { Level, toJapanese } from '~~/types/level'
const authUserStore = useAuthUserStore();
const workShopStore = useWorkshopStore();
const level: Level[] = [0, 1, 2, 3]

const props = defineProps<{
  openFlag: boolean
}>();

const modalOpen = computed(() => {
  return props.openFlag ? 'modal-open' : ''
})

const posts = computed(() => {
  let posts = {
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
  }
  return posts
})

const fetchPrevPosts = () => {
  let prevPosts = workShopStore.posts?.posts.filter(post => post.user_id === authUserStore.authUser?.user.id).sort(function (a, b) {
    return (a.id < b.id) ? -1 : 1
  })
  if (prevPosts != null) {
    for (let i = 0; i < prevPosts.length; i++) {
      posts.value.posts[i] = { ...prevPosts[i] }
    }
  }
}

fetchPrevPosts();

const emits = defineEmits<{
  (e: 'posts-edit', posts: any): void;
  (e: 'close-modal'): void;
}>();
const handleEditFavoriteThings = () => {
  emits('posts-edit', posts.value)
}
const handleCloseModal = () => {
  fetchPrevPosts()
  emits('close-modal')
}
</script>

<template>
  <label for="favorite-edit-modal" class="modal cursor-pointer" :class="modalOpen">
    <label class="modal-box relative" for="">
      <label for="favorite-edit-modal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="handleCloseModal">✕</label>
      <h3 class="text-xl font-bold mb-4">自分の好きなことを3つまで入力してください</h3>
      <form @submit.prevent>
        <div class="form-control inline">
          <label class="label">
            <span class="label-text">1つ目</span>
          </label>
          <input type="text" v-model.lazy="posts.posts[0].content" class="input input-bordered md:w-[300px] mr-2">
          <select v-model.lazy="posts.posts[0].level" class="select select-bordered text-xs">
            <option v-for="(value, key) in level" :key="key" :value="value">{{ toJapanese(value) }}</option>
          </select>
        </div>
        <div class="form-control inline">
          <label class="label">
            <span class="label-text">2つ目</span>
          </label>
          <input type="text" v-model.lazy="posts.posts[1].content" class="input input-bordered md:w-[300px] mr-2">
          <select v-model.lazy="posts.posts[1].level" class="select select-bordered text-xs">
            <option v-for="(value, key) in level" :key="key" :value="value">{{ toJapanese(value) }}</option>
          </select>
        </div>
        <div class="form-control inline">
          <label class="label">
            <span class="label-text">3つ目</span>
          </label>
          <input type="text" v-model.lazy="posts.posts[2].content" class="input input-bordered md:w-[300px] mr-2">
          <select v-model.lazy="posts.posts[2].level" class="select select-bordered text-xs">
            <option v-for="(value, key) in level" :key="key" :value="value">{{ toJapanese(value) }}</option>
          </select>
        </div>
        <div class="flex justify-center mt-4">
          <button class="btn btn-primary text-white" @click.prevent="handleEditFavoriteThings">登録</button>
        </div>
      </form>
    </label>
  </label>
</template>
