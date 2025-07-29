// stores/rawg.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useRawgStore = defineStore('rawg', {
  state: () => ({
    dataMap: {},
    loading: false,
    error: null,
    apiKey: '757a3f2fac854499a36e6f6a4f10bc9f',
    baseUrl: 'https://api.rawg.io/api',
    nextPage: null,
  }),
  actions: {
    async fetchGamesByType(type = 'default', params = {}) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${this.baseUrl}/games`, {
          params: {
            key: this.apiKey,
            ...params,
          },
        })
        this.dataMap[type] = response.data.results
        this.nextPage = response.data.next
      } catch (err) {
        this.error = 'Error al cargar los juegos: ' + err.message
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    async fetchNextPage(type) {
      if (!this.nextPage) return
      this.loading = true
      try {
        const response = await axios.get(this.nextPage)
        this.dataMap[type] = [...(this.dataMap[type] || []), ...response.data.results]
        this.nextPage = response.data.next
      } catch (err) {
        this.error = 'Error al cargar más juegos: ' + err.message
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
})


