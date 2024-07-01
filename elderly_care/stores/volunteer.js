import { defineStore } from 'pinia';
import axios from '../plugins/axios'

const $axios = axios().provide.axios

export const useVolunteerStore = defineStore('volunteer', {
  state: () => ({
    volunteer: [],
    searchResults: []
  }),
  actions: {
    // 查询所有义工信息
    async fetchAllData() {
      try {
          const response = await $axios.get("/volunteers/findAll");
          if (response && response.data && response.data.data) {
              const volunteers = response.data.data
              this.$state.volunteer = volunteers.map(volunteer => ({
                  id: volunteer.id,
                  name: volunteer.name,
                  gender: volunteer.gender,
                  phone: volunteer.phone,
                  checkin_date: volunteer.checkin_date,
                  checkout_date: volunteer.checkout_date,
                  imgSetDir: volunteer.imgset_dir,
                  description: volunteer.description
              }));
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching all data:', error);
      }
    },

    // 添加义工信息
    async addData(newVolunteer) {
      try {
        const response = await $axios.put('/volunteers/add', newVolunteer, {
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

    // 修改义工信息
    async updateData(updatedVolunteer) {
      try {
        const response = await $axios.post('/volunteers/update', updatedVolunteer, {
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

    // 查询义工信息
    async searchData(name) {
      try {
          const response = await $axios.get('/volunteers/findByName', {
            params: {
              name: name
            }
          });
          if (response && response.data && response.data.data) {
              const results = response.data.data
              this.$state.searchResults = results.map(result => ({
                  id: result.id,
                  name: result.name,
                  gender: result.gender,
                  phone: result.phone,
                  checkin_date: result.checkin_date,
                  checkout_date: result.checkout_date,
                  imgSetDir: result.imgset_dir,
                  description: result.description
              }));
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        console.error('Error search data:', error);
      }
    },

    // 删除义工信息
    async deleteData(id) {
      await $axios.delete(`/volunteers/delete/${id}`);
    }
  },

    persist: true,
});
