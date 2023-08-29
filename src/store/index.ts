import { defineStore } from 'pinia'
export const useConfigStore = defineStore('ConfigStore', {
  state: () => {
    return {
      title: 'My-Project', // 标题
      isOpen: true, // 是否展开菜单栏
      // 静态用户信息
      users: [
        {
          name: 'admin',
          password: '123456',
          auth: '系统管理员'
        },
        {
          name: 'user',
          password: '123456',
          auth: '普通用户'
        }
      ],
      auth: ''
    }
  },
  getters: {
    // isOpen: (state) => state.isOpen,
    // otherTitle: (state) => state.title + 'mmm'
  },
  actions: {
    updateIsOpen(data: boolean) {
      this.isOpen = data
    }
  }
})