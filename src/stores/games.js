import { defineStore } from 'pinia';
import axios from 'axios';

const API_KEY = '52ba7fc7e3bb48378ba876fcd8ca75db'; // ⚠️ Reemplazá esto por tu API real
const BASE_URL = 'https://api.rawg.io/api';

export const useRawgStore = defineStore('rawg', {
  state: () => ({
    data: [],             // ⬅️ ahora es genérico
    dataMap: {},
    loading: false,
    error: null,
    page: 1,
    pageCount: 1,
  }),

  actions: {
    async fetch(resource = 'games', reset = true, query = {}) {
      if (reset) {
        this.page = 1;
        this.data = [];
      }

      this.loading = true;
      this.error = null;

      try {
        const params = {
          key: API_KEY,
          page: this.page,
          page_size: 20,
          ...query,
        };

        const response = await axios.get(`${BASE_URL}/${resource}`, { params });

        const total = response.data.count || 0;
        this.pageCount = Math.ceil(total / params.page_size);

        const results = response.data.results || [];

        if (reset) {
          this.data = results;
        } else {
          this.data = [...this.data, ...results];
        }
      } catch (error) {
        this.error = error.message || 'Error al obtener datos';
      } finally {
        this.loading = false;
      }
    },

    async loadMore(resource = 'games', query = {}) {
      if (this.loading || this.page >= this.pageCount) return;
      this.page++;
      await this.fetch(resource, false, query);
    },

    async search(query = {}, reset = true, resource = 'games') {
      return this.fetch(resource, reset, query);
    },

    async fetchGamesByEndpoint(resource) {
      try {
        const params = { key: API_KEY, page_size: 40 };
        const res = await axios.get(`${BASE_URL}/${resource}`, { params });
        this.dataMap[resource] = res.data.results || [];
      } catch (e) {
        console.error(`Error al cargar ${resource}:`, e);
      }
    },

    async fetchGameDetails(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${BASE_URL}/games/${id}`, {
          params: { key: API_KEY },
        });
        return response.data;
      } catch (error) {
        this.error = error.message || 'Error al obtener detalles';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchScreenshots(gameId) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get(`${BASE_URL}/games/${gameId}/screenshots`, {
          params: { key: API_KEY }
        })
        return res.data.results || []
      } catch (error) {
        this.error = error.message || 'Error al obtener screenshots'
        return []
      } finally {
        this.loading = false
      }
    }
  },
});
