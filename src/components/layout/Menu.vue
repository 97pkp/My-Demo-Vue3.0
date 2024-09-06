<template>
    <div class="nav-wrap" :class="isOpen ? 'isOpen' : 'notOpen'">
        <div class="logo" @click="logoChange">
            <img :src="require('../../assets/logo.png')" alt="">
            {{ isOpen ? title : '' }}
        </div>
        <div class="menu">
            <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" :default-active="activeMenu" text-color="#fff" @open="handleOpen" @close="handleClose">
                <template v-for="item in routers" :key="item.path">
                    <MenuItem v-if="!item!.meta!.hidden" :item="item" :base-path="item.path" ></MenuItem>
                </template>
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
const router:any = useRouter()
console.log('路由呀：', router.options.routes);

let _arr:any = []
router.options.routes.forEach((item: any) => {
    if(item.children) {
        _arr.push(...item.children)
    }else{
        _arr.push(item)
    }
})
const routers = _arr

// const activeMenu = computed(() => {
//     const route = useRoute()
//     console.log('>>>>', useRouter());
    
//     console.log('>><', route);
    
//     const { meta, path, name } = route
//     // if set path, the sidebar will highlight the path you set
//     if (meta.activeMenu) {
//         return meta.activeMenu
//     }
//     return name
// })

const activeMenu = ref('首页')

function logoChange(e: any) {
    configStore.$patch(state => {
        state.isOpen = !isOpen.value
    })
}
function handleOpen(key: any, keyPath: any) {
    console.log(key, keyPath);
}
function handleClose(key: any, keyPath: any) {
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