<template>
  <div class="scroll-table-wrap">
    <el-table :data="showData" :style="{height: props.height}" class="scrollTable" ref="scrollTable">
      <template v-for="(item, index) in showColumns" :key="item.label">
        <el-table-column :prop="item.prop" :label="item.label" :width="item.width" />
      </template>
    </el-table>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
    required: true
  },
  sourceData: {
    type: Array,
    default: () => [],
    required: true
  },
  height: {
    type: String,
    default: '100%'
  }
})
const showData = ref<any>([])
const showColumns = ref<any>([])

const setIndex = (list) => {
  let _arr = JSON.parse(JSON.stringify(list))
  _arr.map((item, index) => {
    item.index = index + 1
  })
  return _arr
}
const setColumnIndex = (list) => {
  let _arr = JSON.parse(JSON.stringify(list))
  _arr.unshift({ label: '序号', prop: 'index', width: '60' })
  return _arr
}

watch([() => props.sourceData, () => props.columns], (newValue, oldValue) => {
  showData.value = setIndex(props.sourceData)
  showColumns.value = setColumnIndex(newValue[1])
}, { deep: true, immediate: true })

const scrollTable = ref(null)
//设置时间
let timer: any = null;
const scroll = () => {
  if (!scrollTable) return
  // 在执行新的计时器前将之前的计时器清除
  if (timer) clearInterval(timer);
  let status = true;
  // 获取表格滚动区域的dom
  const scrollDom = scrollTable.value?.$refs.bodyWrapper?.getElementsByClassName("el-scrollbar__wrap")[0];
  if (!scrollDom) return
  // 增加监听事件鼠标移入停止滚动
  scrollDom.addEventListener('mouseover', () => {
    status = false;
  });
  // 鼠标移出恢复滚动
  scrollDom.addEventListener('mouseout', () => {
    status = true;
  });
  if(scrollDom.scrollHeight === scrollDom.clientHeight) return
  // 设置每秒滚动一行
  timer = setInterval(() => {
    if (status) {
      // 设置每次滚动的像素
      scrollDom.scrollTop += 1;
      // 当滚动到底部时修改scrollTop回到顶部
      if ((scrollDom.scrollHeight - (scrollDom.clientHeight + scrollDom.scrollTop)) < 1) {
        // scrollDom.scrollTop = 0;
        showData.value.push(showData.value[showData.value.length % props.sourceData.length])
        if (showData.value.length >= props.sourceData.length * 2) {
          scrollDom.scrollTop = 0;
          showData.value = setIndex(props.sourceData)
        }
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

<style scoped lang="scss">
::v-deep .el-scrollbar__wrap {
  overflow: hidden;
}
.scrollTable{
  width: 100%;
}
</style>
