import { defineStore } from 'pinia';
// import axios from '../plugins/axios'
import axios from 'axios'

// const $axios = axios().provide.axios

export const useElderlyStore = defineStore('elderly', {
  state: () => ({
    elderly: []
  }),
  actions: {
    // 查询所有老人信息
    async fetchAllData() {
        try {
            // const url = 'http://localhost:9000/oldpersons/findAll'
            // const token = localStorage.getItem('token');
            const response = await axios.get("/oldpersons/findAll");
            console.log("response:"+response)
            if (response && response.data && response.data.data) {
            const elderlies = response.data.data
            this.$state.elderly = elderlies.map(elder => ({
                id: elder.id,
                name: elder.name,
                gender: elder.gender,
                phone: elder.phone,
                checkin_date: elder.checkin_date,
                checkout_date: elder.checkin_date,
                health_state: elder.health_state,
                imgSetDir: elder.imgset_dir,
                description: elder.description
                }));
          } else {
            console.error('Unexpected response structure:', response);
          }
        } catch (error) {
          console.error('Error fetching all data:', error);
        }
      }
    },
    persist: true,
});
