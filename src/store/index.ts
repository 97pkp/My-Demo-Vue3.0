import { defineStore } from 'pinia'
export const useConfigStore = defineStore('ConfigStore', {
  state: () => {
    return {
      title: 'My-Project',
      isOpen: true
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