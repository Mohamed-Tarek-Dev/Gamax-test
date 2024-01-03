<template>
  <div class="page_loader">
    <Loader />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.page_loader {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgba($color: #000000, $alpha: 0.3);
}
</style>
