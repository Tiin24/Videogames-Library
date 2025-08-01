<script setup>
import { onMounted, watch } from 'vue';
import { useRawgStore } from '@/stores/games';
import CardGamePlaceholder from '@/components/cards/placeholders/CardGamePlaceholder.vue';
import { Button } from '@/components/ui/button';

const props = defineProps({
  title: { type: String, required: true },
  icon: { type: [Object, Function], default: null },
  resource: { type: String, default: 'games' },
  query: { type: Object, default: () => ({}) },

  cardComponent: { type: Object, required: true }, // Componente dinámico

  itemPropName: { type: String, default: 'game' },
  // nombre del prop para pasarle el item a la card (ej: 'game' o 'model')

  showRating: { type: Boolean, default: false }, // opcional para CardGame
});

const store = useRawgStore();

onMounted(() => {
  store.search(props.query, true, props.resource);
});

watch(
  () => [props.query, props.resource],
  () => {
    store.search(props.query, true, props.resource);
  },
  { deep: true }
);
</script>

<template>
  <div>
    <!-- Header -->
    <div
      class="flex items-center justify-start scroll-m-20 border-b pb-2 text-2xl md:text-3xl transition-colors first:mt-0 mb-4">
      <component v-if="icon" :is="icon" class="mr-2" />
      <h1 class="font-bebas text-4xl tracking-wide">{{ title }}</h1>
    </div>
    <slot></slot>
    <!-- Skeleton inicial -->
    <div v-if="store.loading && store.page === 1"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <CardGamePlaceholder v-for="n in 8" :key="n" />
    </div>

    <!-- Error -->
    <div v-else-if="store.error" class="text-destructive font-semibold">
      Error: {{ store.error }}
    </div>

    <!-- Cards dinámicas -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <component v-for="item in store.data" :key="item.id" :is="cardComponent"
        v-bind="{ [itemPropName]: item, showRating }" />
    </div>

    <!-- Skeleton carga más -->
    <div v-if="store.loading && store.page > 1"
      class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <CardGamePlaceholder v-for="n in 4" :key="n" />
    </div>

    <!-- Botón Cargar más -->
    <Button v-if="store.page < store.pageCount" @click="store.loadMore(resource, query)"
      class="mt-6 px-6 py-3 bg-primary text-white font-semibold hover:bg-primary/90" :disabled="store.loading">
      <span v-if="!store.loading">Cargar más</span>
      <span v-else>Cargando...</span>
    </Button>
  </div>
</template>
