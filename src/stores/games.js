import { defineStore } from 'pinia';
import axios from 'axios';

const API_KEY = '52ba7fc7e3bb48378ba876fcd8ca75db';
const BASE_URL = 'https://api.rawg.io/api';

export const useRawgStore = defineStore('rawg', {
  state: () => ({
    data: [],
    dataMap: {},
    loading: false,
    error: null,
    page: 1,
    pageCount: 1,
    additions: { results: [], count: 0 },
    achievements: { results: [], count: 0 },
    parentGames: { results: [], count: 0 },
    series: { results: [], count: 0 },
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

    // 🔽 NUEVA ACCIÓN PARA LLAMADAS CON ENDPOINTS DINÁMICOS POR gameId
    async fetchGameEndpoint(gameId, endpoint) {
      this.loading = true;
      this.error = null;
      const key = `${gameId}-${endpoint}`;

      try {
        const response = await axios.get(`${BASE_URL}/games/${gameId}/${endpoint}`, {
          params: { key: API_KEY },
        });

        // Guarda la respuesta en dataMap con una clave única
        this.dataMap[key] = response.data.results || response.data;
      } catch (error) {
        this.error = error.message || `Error al obtener ${endpoint} del juego ${gameId}`;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchGameEndpointPaginated(gameId, endpoint) {
      const key = `${gameId}-${endpoint}`;
      if (!this.dataMap[key] || this.dataMap[key].length === 0) {
        try {
          const res = await axios.get(`${BASE_URL}/games/${gameId}/${endpoint}`, {
            params: { key: API_KEY }
          });
          this.dataMap[key] = res.data.results || [];
        } catch (error) {
          console.error(error);
          this.dataMap[key] = [];
        }
      }
      // No hacer nada si ya tiene datos
    }




  },
});
