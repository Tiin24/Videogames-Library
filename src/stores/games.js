import { defineStore } from 'pinia';
import axios from 'axios'; // Se recomienda usar Axios para las peticiones HTTP

// Si no tienes Axios, instálalo: npm install axios

export const useRawgStore = defineStore('rawg', {
  state: () => ({
    games: [],
    loading: false,
    error: null,
    apiKey: '757a3f2fac854499a36e6f6a4f10bc9f', // ¡Reemplaza con tu clave real!
    baseUrl: 'https://api.rawg.io/api',
  }),
  getters: {
    getPopularGames: (state) => state.games.slice(0, 10), // Ejemplo de un getter
  },
  actions: {
    async fetchGames(params = {}) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${this.baseUrl}/games`, {
          params: {
            key: this.apiKey,
            ...params,
          },
        });
        this.games = response.data.results;
      } catch (err) {
        this.error = 'Error al cargar los juegos: ' + err.message;
        console.error('Error fetching games:', err);
      } finally {
        this.loading = false;
      }
    },

    async fetchGameDetails(gameId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${this.baseUrl}/games/${gameId}`, {
          params: {
            key: this.apiKey,
          },
        });
        // Aquí podrías guardar los detalles de un juego específico si los necesitas en el store
        // Por ahora, solo lo retornamos.
        return response.data;
      } catch (err) {
        this.error = 'Error al cargar los detalles del juego: ' + err.message;
        console.error(`Error fetching game details for ID ${gameId}:`, err);
        return null;
      } finally {
        this.loading = false;
      }
    },

    // Puedes agregar más acciones para diferentes endpoints de la API de RAWG
    async searchGames(query) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${this.baseUrl}/games`, {
          params: {
            key: this.apiKey,
            search: query,
          },
        });
        this.games = response.data.results;
      } catch (err) {
        this.error = 'Error al buscar juegos: ' + err.message;
        console.error('Error searching games:', err);
      } finally {
        this.loading = false;
      }
    }
  },
});
