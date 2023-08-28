<template>
    <div style="display: flex;align-items: flex-start;">
        <div class="profile">
            <h4 class="name">PDF转图片 <span style="font-weight: normal;font-size: 12px;color: #aaa;">（文档大小 小于 10Mb）</span></h4>
            <div style="display: flex;">
                <div class="actions" style="margin-right: 20px;">
                    <a href="javascript:;" class="btn file" @click="emitInputFn">
                        选择PDF文件
                        <input id='pdf' @change="changeHandle" type='file' accept="application/pdf">
                    </a>
                </div>
                <div class="actions" v-if="isUpload">
                    <a href="javascript:;" class="btn file" @click="clearHandle">
                        清空
                    </a>
                </div>
            </div>

            <div class="stats" v-if="isUpload">
                <el-descriptions :column="1" class="file-info">
                    <el-descriptions-item label="文件名称">{{ pdfInfo.fileName }}</el-descriptions-item>
                    <el-descriptions-item label="文件大小">{{ pdfInfo.fileSize }}</el-descriptions-item>
                    <el-descriptions-item label="PDF页数">{{ pdfInfo.pageNum }}</el-descriptions-item>
                </el-descriptions>
                <div class="actions">
                    <a href="javascript:;" class="btn file" @click="exportHandle">
                        导出图片
                    </a>
                </div>
                <div class="box allPage">
                    <el-checkbox v-model="concatPage" label="合并为整张图" size="large" />
                    <el-input v-model="pdfInfo.startCurrent" type="number" :min="0" :max="pdfInfo.pageNum"
                        placeholder="Please input" style="margin-bottom: 10px;">
                        <template #prepend>开始页码</template>
                    </el-input>
                    <el-input v-model="pdfInfo.endCurrent" type="number" :min="pdfInfo.startCurrent" :max="pdfInfo.pageNum"
                        placeholder="Please input">
                        <template #prepend>结束页码</template>
                    </el-input>
                </div>
            </div>
        </div>
        <el-card class="img-content-wrap">
            <div id="imgDiv"></div>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import * as pdfjsLib from 'pdfjs-dist/build/pdf.js';
pdfjsLib.PDFJS.workerSrc = 'pdf.worker.min.js'

import JSZip from 'jszip';
import FileSaver from 'file-saver';
const pdfInfo = reactive({
    fileName: '',
    fileSize: '',
    pageNum: '',
    startCurrent: '',
    endCurrent: ''
})

let isUpload = ref<boolean>(false)
const concatPage = ref(false)
const zip = new JSZip();

function emitInputFn() {
    clearHandle()
    let input = document.getElementById('pdf')
    input!.click()
}

function clearHandle() {
    let imgDiv = document.getElementById('imgDiv')
    imgDiv!.innerHTML = ''
    pdfInfo.fileName = ''
    pdfInfo.fileSize = ''
    pdfInfo.pageNum = ''
    pdfInfo.startCurrent = ''
    pdfInfo.endCurrent = ''
    isUpload.value = false
    concatPage.value = false
} 

// 选择本地pdf文件
function changeHandle(e) {
    let imgDiv = document.getElementById('imgDiv')
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
    /*pdf.js无法直接打开本地文件,所以利用FileReader转换*/
    var reader = new FileReader();
    reader.readAsArrayBuffer(files[0]);
    reader.onload = function (event) {
        pdfjsLib.getDocument(URL.createObjectURL(files[0])).then(function (pdf) { //PDF转换为canvas
            if (pdf) {
                let pageNum = pdf.numPages;
                pdfInfo.fileName = files[0].name
                pdfInfo.fileSize = files[0].size
                pdfInfo.pageNum = pageNum
                isUpload.value = true
                for (var i = 1; i <= pageNum; i++) {
                    var canvas = document.createElement('canvas');
                    canvas.id = "pageNum" + i;
                    imgDiv!.appendChild(canvas)
                    var context = canvas.getContext('2d');
                    openPage(pdf, i, context);
                }
            }
            // 解决选择同一个文件，无法触发change事件的问题
            e.target.value = null
        }).catch(()=>{
            e.target.value = null
        });
    };
}

function openPage(pdfFile, pageNumber, context) {
    var scale = 2; // 数值越大图片越大，显示越清晰
    pdfFile.getPage(pageNumber).then(function (page) {
        let viewport = page.getViewport(scale); // reference canvas via context
        var canvas = context.canvas;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.border = "1px solid #CA7C4E";
        canvas.style.borderRadius = "10px";
        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
    });
    return;
}

// 导出图片
function exportHandle() {
    if (concatPage.value) {
        // 合并为一张导出
        let height = 0
        let context:any = null
        let mainCanvas: any = null

        let scale = 2; //b：整图缩放倍数
        let canvasDoms = document.getElementsByTagName('canvas')
        let canvasList = [...canvasDoms]

        let count = canvasList.length;
        canvasList.forEach((item, index) => {
            let canvas:any = document.getElementById("pageNum" + (index + 1));
            if (canvas) {
                if (index == 0) {
                    mainCanvas = document.createElement('canvas');
                    context = mainCanvas.getContext('2d');
                    mainCanvas.width = canvas.width / scale;
                    mainCanvas.height = canvas.height / scale * count;
                    context!.drawImage(canvas, 0, 0, canvas.width / scale, canvas.height / scale);
                } else {
                    context.drawImage(canvas, 0, height, canvas.width / scale, canvas.height / scale);
                }
                height += canvas.height / scale;
            }
        })
        if (mainCanvas) {
            zip.file("image.png", dataURLtoBlob(mainCanvas.toDataURL("image/png", 1.0)), {
                base64: true
            });
            // 或者自动下载为png
            // var oA = document.createElement("a");
            // oA.download = '';
            // oA.href = mainCanvas.toDataURL();
            // document.body.appendChild(oA);
            // oA.click();
            // oA.remove();
        }
    } else {
        // 分页导出
        let canvasDoms = document.getElementsByTagName('canvas')
        let canvasList = [...canvasDoms]
        let images = zip.folder("images");
        canvasList.forEach((item, index) => {
            let idx = index + 1;
            let canvas:any = document.getElementById("pageNum" + idx);

            let startIdx = pdfInfo.startCurrent
            let endIdx = pdfInfo.endCurrent
            if ((startIdx && parseInt(startIdx) > idx) || (endIdx && parseInt(endIdx) < idx)) {
                return true;
            }
            images!.file("image-" + idx + ".png", dataURLtoBlob(canvas!.toDataURL("image/png", 1.0)), {
                base64: true
            });
        })
    }
    zip.generateAsync({
        type: "blob"
    }).then(function (content) {
        FileSaver(content, "pdftoimages.zip");
    });
}

//dataURL转成Blob
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}


</script>

<style scoped lang="scss">
#imgDiv {
    margin: 0 auto;
    width: 650px;
    min-height: 750px;
    border-radius: 10px;
    text-align: center;

    canvas {
        width: 50%;
        height: 50%;
        border-radius: 10px;
        border: 1px solid #CA7C4E;
        margin: 10px;
    }
}

.profile {
    width: 300px;
    padding: 10px;
    border: 1px solid #eee;
    flex-shrink: 0;
    box-sizing: border-box;
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
    .file-info {
        padding-top: 10px;
        background-color: #eee;
        margin: 10px 0;
    }
    .el-descriptions__body{
        background-color: #eee;
    }
</style>