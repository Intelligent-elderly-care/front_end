import { defineStore } from 'pinia';
import axios from '../plugins/axios'

const $axios = axios().provide.axios

export const usePageStore = defineStore('page', {
  state: () => ({
    currentPage: 'elderly', // 默认页面
  }),
  actions: {
    setPage(page) {
      this.currentPage = page;
    }
  },
  persist: true,
});
