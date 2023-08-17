<template>
    <div class="breadcrumb-wrap">
        <el-breadcrumb :separator-icon="ArrowRight" >
            <el-breadcrumb-item
                v-for="route in crumbList"
                :key="route.name"
                :to="{ path: route.path }">
                <span v-if="route.meta.name != ''">{{ route.meta.name }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
     
</template>

<script setup lang='ts'>
import { computed, ref, reactive, watch } from 'vue'
import { useConfigStore } from '@/store/index'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
const route = useRoute()
let crumbList:any = ref([])


generateBreadcrumb()
function generateBreadcrumb() {
    // 获取当前路由信息
    const matched = route.matched
    // 初始化面包屑导航数据
    const breadcrumbList = new Array<any>()
    // 遍历路由信息，生成面包屑导航数据
    matched.forEach(item => {
        if(item.name) {
            breadcrumbList.push(item)
        }
    })
    // 保存面包屑导航数据
    crumbList.value = breadcrumbList
}

watch(route, (newV, oldV) => {
    generateBreadcrumb()
})
</script>

<style scoped lang="scss">
    .breadcrumb-wrap{
        padding: 0 0 10px;
    }
</style>