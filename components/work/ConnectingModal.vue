<script setup lang="ts">
const props = defineProps<{
  openFlag: boolean,
}>();

const modalOpen = computed(() => {
  return props.openFlag ? 'modal-open' : ''
})
</script>

<template>
  <label for="chat-message-modal" class="modal bg-gray-300 bg-opacity-50" :class="modalOpen">
    <label class="modal-box relative overflow-hidden" for="">
      <div class="flex flex-col items-center">
        <div class="loader">Loading...</div>
        <h3 class="text-xl font-bold border-gray-100">接続中</h3>
      </div>
    </label>
  </label>
</template>

<style scoped>
.loader {
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: #757575;
  background: -moz-linear-gradient(left, #757575 10%, rgba(117, 117, 117, 0) 42%);
  background: -webkit-linear-gradient(left, #757575 10%, rgba(117, 117, 117, 0) 42%);
  background: -o-linear-gradient(left, #757575 10%, rgba(117, 117, 117, 0) 42%);
  background: -ms-linear-gradient(left, #757575 10%, rgba(117, 117, 117, 0) 42%);
  background: linear-gradient(to right, #757575 10%, rgba(117, 117, 117, 0) 42%);
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}

.loader:before {
  width: 50%;
  height: 50%;
  background: #757575;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}

.loader:after {
  background: #f3f4f6;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
