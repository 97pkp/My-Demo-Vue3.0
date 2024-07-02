<template>
    <div class="min">

<!-- 
      <vue3-seamless-scroll :class="{ 'seamless-warp': true }" :list="list">
        <el-table :data="list" style="width: 100%;">
          <el-table-column prop="uploadDate" label="日期" width="180"></el-table-column>
          <el-table-column prop="fileName" label="姓名" width="180"></el-table-column>
          <el-table-column prop="uploadMan" label="地址"></el-table-column>
        </el-table>
      </vue3-seamless-scroll> -->



    <div style="display: inline-block; width: 100%">
      <!-- 只留表头 -->
      <el-table
        :data="list"
        style="width: 100%"
        class="top"
      >
        <el-table-column prop="fileName" label="油库名称" align="center" />
        <el-table-column prop="uploadDate" label="油库编号" align="center" />
        <el-table-column prop="fileSize" label="总库存(m3)" align="center" />
        <el-table-column prop="uploadMan" label="安全高度(mm)" align="center" />
        <el-table-column prop="visitNum" label="安全容量(m3)" align="center" />
        <el-table-column prop="visitNum" label="装油高度(mm)" align="center" />
        <el-table-column prop="visitNum" label="油罐差压(Pa)" align="center" />
        <el-table-column prop="visitNum" label="查表体积(m3)" align="center" />
      </el-table>

      <div style="height: 300px;">
         <!-- 表格内容滚动 -->
        <vue3-seamless-scroll
        :list="list" :hover="true" :step="1" :isWatch="true" :limitScrollNum="5"
        
          class="seamless-warp"
          style="width: 100%;"
        >
          <div>
            <el-table
              :data="list"
              style="width: 100%;height: 100%;"
              class="bottom"
            >   
              <el-table-column label="序号" align="center" type="index"/>
              <el-table-column prop="uploadDate" label="油库编号" align="center" />
              <el-table-column prop="fileSize" label="总库存(m3)" align="center" />
              <el-table-column prop="uploadMan" label="安全高度(mm)" align="center" />
              <el-table-column prop="visitNum" label="安全容量(m3)" align="center" />
              <el-table-column prop="visitNum" label="装油高度(mm)" align="center" />
              <el-table-column prop="visitNum" label="油罐差压(Pa)" align="center" />
              <el-table-column prop="visitNum" label="查表体积(m3)" align="center" />
            </el-table>
          </div>
        </vue3-seamless-scroll>
      </div>
       
    </div>
  </div>
</template>

<script setup lang='ts'>
    import { style } from '@logicflow/extension/es/bpmn-elements/presets/icons';
import { onMounted, onUnmounted } from 'vue'
    import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

    // 模拟数据
const list = [
        {
          fileName: "每天开心笑一笑",
          uploadDate: "2021-11-18",
          fileSize: "8",
          uploadMan: "165",
          visitNum: "112",
        },
        {
          fileName: "每天开心笑一笑",
          uploadDate: "2021-11-18",
          fileSize: "8",
          uploadMan: "165",
          visitNum: "112",
        },
        {
          fileName: "每天开心笑一笑",
          uploadDate: "2021-11-18",
          fileSize: "8",
          uploadMan: "165",
          visitNum: "112",
        },

        {
          fileName: "每天开心笑一笑",
          uploadDate: "2021-11-18",
          fileSize: "8",
          uploadMan: "165",
          visitNum: "112",
        },
        {
          fileName: "每天开心笑一笑",
          uploadDate: "2021-11-18",
          fileSize: "8",
          uploadMan: "165",
          visitNum: "112",
        },
       
      ]

    const props = defineProps({
        refName: {
            type: Object,
            default: () => null
        }
    })

    //设置时间
    let timer: any = null;
    const scroll = () => {
        // console.log('props.refName:', props.refName.$refs);
        
        if(!props.refName) return
        // 在执行新的计时器前将之前的计时器清除
        if (timer) clearInterval(timer);
        let status = true;
        // 获取表格滚动区域的dom
        const scrollDom = props.refName?.$refs.bodyWrapper?.getElementsByClassName("el-scrollbar__wrap")[0];
        if(!scrollDom) return
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
                if ((scrollDom.scrollHeight - (scrollDom.clientHeight + scrollDom.scrollTop)) < 1 ) {
                    scrollDom.scrollTop = 0;
                }
            }
        //控制速度
        }, 20);
    }
  
    //设置定时器进行自滚动
    const getData = () => {
        setTimeout(() => {scroll()}, 5)
    }

    onMounted(() => {
        console.log('>>>', props.refName);
        
        // getData()
    })
    onUnmounted(() => {
        if (timer) clearInterval(timer);
        timer = null;
    })

</script>


<style scoped lang="scss">
     .seamless-warp {
        overflow: hidden;
        height: 100%;
        width: 100%;
        // .el-table{
        //   min-height: 100px;
        // }
        // &>div{
        //   height: 100% !important;
        //   &>div{
        //     height: 100%;
        //   }
        // }
        }
        .min {
        display: flex;
        width: 100%;
        }
        :deep.top .el-table__body-wrapper {
        display: none;
        }
        :deep.bottom .el-table__header-wrapper {
        // display: none;
        width: 100%;
        }
</style>