<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <router-view :key="key" />
        </transition>
    </section>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const route = useRoute()

const key = computed(()=> {
    return route.path
})

</script>

<style>

</style>