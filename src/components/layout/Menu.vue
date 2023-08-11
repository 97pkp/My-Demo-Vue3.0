<template>
    <div class="nav-wrap" :class="isOpen ? 'isOpen' : 'notOpen'">
        <div class="logo" @click="logoChange">
            <img :src="require('../../assets/logo.png')" alt="">
            {{ isOpen ? title : '' }}
        </div>
        <div class="menu">

        </div>
    </div>
</template>

<script setup lang='ts'>
import { useConfigStore } from "@/store/index";
import { storeToRefs } from 'pinia'
import { ref, toRefs, onMounted, computed } from "vue";
const configStore = useConfigStore()
const { isOpen, title } = storeToRefs(configStore);
function logoChange(e) {
    console.log(isOpen.value);
    
    configStore.$patch(state => {
        state.isOpen = !isOpen.value
    })
}
</script>

<style lang="scss" scoped>
.nav-wrap {
    height: 100vh;
    background: #2f4f4f;
    transition: width .3s;
    user-select: none;

    &.isOpen {
        width: 200px;
    }

    &.notOpen {
        width: 50px;
    }

    .logo {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: bold;
        cursor: pointer;

        img {
            width: 40px;
            margin-right: 10px;
        }
    }
}
</style>

<style>
.nav-enter-active,
.nav-leave-active {
  transition: opacity 2s ease;
}

.nav-enter-from,
.nav-leave-to {
  opacity: 0;
}
</style>