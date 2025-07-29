// stores/rawg.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useRawgStore = defineStore('rawg', {
  state: () => ({
    dataMap: {}, // Always initialize as an empty object
    loading: false,
    error: null,
    apiKey: '757a3f2fac854499a36e6f6a4f10bc9f',
    baseUrl: 'https://api.rawg.io/api',
    nextPage: {}, // Ensure this is an object for per-type tracking
  }),
  actions: {
    async fetchGamesByType(type = 'default', params = {}) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${this.baseUrl}/games`, {
          params: {
            key: this.apiKey,
            ...params,
          },
        });

        // Ensure dataMap[type] is an array, even if API returns null/undefined results
        this.dataMap[type] = response.data.results || [];
        this.nextPage[type] = response.data.next;
      } catch (err) {
        this.error = 'Error al cargar los juegos: ' + err.message;
        console.error(err);
        this.dataMap[type] = []; // On error, ensure it's an empty array
        this.nextPage[type] = null;
      } finally {
        this.loading = false;
      }
    },

    // NEW: Action to clear data for a specific type
    clearData(type) {
      this.dataMap[type] = []; // Explicitly set to an empty array
      this.nextPage[type] = null; // Reset next page for this type
      // You might also want to clear any specific error for this type if applicable
      // this.error = null; // Or this.errors[type] = null; if you track errors per type
    },

    async fetchNextPage(type) {
      const currentNextPageUrl = this.nextPage[type];

      if (!currentNextPageUrl || this.loading) {
        // console.warn(`No hay más páginas o ya está cargando para el tipo: ${type}`); // Optional: for debugging
        return;
      }

      this.loading = true;
      try {
        const response = await axios.get(currentNextPageUrl);
        // Ensure dataMap[type] is initialized as an array before spreading
        this.dataMap[type] = [...(this.dataMap[type] || []), ...(response.data.results || [])];
        this.nextPage[type] = response.data.next;
      } catch (err) {
        this.error = 'Error al cargar más juegos: ' + err.message;
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    // new action for endpont dinamic
    async fetchGamesByEndpoint(endpoint, params = {}) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${this.baseUrl}/${endpoint}`, {
          params: {
            key: this.apiKey,
            ...params,
          },
        });

        // Ensure dataMap[endpoint] is an array, even if API returns null/undefined results
        this.dataMap[endpoint] = response.data.results || [];
        this.nextPage[endpoint] = response.data.next;
      } catch (err) {
        this.error = 'Error al cargar los juegos: ' + err.message;
        console.error(err);
        this.dataMap[endpoint] = []; // On error, ensure it's an empty array
        this.nextPage[endpoint] = null;
      } finally {
        this.loading = false;
      }
    },
  }
});
