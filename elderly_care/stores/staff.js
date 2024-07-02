import { defineStore } from 'pinia';
import axios from '../plugins/axios'

const $axios = axios().provide.axios

export const useStaffStore = defineStore('staff', {
  state: () => ({
    staff: [],
    searchResults: []
  }),
  actions: {
    // 查询所有老人信息
    async fetchAllData() {
      try {
          const response = await $axios.get("/employees/findAll");
          if (response && response.data && response.data.data) {
              const staffs = response.data.data
              this.$state.staff = staffs.map(staff => ({
                  id: staff.id,
                  name: staff.name,
                  gender: staff.gender,
                  phone: staff.phone,
                  hire_date: staff.hire_date,
                  resign_date: staff.resign_date,
                  imgSetDir: staff.imgset_dir,
                  description: staff.description
              }));
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching all data:', error);
      }
    },

    // 添加老人信息
    async addData(newStaff) {
      try {
        const response = await $axios.put('/employees/add', newStaff, {
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
    async updateData(updatedStaff) {
      try {
        console.log(updatedStaff)
        const response = await $axios.post('/employees/update', updatedStaff, {
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

    // 查询老人信息
    async searchData(name) {
      try {
          const response = await $axios.get('/employees/findByName', {
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
                  health_state: result.health_state,
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

    // 删除老人信息
    async deleteData(id) {
      await $axios.delete(`/employees/delete/${id}`);
    }
  },

    persist: true,
});
