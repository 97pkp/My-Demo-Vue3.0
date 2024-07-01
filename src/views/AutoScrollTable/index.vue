<template>
    <div style="display: flex;">
        <!-- <ScrollTable refName="tableRef">
            <template #default>
                <el-table ref="tableRef" :data="showData" style="width: 100%;height: 400px">
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
            </template>
        </ScrollTable> -->


        <el-table ref="tableRef" :data="showData" style="width: 100%;height: 400px">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, nextTick } from 'vue'
import ScrollTable from '@/components/ScrollTable/index.vue'
import { tableAutoScroll } from '@/utils/scroll'

const tableRef = ref(null)
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]

const showData = [...tableData, ...tableData, ...tableData, ...tableData, ...tableData, ...tableData ]

/** 表格自动滚动 */
const infinitScroll = () => {
      // 拿到表格挂载后的真实DOM
    //   const table = tableRef.value.$refs.rbottom;
    //   const tables = this.$refs.rtop;
 

    tableRef.value.$refs.bodyWrapper.scrollTop = 100
    console.log(tableRef.value.$refs);

    

    tableRef.value.$refs.tableBody.scrollTop = 300
    
    console.log('>>>', tableRef.value.$refs.tableBody.scrollTop);
    
    //   tableAutoScroll(tableRef.value.$refs)
    //   tableAutoScroll(tables)
    }

onMounted(() => {
    setInterval(()=>{
        console.log(tableRef.value.$refs);
        
        // infinitScroll()
        // this.$nextTick(() => {
        // // 设置滚动条的初始位置
        // this.$refs.myTable.bodyWrapper.scrollTop = 100;
        // });
       
        // tableRef.value.$refs.bodyWrapper.scrollTop =tableRef.value.$refs.bodyWrapper.scrollHeight;
    }, 1000)
    nextTick(()=>{
            // tableRef.value.$refs.bodyWrapper.scrollTop = 100;
            tableRef.value.$refs.bodyWrapper.scrollTop =tableRef.value.$refs.bodyWrapper.scrollHeight;
        })
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