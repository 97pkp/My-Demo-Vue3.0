import { defineStore } from 'pinia'
export const useConfigStore = defineStore('ConfigStore', {
  state: () => {
    return {
      title: 'My-Project', // 标题
      isOpen: true, // 是否展开菜单栏
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