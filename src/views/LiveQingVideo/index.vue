<template>
    <div class="video_wrap">
        <LiveQingVideo></LiveQingVideo>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import LiveQingVideo from './LiveQingVideo.vue'
</script>

<style lang="scss" scoped>
.video_wrap {
    width: 100%;
    height: 100%;
    display: flex;
}
</style>