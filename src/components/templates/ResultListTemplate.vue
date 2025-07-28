<script setup>
import { onMounted, watch } from 'vue'; // También importamos 'watch'
import { useRawgStore } from '../../stores/games'; // <--- ¡Ajusta la ruta a tu store!
import GameCard from '../cards/CardGame.vue'; // Asegúrate de que esta importación sea correcta

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: [Object, Function, String],
    required: false,
    default: null
  },
  query: {
    type: [String, Object], // La prop 'query' ahora pasará directamente los parámetros para la API
    required: false,
    default: null
  }
})

// Inicializa la store
const rawgStore = useRawgStore();

// Las variables 'loading', 'error' y 'games' ahora vienen directamente de la store
// Puedes desestructurarlas o acceder a ellas directamente desde rawgStore
// Si necesitas que sean reactivas y desestructurarlas, usa storeToRefs
import { storeToRefs } from 'pinia';
const { loading, error, games } = storeToRefs(rawgStore); // Desestructura y mantén la reactividad

// Función para parsear la prop 'query' si viene como string JSON
const getQueryParams = () => {
  if (typeof props.query === 'string') {
    try {
      return JSON.parse(props.query);
    } catch (e) {
      console.error("Error parsing query prop:", e);
      // Podrías establecer un error local o usar el error de la store
      // rawgStore.error = "Error en la configuración de la consulta.";
      return {};
    }
  } else if (typeof props.query === 'object' && props.query !== null) {
    return props.query;
  }
  return {};
};


// Llama a la acción fetchGames de la store cuando el componente se monte
onMounted(() => {
  rawgStore.fetchGames(getQueryParams());
});

// Opcional: Si la prop 'query' puede cambiar y quieres recargar los juegos
watch(() => props.query, () => {
  rawgStore.fetchGames(getQueryParams());
}, { deep: true }); // 'deep: true' si 'query' es un objeto y sus propiedades internas cambian

</script>

<template>
  <div class="results-list-template">
    <div class="header">
      <component :is="props.icon" class="icon" />
      <h2>{{ props.title }}</h2>
    </div>

    <div v-if="loading" class="loading-message">
      Cargando juegos...
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="games && games.length > 0" class="game-cards-grid">
      <GameCard v-for="game in games" :key="game.id" :game="game" />
    </div>

    <div v-else class="no-results-message">
      No se encontraron juegos.
    </div>
  </div>
</template>
