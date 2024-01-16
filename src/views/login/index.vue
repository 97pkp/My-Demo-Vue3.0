<template>
    <div class="login-page">
        <div class="bg"></div>
        <div class="form_wrap">
            <h1>DEMO平台</h1>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm"
                status-icon>
                <el-form-item prop="name">
                    <el-input placeholder="用户名" v-model="ruleForm.name" style="width: 300px;" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="密码" v-model="ruleForm.password" style="width: 300px;" />
                </el-form-item>
                <el-form-item style="margin-bottom: 0;">
                    <el-button class="submit_btn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                </el-form-item>
                <el-form-item style="margin-bottom: 0;">
                    <p class="tip"><span @click="userFn(1)">管理员：admin/123456</span> &nbsp;&nbsp;&nbsp;&nbsp; <span @click="userFn(2)">普通用户：user/123456</span></p>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import { useRoute, useRouter } from "vue-router";
import { useRouterConfig } from "@/store/permission";
import { storeToRefs } from 'pinia'
const routerConfig = useRouterConfig()
const { users } = storeToRefs(routerConfig);
const systemUserList = users.value
const router = useRouter()

interface RuleForm {
    name: string
    password: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    name: '',
    password: '',
})

const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'change' }
    ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            let index = systemUserList.findIndex(item=>{
                return item.name === ruleForm.name
            })
            if(index < 0) {
                ElMessage.error('用户名不存在！')
            }else{
                if(systemUserList[index].password === ruleForm.password) {
                    routerConfig.$patch(state => {
                        state.roles = systemUserList[index].name
                        // localStorage.setItem('role', systemUserList[index].name)
                        // localStorage.setItem('token', 'THIS ID A TOKEN!')
                    })
                    routerConfig.getPermissonRoutes()
                    router.push('/')
                }else{
                    ElMessage.error('密码错误！')
                }
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}

const userFn = function(type) {
    if(type === 1) {
        ruleForm.name = 'admin'
        ruleForm.password = '123456'
    } else if (type === 2) {
        ruleForm.name = 'user'
        ruleForm.password = '123456'
    }
}

</script>

<style scoped lang="scss">
@keyframes bg-spin {
    to {
        --border-angle: 1turn;
    }
}

@property --border-angle {
    syntax: "<angle>";
    inherits: true;
    initial-value: 0turn;
}

.login-page {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    user-select: none;
    .bg {
        width: 110%;
        height: 110%;
        background: url(../../assets/login-bg.jpg) no-repeat left top;
        background-size: cover;
        filter: blur(2px);
        z-index: -1;
    }
    .form_wrap {
        width: 400px;
        height: 300px;
        background-color: #eee;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        text-align: center;
        // 边框特效
        --border-size: 3px;
        --border-angle: 0turn;
        background-image: conic-gradient(from var(--border-angle), #213, #112 50%, #213), conic-gradient(from var(--border-angle), transparent 20%, #08f, #f03);
        background-size: calc(100% - (var(--border-size) * 2)) calc(100% - (var(--border-size) * 2)), cover;
        background-position: center center;
        background-repeat: no-repeat;
        animation: bg-spin 6s linear infinite;

        h1 {
            margin: 60px 0 30px;
            color: #fff;
        }

        .demo-ruleForm {
            padding-left: 50px;
        }

        .submit_btn{
            background: transparent;
            width: 300px;
            border-radius: 0;
        }
        ::v-deep .el-input__wrapper {
            border-radius: 0;
            background: transparent;
        }
        .tip{
            margin: 0;
            width: 300px;
            color: rgba(255,255,255,.3);
            font-size: 12px;
            text-align: center;
        }
    }
}</style>