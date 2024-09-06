<!-- <template>
    <div>333</div>
</template> -->

<template>
    <div style="display: flex;align-items: flex-start;position: relative;flex-wrap: wrap;">
        <!-- pdf -->
        <div class="profile">
            <h4 class="name">PDF转图片 <span style="font-weight: normal;font-size: 12px;color: #aaa;">（文档大小 小于 10Mb）</span></h4>
            <div style="display: flex;">
                <div class="actions" style="margin-right: 20px;">
                    <a href="javascript:;" class="btn file" @click="emitInputFn('pdf')">
                        选择PDF文件
                        <input id='pdf' @change="changeHandle1" type='file' accept="application/pdf">
                    </a>
                </div>
                <div class="actions" v-if="isUpload">
                    <a href="javascript:;" class="btn file" @click="clearHandle('pdf')">
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
        <!-- word -->
        <div class="profile">
            <h4 class="name">WORD转图片 <span style="font-weight: normal;font-size: 12px;color: #aaa;">（文档大小 小于 10Mb）</span></h4>
            <div style="display: flex;">
                <div class="actions" style="margin-right: 20px;">
                    <a href="javascript:;" class="btn file" @click="emitInputFn('word')">
                        选择WORD文件
                        <input id='word' @change="changeHandle2" type='file' accept=".doc, .docx">
                    </a>
                </div>
                <div class="actions" v-if="isUpload">
                    <a href="javascript:;" class="btn file" @click="clearHandle('word')">
                        清空
                    </a>
                </div>
            </div>

            <div class="stats" v-if="isUpload">
                <el-descriptions :column="1" class="file-info">
                    <el-descriptions-item label="文件名称">{{ pdfInfo.fileName }}</el-descriptions-item>
                    <el-descriptions-item label="文件大小">{{ pdfInfo.fileSize }}</el-descriptions-item>
                    <el-descriptions-item label="WORD页数">{{ pdfInfo.pageNum }}</el-descriptions-item>
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


            <el-card>
                <vue-office-docx :src="fileUrl"/>
                <vue-office :src="fileUrl" />
            </el-card>
        </div>

        <el-card class="img-content-wrap" style="width: 500px;">
            <!-- <img :src="imageUrl" alt="word-content-preview" width="500"/> -->
            <div v-for="(image, index) in imageUrl" :key="index">
                <img :src="image" :alt="'Page ' + (index + 1)" width="100%" class="page-image" />
            </div>
            <div id="imgDiv"></div>
            
        </el-card>
        
    </div>
</template>

<script setup lang='ts'>
import VueOffice from 'vue-office';
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'
import { ref, reactive } from 'vue'

import mammoth from 'mammoth';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import PizZip from "pizzip";

import Docxtemplater from 'docxtemplater'

// import * as pdfjsLib from 'pdfjs-dist/build/pdf.js';
// pdfjsLib.PDFJS.workerSrc = 'pdf.worker.min.js'

// import * as pdfjsLib from 'pdfjs-dist';
// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
// pdfjsLib.GlobalWorkerOptions.workerSrc = '../../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs';


import * as pdfjsLib from 'pdfjs-dist'
// import pdfjsWorker from '../../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs'
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.6.82'
// pdfjsLib.GlobalWorkerOptions.workerSrc = `../../../node_modules/pdfjs-dist/build/pdf.worker.mjs`;



import JSZip from 'jszip';
import FileSaver from 'file-saver';
const pdfInfo = reactive({
    fileName: '',
    fileSize: '',
    pageNum: '',
    startCurrent: '',
    endCurrent: ''
})
const fileUrl = ref<any>(null)
let isUpload = ref<boolean>(false)
const concatPage = ref(false)
const zip = new JSZip();
const imageUrl = ref<any>([])

function emitInputFn(type) {
    if(type === 'pdf'){
        clearHandle()
        let input = document.getElementById('pdf')
        input!.click()
    }else if(type === 'word'){
        clearHandle()
        let input = document.getElementById('word')
        input!.click()
    }
    
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
function changeHandle1(e) {
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
    reader.onload = async function (event) {
        const typedarray = new Uint8Array(files[0]);
debugger
console.log(pdfjsLib.getDocument(typedarray).promise);

const pdfDoc = await pdfjsLib.getDocument(typedarray).promise
const page = await pdfDoc.getPage(1);
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        console.log(page, 'page');
        console.log(viewport, 'viewport');
        
        return


pdfjsLib.getDocument(typedarray).promise.then(function(pdfDoc) {
      const pdfContainer = document.getElementById('imgDiv');
      pdfContainer.innerHTML = ''; // Clear previous renders if any
      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        pdfDoc.getPage(pageNum).then(function(page) {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const viewport = page.getViewport({ scale: 1 });

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          page.render({ canvasContext: context, viewport: viewport }).promise.then(function() {
            const img = document.createElement('img');
            img.src = canvas.toDataURL();
            pdfContainer.appendChild(img);
          });
        });
        console.log(111);
        
      }
    });



// console.log('>>>', pdfjsLib.getDocument(URL.createObjectURL(files[0])));

//         pdfjsLib.getDocument(URL.createObjectURL(files[0])).promise.then(async (pdf) => {
//             console.log(pdf, 'pdf...>>');
//             debugger
//             if (pdf) {
//                 let pageNum = pdf.numPages;
//                 pdfInfo.fileName = files[0].name
//                 pdfInfo.fileSize = files[0].size
//                 pdfInfo.pageNum = pageNum.toString()
//                 isUpload.value = true
//                 for (var i = 1; i <= pageNum; i++) {
//                     var canvas = document.createElement('canvas');
//                     canvas.id = "pageNum" + i;
//                     imgDiv!.appendChild(canvas)
//                     var context = canvas.getContext('2d');
//                     openPage(pdf, i, context);
//                 }
//             }
//             // 解决选择同一个文件，无法触发change事件的问题
//             e.target.value = null
//         }).catch(err => {
//             alert(23456)
//         })
        // const pdf = await pdfjsLib.getDocument(URL.createObjectURL(files[0])).promise;
        // console.log(pdf, 'pdf...');
        
        // const page = await pdf.getPage(1);
        // const scale = 1.5;
        // const viewport = page.getViewport({ scale });

        // const canvas = document.createElement('canvas');
        // const context = canvas.getContext('2d');
        // canvas.height = viewport.height;
        // canvas.width = viewport.width;

        // const renderContext = {
        //     canvasContext: context,
        //     viewport: viewport,
        // };
        // await page.render(renderContext).promise;

        // const image = canvas.toDataURL('image/png');
        // return image;

        // document.getElementById('imgDiv').src = image;


        
        // pdfjsLib.getDocument(URL.createObjectURL(files[0])).then(function (pdf) { //PDF转换为canvas
        //     if (pdf) {
        //         let pageNum = pdf.numPages;
        //         pdfInfo.fileName = files[0].name
        //         pdfInfo.fileSize = files[0].size
        //         pdfInfo.pageNum = pageNum
        //         isUpload.value = true
        //         for (var i = 1; i <= pageNum; i++) {
        //             var canvas = document.createElement('canvas');
        //             canvas.id = "pageNum" + i;
        //             imgDiv!.appendChild(canvas)
        //             var context = canvas.getContext('2d');
        //             openPage(pdf, i, context);
        //         }
        //     }
        //     // 解决选择同一个文件，无法触发change事件的问题
        //     e.target.value = null
        // }).catch(()=>{
        //     e.target.value = null
        // });
    };
}


// const loadWord = (arrayBuffer) => {
//   return mammoth.convertToHtml({ arrayBuffer: arrayBuffer }).then((result) => {
//     const htmlString = result.value;
//     const container = document.createElement('div');
//     container.innerHTML = htmlString;
//     document.body.appendChild(container);

//     // 使用 html2canvas 将 HTML 转换为图片
//     return html2canvas(container).then((canvas) => {
//       const image = canvas.toDataURL('image/png');
//       return image;
//     });
//   });
// };


async function calculatePageCount(content) {
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      // pseudo code: you need to analyze and calculate pages.
      // It might work with dividing text length with some value.
      // For example, you could consider every 2000 characters as a new page.
      const textContent = doc.getFullText();
      const pageApproxChars = 2000;
      return Math.ceil(textContent.length / pageApproxChars);
    }


async function convertHtmlToImage(htmlContent) {
      const container = document.createElement('div');
      container.innerHTML = htmlContent;
      document.body.appendChild(container);
      try {
        const dataUrl = await toPng(container);
        imageUrl.value = dataUrl;
        // Optional: Save the image
        // saveAs(dataUrl, 'word-content.png');
      } catch (error) {
        console.error('Error converting HTML to image:', error);
      } finally {
        document.body.removeChild(container);
      }
    }

    async function convertHtmlToImagesByPage(htmlContent) {
        console.log('htmlContent:', htmlContent);
        
        imageUrl.value = [];
      const pages = htmlContent.split('<div style="page-break-after: always"></div>'); // 假设有分页符
      for (const pageHtml of pages) {
        const container = document.createElement('div');
        container.innerHTML = pageHtml;
        document.body.appendChild(container);
        try {
          const dataUrl = await toPng(container);
          imageUrl.value.push(dataUrl);
          console.log('>>>>', imageUrl.value);
          
        } catch (error) {
          console.error('Error converting HTML to image:', error);
        } finally {
          document.body.removeChild(container);
        }
      }
    }



// 选择本地word文件
async function changeHandle2(e) {
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


    // const file = files[0];
    // if (file) {
    //     fileUrl.value = URL.createObjectURL(file); // 将文件转换为 URL
    // }


    

    let file = files[0]
    let fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)
    console.log(fileReader);
    console.log(URL.createObjectURL(file));
    
    
    fileReader.onload = async() => {
        // fileUrl.value = URL.createObjectURL(file)
        // e.target.result
       const arrayBuffer = fileReader.result
       const result = await mammoth.convertToHtml({arrayBuffer});
        const htmlContent = result.value;
        // convertHtmlToImage(htmlContent);
        convertHtmlToImagesByPage(htmlContent)

        const pageContent = await calculatePageCount(arrayBuffer)


console.log('页数：', pageContent)

    }





    
    // let reader = new FileReader();
    // reader.readAsArrayBuffer(files[0]);
    // reader.onload = (loadEvent) => {
    //     let arrayBuffer = loadEvent.target.result;
    //     fileUrl.value = arrayBuffer
    // };


    // /*pdf.js无法直接打开本地文件,所以利用FileReader转换*/
    // var reader = new FileReader();
    
    // reader.readAsArrayBuffer(files[0]);
    // reader.onload = async function (event) {



    // let reader = new FileReader();
    // reader.readAsArrayBuffer(file);
    // reader.onload = (loadEvent) => {
    //     let arrayBuffer = loadEvent.target.result;
    //     this.src = arrayBuffer
    // };
    // return false


    
    //     console.log('>>>>', event);
        
    //     const arrayBuffer = reader.result;
    //     // loadWord(arrayBuffer).then((image) => {
    //     //     document.getElementById('imgDiv').src = image;
    //     // });

return
    // const arrayBuffer = reader.result;
        // loadWord(arrayBuffer).then((image) => {
        // document.getElementById('word-image').src = image;
    // });

//         const typedarray = new Uint8Array(files[0]);
// debugger
// console.log(pdfjsLib.getDocument(typedarray).promise);

// const pdfDoc = await pdfjsLib.getDocument(typedarray).promise
// const page = await pdfDoc.getPage(1);
//         const scale = 1.5;
//         const viewport = page.getViewport({ scale });

//         console.log(page, 'page');
//         console.log(viewport, 'viewport');
        
//         return


// pdfjsLib.getDocument(typedarray).promise.then(function(pdfDoc) {
//       const pdfContainer = document.getElementById('imgDiv');
//       pdfContainer.innerHTML = ''; // Clear previous renders if any
//       for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
//         pdfDoc.getPage(pageNum).then(function(page) {
//           const canvas = document.createElement('canvas');
//           const context = canvas.getContext('2d');
//           const viewport = page.getViewport({ scale: 1 });

//           canvas.height = viewport.height;
//           canvas.width = viewport.width;

//           page.render({ canvasContext: context, viewport: viewport }).promise.then(function() {
//             const img = document.createElement('img');
//             img.src = canvas.toDataURL();
//             pdfContainer.appendChild(img);
//           });
//         });
//         console.log(111);
        
//       }
//     });

//     };
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
function dataURLtoBlob(dataurl:any) {
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
    position: sticky;
    top: 0;
}

.img-content-wrap {
    width: 100%;
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