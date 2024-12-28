import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    images: [],
    returnRoute: '',
    touchScreenIndicator: false
  })
})
