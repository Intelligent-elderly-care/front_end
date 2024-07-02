import { defineStore } from 'pinia'
import axios from '../plugins/axios'

const $axios = axios().provide.axios

export const useGeneralStore = defineStore('general', {
  state: () => ({
    id: '',
    name: '',
    isBackUrl: "/",
  }),
  actions: {
    bodySwitch(val) {
      if (val) {
        document.body.style.overflow = 'hidden'
        return
      }
      document.body.style.overflow = 'visible'
    },

    allLowerCaseNoCaps(str) {
      return str.split(' ').join('').toLowerCase()
    },

    setBackUrl(url) {
        this.isBackUrl = url
    },

    // 获取当前用户ID
    setUserId(id) {
      this.id = id;
    },

    // 获取当前用户名
    setUserName(name) {
      this.name = name;
    },

    // 用户注销用户
    logout() {
      this.name = '';
      this.id = '';
      localStorage.removeItem('token')
      delete $axios.defaults.headers.common['Authorization']
    } 
  },
  persist: true,
})