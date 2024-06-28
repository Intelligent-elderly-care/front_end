// stores/pageStore.js
import { defineStore } from 'pinia';

export const usePageStore = defineStore('page', {
  state: () => ({
    currentPage: 'elderly', // 默认页面
  }),
  actions: {
    setPage(page) {
      this.currentPage = page;
    }
  }
});
