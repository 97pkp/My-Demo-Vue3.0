<template>
    <div class="menu-container">
        <template v-for="item in menus">
            <div v-if="item.children && item.children.length">
                <el-sub-menu :index="item.name" v-if="item.meta && !item.meta.hidden" :key="item.name">
                    <template #title>{{ item.meta && item.meta.name }}</template>
                    <MenuItem :item="item.children"></MenuItem>
                </el-sub-menu>
            </div>
            <div v-else>
                <el-menu-item :index="item.name" v-if="item.meta && !item.meta.hidden" :key="item.name" @click="gotoRoute(item.name, item.path)">
                    <el-icon><icon-menu /></el-icon>
                    <span>{{ item.meta && item.meta.name }}</span>
                </el-menu-item>
            </div>
        </template>
    </div>
</template>

<script setup lang='ts'>
import MenuItem from './MenuItem.vue'
import { useRouter,useRoute } from 'vue-router'
import { useConfigStore } from '@/store/index'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const props = defineProps({
    item: Array
})
const menus:any = props.item
const configStore = useConfigStore()


const router = useRouter()
function gotoRoute(name:any, path:any) {
    router.push({ name });
}

</script>

<style>

</style>