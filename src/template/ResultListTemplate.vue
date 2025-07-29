<script setup>
import { watch } from 'vue'; // No need for onMounted for data fetching anymore
import { useRawgStore } from '@/stores/games';
import CardGamePlaceholder from '@/components/cards/placeholders/CardGamePlaceholder.vue';

const props = defineProps({
  title: String,
  icon: Function,
  component: Object, // This is your CardGame component
  fetchType: String,
  params: Object,
  componentProps: {
    type: Object,
    default: () => ({})
  }
});

const rawg = useRawgStore();

// Lógica de carga de datos
const loadData = (currentParams) => {
  // Siempre limpiar antes de cargar nuevos datos para la misma "ruta lógica"
  rawg.clearData(props.fetchType); // Asegúrate que clearData exista y funcione correctamente
  rawg.fetchGamesByType(props.fetchType, currentParams || {});
};

// Observar los cambios en `props.params` para recargar datos
watch(
  () => props.params,
  (newParams, oldParams) => {
    if (JSON.stringify(newParams) !== JSON.stringify(oldParams)) {
      console.log('Parámetros cambiados, recargando datos...');
      loadData(newParams);
    }
  },
  {
    deep: true,
    immediate: true // Carga inicial y recarga en cambios de params
  }
);

function loadMore() {
  rawg.fetchNextPage(props.fetchType);
}
</script>

<template>
  <section class="relative">
    <div
      class="flex items-center justify-start scroll-m-20 border-b pb-2 text-2xl md:text-3xl transition-colors first:mt-0 mb-4">
      <component :is="icon" class="mr-[5px]" />
      <h1 class="font-bebas text-4xl tracking-wide">{{ title }}</h1>
    </div>

    <slot></slot>

    <div v-if="rawg.loading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <CardGamePlaceholder v-for="n in 8" :key="n" />
    </div>

    <div v-else-if="rawg.error" class="text-center py-10 text-red-500">{{ rawg.error }}</div>

    <div v-else-if="Array.isArray(rawg.dataMap[fetchType]) && rawg.dataMap[fetchType].length > 0"
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <component :is="component" v-for="(game, index) in rawg.dataMap[fetchType]" :key="game.id ?? index" :game="game"
        v-bind="componentProps" />
    </div>
    <div v-else class="text-center py-10 text-gray-500">
      No se encontraron resultados.
    </div>

    <div v-if="rawg.nextPage[fetchType] && !rawg.loading" class="mt-6 text-center">
      <button @click="loadMore" class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition">
        Cargar más
      </button>
    </div>
  </section>
</template>

<style scoped>
/* Tus estilos existentes */
</style>
