<template>
    <section class="app-main">
        <div class="breadcrumb">
            <Breadcrumb></Breadcrumb>
        </div>
        <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </section>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const route = useRoute()
import Breadcrumb from './Breadcrumb.vue'

const key = computed(()=> {
    return route.path
})

</script>

<style>
.app-main{
    display: flex;
    flex: 1;
    flex-direction: column;
}

</style>