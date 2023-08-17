<template>
    <div style="display: flex;">
      <!-- 原生js打印 -->
      <el-card class="box-card" style="width: calc(50% - 5px);margin-right: 10px;">
          <template #header>
              <h4 style="margin: 0;display: flex;justify-content: space-between;align-items: center;">
                <span>原生js打印</span>
                <el-button type="primary" class="button" @click="printFn">打印</el-button>
              </h4>
          </template>
          <el-card class="box-card">
              <h6 style="margin: 0;padding: 10px;background-color: #eee;">
                Tip:通过原生js，获取需要打印的DOM元素(or js拼接DOM字符串)，通过dom对象调用打印机;
                <p>
                  let dom = HTML DOM <br>
                  var newWin = window.open(); <br>
                  newWin!.document.write(dom) <br>
                  newWin!.document.location.reload(); <br>
                  newWin!.document.body.style.margin = '0px' <br>
                  newWin!.document.body.style.width = '100%' <br>
                  newWin!.document.body.style.padding = '0px' <br>
                  newWin!.print(); <br>
                  newWin!.close(); 
                </p>
              </h6>
          </el-card>
        </el-card>
        <!-- vue-print-nb插件打印 -->
        <!-- 
          1.npm install vue-print-nb --save
          2.main.js引入
            import Print from 'vue-print-nb'
            Vue.use(Print)
          3.在组件的打印区域标签上加 id="printArea"
            <div id="printArea"> 打印区域 <div>
          4.在组件的打印按钮标签上使用指令 v-print="print",print是配置对象
            <el-button v-print="print" type="primary">打印</el-button>
          5.在组件的data中定义print配置对象
              print: {
                id: 'printArea',
                popTitle: '打印', // 打印配置页上方标题
                extraHead: '', //最上方的头部文字，附加在head标签上的额外标签,使用逗号分隔
                preview: '', // 是否启动预览模式，默认是false（开启预览模式，可以先预览后打印）
                previewTitle: '', // 打印预览的标题（开启预览模式后出现）,
                previewPrintBtnLabel: '', // 打印预览的标题的下方按钮文本，点击可进入打印（开启预览模式后出现）
                zIndex: '', // 预览的窗口的z-index，默认是 20002（此值要高一些，这涉及到预览模式是否显示在最上面）   
                previewBeforeOpenCallback() {}, //预览窗口打开之前的callback（开启预览模式调用）
                previewOpenCallback() {}, // 预览窗口打开之后的callback（开启预览模式调用）
                beforeOpenCallback() {}, // 开启打印前的回调事件
                openCallback() {}, // 调用打印之后的回调事件
                closeCallback() {}, //关闭打印的回调事件（无法确定点击的是确认还是取消）
                url: '',
                standard: '',
                extraCss: '',
              }
         -->
        <el-card class="box-card" style="width: calc(50% - 5px);">
            <template #header>
                <h4 style="margin: 0;display: flex;justify-content: space-between;align-items: center;">
                  <span>vue-print-nb 插件打印</span>
                  <el-button type="primary" class="button" v-print="print">打印</el-button>
                </h4>
            </template>
            <el-card class="box-card">
                <h6 style="margin: 0;padding: 10px;background-color: #eee;">
                  Tip:Vue2.0: vue-print-nb; Vue3.0: vue3-print-nb;
                </h6>
                <div id="printArea">
                  <div style="page-break-after:always;text-align: center;font-family: 黑体;">
                      <div style="width: 100%;">
                          <p style="margin: 90px 0 4px;font-size: 33px;font-weight: 600;">皮卡丘</p>
                          <p style="margin: 0;border-bottom: thin dotted"></p>
                          <p style="margin: 12px 0 14px;font-size: 17px;">13266666666</p>
                      </div>
                      <div style="display: inline-block;text-align: left;">
                          <p style="margin: 0 0 10px;font-size: 13px;"><lebal style="width: 80px;text-align: justify;text-align-last: justify;display: inline-block;" lang="zh">访问区域：</lebal>总部大楼</p>
                          <p style="margin: 0 0 10px;font-size: 13px;"><lebal style="width: 80px;text-align: justify;text-align-last: justify;display: inline-block;" lang="zh">被访者信息：</lebal>666666</p>
                          <p style="margin: 0 0 10px;font-size: 13px;"><lebal style="width: 80px;text-align: justify;text-align-last: justify;display: inline-block;" lang="zh">来访日期：</lebal>2023-03-08</p>
                          <p style="margin: 0 0 10px;font-size: 13px;"><lebal style="width: 80px;text-align: justify;text-align-last: justify;display: inline-block;" lang="zh">有效期至：</lebal>2023-03-08</p>
                      </div>
                  </div>
                  <div style="page-break-after:always;text-align: center;font-family: 黑体;">
                      <div style="width: 100%;">
                          <p style="margin: 90px 0 4px;font-size: 33px;font-weight: 600;">皮卡丘</p>
                          <p style="margin: 0;border-bottom: thin dotted"></p>
                          <p style="margin: 12px 0 14px;font-size: 17px;">13266666666</p>
                      </div>
                      <div style="display: inline-block;text-align: left;">
                          <p style="margin: 0 0 10px;font-size: 13px;"><lebal style="width: 80px;text-align: justify;text-align-last: justify;display: inline-block;" lang="zh">访问区域：</lebal>总部大楼</p>
                          <p style="margin: 0 0 10px;font-size: 13px;"><lebal style="width: 80px;text-align: justify;text-align-last: justify;display: inline-block;" lang="zh">被访者信息：</lebal>666666</p>
                          <p style="margin: 0 0 10px;font-size: 13px;"><lebal style="width: 80px;text-align: justify;text-align-last: justify;display: inline-block;" lang="zh">来访日期：</lebal>2023-03-08</p>
                          <p style="margin: 0 0 10px;font-size: 13px;"><lebal style="width: 80px;text-align: justify;text-align-last: justify;display: inline-block;" lang="zh">有效期至：</lebal>2023-03-08</p>
                      </div>
                  </div>
                </div>
            </el-card>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
const print = ref({
    id: 'printArea',
    popTitle: '打印', // 打印配置页上方标题
    extraHead: '', //最上方的头部文字，附加在head标签上的额外标签,使用逗号分隔
    preview: '', // 是否启动预览模式，默认是false（开启预览模式，可以先预览后打印）
    previewTitle: '', // 打印预览的标题（开启预览模式后出现）,
    previewPrintBtnLabel: '', // 打印预览的标题的下方按钮文本，点击可进入打印（开启预览模式后出现）
    zIndex: '', // 预览的窗口的z-index，默认是 20002（此值要高一些，这涉及到预览模式是否显示在最上面）   
    previewBeforeOpenCallback() {}, //预览窗口打开之前的callback（开启预览模式调用）
    previewOpenCallback() {}, // 预览窗口打开之后的callback（开启预览模式调用）
    beforeOpenCallback() {}, // 开启打印前的回调事件
    openCallback() {}, // 调用打印之后的回调事件
    closeCallback() {}, //关闭打印的回调事件（无法确定点击的是确认还是取消）
    url: '',
    standard: '',
    extraCss: '',
  })
function printFn() {
    /**
     * page-break-after:always;该属性使区域内容在新页面进行打印，实现分页打印功能
     */
    let dom = `
        <div style="page-break-after:always;text-align: center;font-family: 黑体;">
          <div style="width: 100%;">
            <p style="margin: 90px 0 4px;font-size: 33px;font-weight: 600;">皮卡丘</p>
            <p style="margin: 0;border-bottom: thin dotted"></p>
            <p style="margin: 12px 0 14px;font-size: 17px;">13266666666</p>
          </div>
          <div style="display: inline-block;text-align: left;">
            <p style="margin: 0 0 10px;font-size: 13px;"><lebal style="width: 80px;text-align: justify;text-align-last: justify;display: inline-block;" lang="zh">访问区域：</lebal>总部大楼</p>
            <p style="margin: 0 0 10px;font-size: 13px;"><lebal style="width: 80px;text-align: justify;text-align-last: justify;display: inline-block;" lang="zh">被访者信息：</lebal>666666</p>
            <p style="margin: 0 0 10px;font-size: 13px;"><lebal style="width: 80px;text-align: justify;text-align-last: justify;display: inline-block;" lang="zh">来访日期：</lebal>2023-03-08</p>
            <p style="margin: 0 0 10px;font-size: 13px;"><lebal style="width: 80px;text-align: justify;text-align-last: justify;display: inline-block;" lang="zh">有效期至：</lebal>2023-03-08</p>
          </div>
        </div>` +
        `
        <div style="page-break-after:always;text-align: center;font-family: 黑体;">
          <div style="width: 100%;">
            <p style="margin: 90px 0 4px;font-size: 33px;font-weight: 600;">皮卡丘</p>
            <p style="margin: 0;border-bottom: thin dotted"></p>
            <p style="margin: 12px 0 14px;font-size: 17px;">13266666666</p>
          </div>
          <div style="display: inline-block;text-align: left;">
            <p style="margin: 0 0 10px;font-size: 13px;"><lebal style="width: 80px;text-align: justify;text-align-last: justify;display: inline-block;" lang="zh">访问区域：</lebal>总部大楼</p>
            <p style="margin: 0 0 10px;font-size: 13px;"><lebal style="width: 80px;text-align: justify;text-align-last: justify;display: inline-block;" lang="zh">被访者信息：</lebal>666666</p>
            <p style="margin: 0 0 10px;font-size: 13px;"><lebal style="width: 80px;text-align: justify;text-align-last: justify;display: inline-block;" lang="zh">来访日期：</lebal>2023-03-08</p>
            <p style="margin: 0 0 10px;font-size: 13px;"><lebal style="width: 80px;text-align: justify;text-align-last: justify;display: inline-block;" lang="zh">有效期至：</lebal>2023-03-08</p>
          </div>
        </div>`

      var newWin = window.open();
      newWin!.document.write(dom)
      newWin!.document.location.reload();
      newWin!.document.body.style.margin = '0px'
      newWin!.document.body.style.width = '100%'
      newWin!.document.body.style.padding = '0px'
      newWin!.print();
      newWin!.close();
}
function dialogVisible() {}
</script>

<style></style>