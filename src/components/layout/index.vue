<template>
    <div class="page-wrapper">
        <Menu></Menu>
        <div class="main-wrapper">
            <div class="header">

            </div>
            <div class="main">
                <AppMain></AppMain>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Menu from "./Menu.vue"
import AppMain from "./AppMain.vue"

</script>

<style lang="scss" scoped>
    .page-wrapper{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background: #eee;
        display: flex;
        .main-wrapper{
            flex: 1;
            float: left;
            display: flex;
            flex-direction: column;
            .header{
                width: 100%;
                height: 50px;
                background-image: linear-gradient(to right, rgba(0, 128, 128, 0.8), #fff8dc);
            }
            .main{
                flex: 1;
                padding: 10px;
                background: #fff;
                overflow: auto;
                display: flex;
            }
        }
    }
</style>