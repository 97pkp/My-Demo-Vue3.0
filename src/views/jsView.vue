<template>
    <div>
        <el-card>
            冒泡排序:
            <el-row>
                <el-input v-model="arrData" placeholder="输入数据，逗号分隔" style="width: 300px;"></el-input>
                <el-button @click="clickHandle1">获取排序</el-button>
            </el-row>
            <el-row>排序输出：{{ stateData.newData }}</el-row>
        </el-card>
        <el-card>
            div变成双色圆：
            <div class="div2circle1"></div>
            <div class="div2circle2"></div>
        </el-card>
        <el-card>
            数组去重：
            <el-row>
                <el-input v-model="arrData2" placeholder="输入数据，逗号分隔" style="width: 300px;"></el-input>
                <el-button @click="clickHandle2">去重</el-button>
            </el-row>
            <el-row>去重输出ES5：{{ stateData.es5Data }}</el-row>
            <el-row>去重输出ES6：{{ stateData.es6Data }}</el-row>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

let arrData = ref<String>('')
let arrData2 = ref<String>('')
let stateData = reactive({
    newData: [],
    es5Data: [],
    es6Data: []
})

function paopao(arr) {
    let temp
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j + 1]
                arr[j + 1] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}

function clickHandle1() {
    let list = arrData.value.split(',').map((v) => Number(v))
    stateData.newData = paopao(list)
}
function clickHandle2() {
    let arr = arrData2.value.split(',').map((v) => v)
    let _a1 = quchongES5(arr)
    let _a2 = quchongES6(arr)
    stateData.es5Data = _a1
    stateData.es6Data = _a2
}
// es5去重
function quchongES5(arr) {
    let _arr:any = []
    arr.forEach(v => {
        if(_arr.indexOf(v) < 0) {
            _arr.push(v)
        }
    });
    return _arr
}
// es6去重
function quchongES6(arr) {
    let _arr:any = Array.from(new Set(arr))
    return _arr
}
</script>

<style scoped>
.div2circle1 {
    margin: 10px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
}

.div2circle1::after {
    content: ' ';
    display: block;
    width: 50px;
    height: 100%;
    background-color: yellowgreen;
    float: left;
}

.div2circle1::before {
    content: ' ';
    display: block;
    width: 50px;
    height: 100%;
    background-color: goldenrod;
    float: left;
}

.div2circle2 {
    margin: 10px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
    background: linear-gradient(to right, green 50%, blue 50%);
}
</style>