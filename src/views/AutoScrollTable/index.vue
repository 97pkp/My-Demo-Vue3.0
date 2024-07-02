<template>
    <div style="display: flex;flex-direction: column;">
        <ScrollTable :refName="tableRef">
            <template #default>
                <el-table ref="tableRef" :data="showData" style="width: 100%;height: 400px">
                    <el-table-column label="序号" type="index" width="60" />
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
            </template>
        </ScrollTable>
        <!-- <ScrollTable2 :refName="tableRef">
            <template #default>
                <el-table ref="tableRef" :data="showData" style="width: 100%;height: 400px">
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
            </template>
        </ScrollTable2> -->
        <hr>

        <!-- <el-table class="top-table" :data="showData" border style="width: 100%;">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
        <vue3-seamless-scroll class="seamless" :list="showData" :hover="true" :step="0.4" :isWatch="true">
            <el-table class="bottom-table" :data="showData" border style="width: 100%;">
                <el-table-column prop="date" label="Date" width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="address" label="Address" />
            </el-table>
        </vue3-seamless-scroll>
 -->


        <!-- <ScrollTable2></ScrollTable2> -->
        <ScrollTable3
            :columns="columns"
            :sourceData="tableData"
            height="200px"
        ></ScrollTable3>

        <ScrollTable3
            :columns="columns"
            :sourceData="tableData"
            height="200px"
        ></ScrollTable3>

    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, useSlots } from 'vue'
import ScrollTable from '@/components/ScrollTable/index.vue'
import ScrollTable2 from '@/components/ScrollTable2/index.vue'
import ScrollTable3 from '@/components/ScrollTable3/index.vue'

    const columns = [{
       label: 'Date',
       width: '180',
       prop: 'date'
    },
    {
       label: 'Name',
       width: '180',
       prop: 'name'
    },
    {
       label: 'Address',
       prop: 'address'
    }]

   
    const classOption = {
        step: 0.3, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.list
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      }

const tableRef = ref(null)
const tableData = [
    {
        date: '1号列表',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2号列表',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '3号列表',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '4号列表',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '5号列表',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]

const showData = ref<any>([])

onMounted(() => {
   showData.value = [...tableData, ...tableData, ...tableData ]
}) 

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


<style scoped>
    .seamless {
        width: 100%;
        height: 220px;
        overflow: hidden;
    }
    :deep .top-table .el-table__body-wrapper {
        display: none;
    }
    :deep .bottom-table .el-table__header-wrapper {
        display: none;
        width: 100%;
    }
</style>
