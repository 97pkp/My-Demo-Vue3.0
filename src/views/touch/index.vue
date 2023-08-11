<template>
    <div style="width: 100%;height: calc(100vh - 300px);background-color: #eee;">
        <div class="songlist-row-s" v-finger:swipe="swipeHandler"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
function swipeHandler(e) {
  console.log("swipe" + e.direction);
}
</script>
<style></style>
