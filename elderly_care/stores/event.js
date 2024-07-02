import { defineStore } from 'pinia';
import axios from '../plugins/axios'

const $axios = axios().provide.axios

export const useEventStore = defineStore('event', {
  state: () => ({
    event: [],
    searchResults: []
  }),
  actions: {
    // 查询所有老人信息
    async fetchAllData() {
      try {
          const response = await $axios.get("/events/findAll");
          if (response && response.data && response.data.data) {
              const events = response.data.data
              this.$state.event = events.map(event => ({
                  id: event.id,
                  event_type: event.event_type,
                  event_date: event.event_date,
                  event_location: event.event_location,
                  event_desc: event.event_desc,
                  oldperson_id: event.oldperson_id
              }));
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching all data:', error);
      }
    },

    // 添加老人信息
    async addData(newEvent) {
      try {
        const response = await $axios.put('/events/add', newEvent, {
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
    async updateData(updatedEvent) {
      try {
        console.log(updatedEvent)
        const response = await $axios.post('/events/update', updatedEvent, {
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
    async searchData(type) {
      try {
          const response = await $axios.get(`/events/findByType/${type}`);
          if (response && response.data && response.data.data) {
              const results = response.data.data
              this.$state.searchResults = results.map(result => ({
                id: result.id,
                event_type: result.event_type,
                event_date: result.event_date,
                event_location: result.event_location,
                event_desc: result.event_desc,
                oldperson_id: result.oldperson_id
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
      await $axios.delete(`/events/delete/${id}`);
    }
  },

    persist: true,
});
