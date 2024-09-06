<template>
    <div>
        <input id='input' @change="changeHandle1" type='file' :accept="fileType[btnClickType]" style="opacity: 0;width: 0;">
        <el-row type="flex" gatter="10px" style="width: 100%;">
            <el-col :span="8">
                <!-- pdf -->
                <div class="profile">
                    <h4 class="name">PDF预览 <span style="font-weight: normal;font-size: 12px;color: #aaa;">（文档大小 小于 10Mb）</span></h4>
                    <div style="display: flex;">
                        <div class="actions" style="margin-right: 20px;">
                            <a href="javascript:;" class="btn file" @click="emitInputFn('pdf')">
                                选择PDF文件
                                
                            </a>
                        </div>
                        <div class="actions" v-if="isUpload">
                            <a href="javascript:;" class="btn file" @click="clearHandle">
                                清空
                            </a>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <!-- word -->
                <div class="profile">
                    <h4 class="name">WORD预览 <span style="font-weight: normal;font-size: 12px;color: #aaa;">（文档大小 小于 10Mb）</span></h4>
                    <div style="display: flex;">
                        <div class="actions" style="margin-right: 20px;">
                            <a href="javascript:;" class="btn file" @click="emitInputFn('word')">
                                选择WORD文件
                                <!-- <input id='word' @change="changeHandle2" type='file' accept=".doc, .docx"> -->
                            </a>
                        </div>
                        <div class="actions" v-if="isUpload">
                            <a href="javascript:;" class="btn file" @click="clearHandle">
                                清空
                            </a>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <!-- excel -->
                <div class="profile">
                    <h4 class="name">EXCEL预览 <span style="font-weight: normal;font-size: 12px;color: #aaa;">（文档大小 小于 10Mb）</span></h4>
                    <div style="display: flex;">
                        <div class="actions" style="margin-right: 20px;">
                            <a href="javascript:;" class="btn file" @click="emitInputFn('excel')">
                                选择EXCEL文件
                                <!-- <input id='excel' @change="changeHandle3" type='file' accept=".xlsx"> -->
                            </a>
                        </div>
                        <div class="actions" v-if="isUpload">
                            <a href="javascript:;" class="btn file" @click="clearHandle">
                                清空
                            </a>
                        </div>
                    </div>
                </div>
            </el-col>

            <el-col :span="24">
                <el-card style="width: 100%;height: 600px;display: flex">
                    <vue-office-docx :src="fileUrl" class="docx-viewer" v-if="fileUrl && btnClickType === 'word'" />
                    <vue-office-excel :src="fileUrl2"  class="docx-viewer" v-if="fileUrl2 && btnClickType === 'excel'" />
                    <vue-office-pdf :src="fileUrl3" class="docx-viewer"  v-if="fileUrl3 && btnClickType === 'pdf'" />
                </el-card>
            </el-col>
        </el-row>
    </div>
    
</template>

<script setup lang='ts'>
import VueOfficeDocx from '@vue-office/docx'
import VueOfficeExcel from '@vue-office/excel'
import VueOfficePdf from '@vue-office/pdf'
import '@vue-office/docx/lib/index.css'
import '@vue-office/excel/lib/index.css'
// import '@vue-office/pdf/lib/index.css'
import { ref, reactive, nextTick } from 'vue'

const fileUrl = ref<any>(null)
const fileUrl2 = ref<any>(null)
const fileUrl3 = ref<any>(null)
let isUpload = ref<boolean>(false)
const btnClickType = ref('')
const fileType = {
    word: '.doc,.docx',
    excel: '.xlsx',
    pdf: '.pdf'
}

function emitInputFn(type) {
    btnClickType.value = type
    nextTick(() => {
        clearHandle()
        let input = document.getElementById('input')
        input!.click()
    })
    
}

function clearHandle() {}
// 选择本地pdf文件
function changeHandle1(e) {
    var files = e.target.files; //获取到文件
    var fileSize = files[0].size;
    var mb:any;
    if (fileSize) {
        mb = fileSize / 1048576;
        if (mb > 10) {
            alert("文件大小不能>10M");
            return;
        }
    }

    let file = files[0]
    let fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = () => {
        if(btnClickType.value === 'word') {
            fileUrl.value = URL.createObjectURL(file)
        }else if(btnClickType.value === 'excel'){
            fileUrl2.value = URL.createObjectURL(file)
        }else if(btnClickType.value === 'pdf'){
            fileUrl3.value = URL.createObjectURL(file)
        }
        
        
    }
}

</script>

<style scoped lang="scss">

.profile {
    width: 300px;
    padding: 10px;
    border: 1px solid #eee;
    flex-shrink: 0;
    box-sizing: border-box;
    position: sticky;
    top: 0;
}

.img-content-wrap {
    margin-left: 20px;
    flex-shrink: 0;
}

.actions {
    .btn {
        display: block;
        width: 120px;
        height: 40px;
        text-decoration: none;
        color: #6c3f3f;
        text-align: center;
        line-height: 40px;
        background-image: linear-gradient(to right, rgba(0, 128, 128, 0.8), #fff8dc);

        &:hover {
            background-image: linear-gradient(to right, rgba(0, 128, 128, 0.8) 0%, rgba(0, 128, 128, 0.8) 90%);
            color: #fff;
        }
    }

    input {
        position: fixed;
        top: 0;
        right: 0;
        opacity: 0;
    }
}




</style>

<style>
    .docx-viewer {
        flex-grow: 1;
        width: 100%;
        height: 100%;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }
    .vue-office-docx{
        flex: 1 1 0%;
    }
    .vue-office-docx .docx-wrapper{
        padding: 10px;
    }
    .vue-office-docx .docx-wrapper>section.docx{
        width: 100% !important;
    }

    .vue-office-pdf-wrapper{
        width: 100%;
        padding: 10px !important;
    }
</style>


<style>
    .el-card__body{
        /* height: 100%; */
        width: 100%;
    }
</style>