<template>
  <notifications classes="my-notification" style="top: 64px; left: 14px;" />
</template>

<style lang="scss">
.my-notification {
  // styling
  margin: 5px 5px 5px;
  padding: 10px;
  font-size: 16px;
  color: #ffffff;

  background: #44a4fc;
  border-left: 5px solid #187fe7;

  .vue-notification-group {
    top: 60px;
  }

  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }

  &.warn {
    background: #FBBD23;
    border-left-color: #f48a06;
  }

  &.error {
    background: #F87272;
    border-left-color: #e2382c;
  }

  &.info {
    background: #3b82f6;
    border-left-color: #0050a0;
  }
}
</style>
