import { defineStore } from 'pinia';
import axios from '../plugins/axios'

const $axios = axios().provide.axios

export const useElderlyStore = defineStore('elderly', {
  state: () => ({
    elderly: []
  }),
  actions: {
    // 查询所有老人信息
    async fetchAllData() {
      try {
          const response = await $axios.get("/oldpersons/findAll");
          if (response && response.data && response.data.data) {
              const elderlies = response.data.data
              this.$state.elderly = elderlies.map(elder => ({
                  id: elder.id,
                  name: elder.name,
                  gender: elder.gender,
                  phone: elder.phone,
                  checkin_date: elder.checkin_date,
                  checkout_date: elder.checkout_date,
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
    },

    // 添加老人信息
    async addData(newElderly) {
      try {
        const response = await $axios.put('/oldpersons/add', newElderly, {
          headers: {
              'Content-Type': 'application/json'
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error adding data:', error);
        throw error;
      }
    },

    // 修改老人信息
    async updateData(updatedElderly) {
      try {
        console.log(updatedElderly)
        const response = await $axios.post('/oldpersons/update', updatedElderly, {
          headers: {
              'Content-Type': 'application/json'
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error updating data:', error);
        throw error;
      }
    },

      // 删除老人信息
    async deleteData(id) {
      await $axios.delete(`/oldpersons/delete/${id}`);
    }
  },

    persist: true,
});
