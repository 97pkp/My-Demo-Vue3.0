import { defineStore } from 'pinia'
import router, { constantRoutes, asyncRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'

// const roles: any = localStorage.getItem('role') || ''

function hasPermission(roles: any, route: any) {
    if (route.meta && route.meta.auth) {
        return roles === route.meta.auth
    } else {
        return true
    }
}

const filterAsyncRouter = function (asyncRouterMap: any, roles: any) {
    const accessedRouters = asyncRouterMap.filter((item: any) => {
        if (hasPermission(roles, item)) {
            if (item.children && item.children.length) {
                item.children = filterAsyncRouter(item.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

export const useRouterConfig = defineStore('routerConfig', {
    state: () => {
        return {
            roles: '', // 用户包含的角色,
            permissions: [],  // 用户指定局部操作权限
            accessRoutes: <any>[], // 可访问路由集合
            routes: constantRoutes, // 所有路由集合
            // 静态用户信息
            users: [
                {
                    name: 'admin',
                    password: '123456',
                    auth: '管理员'
                },
                {
                    name: 'user',
                    password: '123456',
                    auth: '用户'
                }
            ],
        }
    },
    actions: {
        getPermissonRoutes() {
            alert(222)
            let accessedRoutes: Array<any> = []
            if (this.roles === 'admin') {
                accessedRoutes = asyncRoutes
            } else {
                accessedRoutes = filterAsyncRouter(asyncRoutes, this.roles)
            }
            router.isReady().then(() => {
                accessedRoutes.forEach((route: RouteRecordRaw) => {
                    const routeName: any = route.name
                    if (!router.hasRoute(routeName)) {
                        router.addRoute(route)
                    }
                })
                router.options.routes = constantRoutes.concat(accessedRoutes)
                this.accessRoutes = constantRoutes.concat(accessedRoutes)
                console.log('本地权限路由:', asyncRoutes);
                console.log('用户类型 管理员/用户:', this.roles);
                console.log("可访问路由集合:", this.accessRoutes)           // constantRoutes, // 可访问路由集合
            })
        },

    }
})