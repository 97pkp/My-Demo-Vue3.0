<template>
    <div class="nav-wrap" :class="isOpen ? 'isOpen' : 'notOpen'">
        <div class="logo" @click="logoChange">
            <img :src="require('../../assets/logo.png')" alt="">
            {{ isOpen ? title : '' }}
        </div>
        <div class="menu">
            <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" :default-active="activeMenu" text-color="#fff" @open="handleOpen" @close="handleClose">
                <MenuItem :item="routers"></MenuItem>
            </el-menu>
        </div>
    </div>
</template>

<script setup lang='ts'>
import MenuItem from './MenuItem.vue'
import { useConfigStore } from "@/store/index";
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from "vue-router";
import { ref, toRefs, onMounted, computed } from "vue";
const configStore = useConfigStore()
const { isOpen, title } = storeToRefs(configStore);

const routers:any = computed(() => {
    const router = useRouter()
    console.log('options:',router.options.routes)
    if(router.options.routes[0].path === '/') {
        return router.options.routes[0].children
    }else{
        return router.options.routes
    }
})

const activeMenu = computed(() => {
    const route = useRoute()
    const { meta, path, name } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
        return meta.activeMenu
    }
    return name
})

function logoChange(e) {
    configStore.$patch(state => {
        state.isOpen = !isOpen.value
    })
}
function handleOpen(key, keyPath) {
    console.log(key, keyPath);
}
function handleClose(key, keyPath) {
    console.log(key, keyPath);
}
</script>

<style lang="scss" scoped>
.nav-wrap {
    height: 100vh;
    background: #2f4f4f;
    transition: width .3s;
    user-select: none;
    overflow: hidden;
    flex-shrink: 0;

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