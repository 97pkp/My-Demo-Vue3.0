<template>
    <div> 低代码平台demo </div>
    <div style="display: flex;justify-content: space-between;">
        <div style="width: 200px;border: 1px dashed #ccc;float: left;">
            <draggable
                :list="state.list"
                ghost-class="ghost"
                chosen-class="chosenClass"
                animation="300"
                @start="onStart"
                @end="onEnd"
            >
                <template #item="{ element }">
                <div class="item">
                    {{ element.name }}
                </div>
                </template>
            </draggable>
            </div>
        </div>
        <div style="width: 500px;height: 500px;border: 1px dashed #ccc;float: left;">
            <draggable
                :list="tagList"
                ghost-class="ghost"
                chosen-class="chosenClass"
                animation="300"
                @start="onStart"
                @end="onEnd"
            >
                <template #item="{ element }">
                <div class="item">
                    {{ element.name }}
                </div>
                </template>
            </draggable>
        </div>
</template>

<script setup lang='ts'>
    import { ref, reactive } from 'vue'
    import draggable from "vuedraggable";
        const state = reactive({
        //需要拖拽的数据，拖拽后数据的顺序也会变化
        list: [
            { name: "www.itxst.com", id: 0 },
            { name: "www.baidu.com", id: 1 },
            { name: "www.google.com", id: 2 },
        ],
        });

    const tagList = ref([

    ])

    //拖拽开始的事件
    const onStart = () => {
    console.log("开始拖拽");
    };

    //拖拽结束的事件
    const onEnd = (val) => {
    console.log("结束拖拽");
    console.log(val);
    
    };
</script>

<style scoped>
.itxst {
  width: 600px;
  display: flex;
}
.itxst > div:nth-of-type(1) {
  flex: 1;
}
.itxst > div:nth-of-type(2) {
  width: 270px;
  padding-left: 20px;
}
.item {
  border: solid 1px #eee;
  padding: 6px 10px;
  text-align: left;
}

.item:hover {
  cursor: move;
}
.item + .item {
  margin-top: 10px;
}
.ghost {
  border: solid 1px rgb(19, 41, 239);
}
.chosenClass {
  background-color: #f1f1f1;
}
</style>