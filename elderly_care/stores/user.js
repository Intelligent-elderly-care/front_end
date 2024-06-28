import { defineStore } from 'pinia'
import axios from '../plugins/axios'

const $axios = axios().provide.axios

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    name: '',
    token: ''
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    // 登录接口
    async login(id, password) {
      try {
        const response = await $axios.post('/api/user/login', {
          id: id,
          password: password
        })
    
        this.token = response.data.data[0].token
        this.id = id
    
        localStorage.setItem('token', this.token)
        $axios.defaults.headers.common['Authorization'] = `${this.token}`
      } catch (error) {
        if (error.response && error.response.status === 400) {
          throw new Error(error.response.data.error)
        } else {
          console.error(error)
          throw new Error('登录失败，请检查账号和密码。')
        }
      }
    },
    
    async register(id, password, name) {
      try {
        await $axios.post('/api/user/register', {
          name: name,
          id: id,
          password: password
        })
        await this.login(id, password)
      } catch (error) {
        if (error.response && error.response.status === 400) {
          throw new Error(error.response.data.error)
        } else {
          console.error(error)
          throw new Error(error)
        }
      }
    },
    
    async getUser() {
      // TODO:接口
      let res = await $axios.get('/api/user')

      this.$state.id = res.data.data.id
      this.$state.name = res.data.data.username
    },

    async updateUserImage(data) {
      // TODO:接口
      return await $axios.post('/api/user/update-user-image', data)
    },

    async updateUser(name) {
      // TODO:接口
      return await $axios.put('/api/user/username', {
        name: name,
      })
    },

    async updateUserPassword(password) {
      // TODO:接口
      return await $axios.put('/api/user/password', {
        password: password,
      })
    },

    async logout() {
      this.resetUser()
      localStorage.removeItem('token')
      delete $axios.defaults.headers.common['Authorization']
    },

    resetUser() {
      this.id = ''
      this.name = ''
      this.token = ''
    }
  },
  persist: true,
})