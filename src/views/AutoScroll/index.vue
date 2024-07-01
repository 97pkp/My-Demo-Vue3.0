<template>
    <div style="display: flex;">
        <el-card>
            <vue3-seamless-scroll :list="list" class="scroll" :step="0.5">
                <div class="item" v-for="(item, index) in list" :key="index">
                    <span>{{ item.title }}</span>
                    <span>{{ item.date }}</span>
                </div>
            </vue3-seamless-scroll>
        </el-card>
        <el-button @click="clickHandle">刷新</el-button>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

type Item = {
    title: string,
    date: string
}

const clickHandle = () => {
    const _arr = JSON.parse(JSON.stringify(list.value))
    list.value = []
    setTimeout(() => {
        list.value = _arr
    })
}
const list = ref<Item[]>([
    {
        title: "无缝滚动第一行无缝滚动第一行",
        date: "2017-12-16",
    },
    {
        title: "无缝滚动第二行无缝滚动第二行",
        date: "2017-12-16",
    },
    {
        title: "无缝滚动第三行无缝滚动第三行",
        date: "2017-12-16",
    },
    {
        title: "无缝滚动第四行无缝滚动第四行",
        date: "2017-12-16",
    },
    {
        title: "无缝滚动第五行无缝滚动第五行",
        date: "2017-12-16",
    },
    {
        title: "无缝滚动第六行无缝滚动第六行",
        date: "2017-12-16",
    },
    {
        title: "无缝滚动第七行无缝滚动第七行",
        date: "2017-12-16",
    },
    {
        title: "无缝滚动第八行无缝滚动第八行",
        date: "2017-12-16",
    },
    {
        title: "无缝滚动第九行无缝滚动第九行",
        date: "2017-12-16",
    },
])

</script>

<style lang='scss' scoped>
.scroll {
    height: 200px;
    width: 500px;
    overflow: hidden;
}

.scroll .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 0;
}
</style>