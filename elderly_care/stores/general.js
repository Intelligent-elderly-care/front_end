import { defineStore } from 'pinia'
import axios from '../plugins/axios'

const $axios = axios().provide.axios

export const useGeneralStore = defineStore('general', {
  state: () => ({
    selectedPost: null,
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

    async hasSessionExpired() {
        await $axios.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            // TODO:确认错误码
            switch (error.response.status) {
                case 401:
                case 419:
                case 503:
                    useUserStore().resetUser()
                    window.location.href = '/';
                    break;
                case 500:
                    alert('Oops, something went wrong!  The team has been notified.');
                    break;
                default:
                    return Promise.reject(error);
            }
          });
        },
    },
    persist: true,
})