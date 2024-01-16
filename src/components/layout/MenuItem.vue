<template>
    <div class="menu-container">
        <template v-if="item && !item.hidden && (!item.children || !item.children.length)">
            <el-menu-item :index="item.name" @click="gotoRoute(item.name, item.path)">
                <el-icon>
                    <!-- <icon-menu /> -->
                </el-icon>
                <span>{{ item.meta && item.meta.title }}</span>
            </el-menu-item>
        </template>
        <template v-if="item && !item.hidden && (item.children && item.children.length)">
            <template v-if="item.children.length === 1">
                <el-menu-item :index="item.children[0].name" @click="gotoRoute(item.children[0].name, item.children[0].path)">
                    <el-icon>
                        <!-- <icon-menu /> -->
                    </el-icon>
                    <span>{{ item.children[0].meta && item.children[0].meta.title }}</span>
                </el-menu-item>
            </template>
            <template v-else>
                <el-sub-menu :index="item.name">
                    <template #title>{{ item.meta && item.meta.title }}</template>
                    <MenuItem v-for="child in item.children" :key="child.path" :is-nest="true" :item="child"
                        :base-path="child.path" class="nest-menu">
                    </MenuItem>
                </el-sub-menu>
            </template>
        </template>
    </div>
</template>

<script setup lang='ts'>
import MenuItem from './MenuItem.vue'
import { useRouter, useRoute } from 'vue-router'
import { useConfigStore } from '@/store/index'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const props = defineProps({
    item: {
        type: Object,
    }
})

interface childType {
    path: string
    name?: string
    component: Function
    meta: {
        title: Object
        icon: string
        hidden?: boolean
        [key: string]: any
    }
}

const router = useRouter()
function gotoRoute(name: any, path: any) {
    console.log(name, path);
    
    router.push({ path });
}

</script>

<style></style>