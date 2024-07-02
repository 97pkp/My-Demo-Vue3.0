<template>
    <div style="width: 100%;">
        <slot></slot>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
    refName: {
        type: Object,
        default: () => null
    }
})

//设置时间
let timer: any = null;
const scroll = () => {
    console.log('tableRef:', props.refName);

    if (!props.refName) return
    // 在执行新的计时器前将之前的计时器清除
    if (timer) clearInterval(timer);
    let status = true;
    // 获取表格滚动区域的dom
    const scrollDom = props.refName?.$refs.bodyWrapper?.getElementsByClassName("el-scrollbar__wrap")[0];
    if (!scrollDom) return
    // 增加监听事件鼠标移入停止滚动
    scrollDom.addEventListener('mouseover', () => {
        status = false;
    });
    // 鼠标移出恢复滚动
    scrollDom.addEventListener('mouseout', () => {
        status = true;
    });
    // 设置每秒滚动一行
    timer = setInterval(() => {
        if (status) {
            // 设置每次滚动的像素
            scrollDom.scrollTop += 1;
            // 当滚动到底部时修改scrollTop回到顶部
            if ((scrollDom.scrollHeight - (scrollDom.clientHeight + scrollDom.scrollTop)) < 1) {
                scrollDom.scrollTop = 0;
            }
        }
        //控制速度
    }, 20);
}

//设置定时器进行自滚动
const getData = () => {
    setTimeout(() => { scroll() }, 5)
}

onMounted(() => {
    getData()
})
onUnmounted(() => {
    if (timer) clearInterval(timer);
    timer = null;
})

</script>

<style scoped></style>