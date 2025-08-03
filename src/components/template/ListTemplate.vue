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

  cardComponent: { type: Object, required: true },
  itemPropName: { type: String, default: 'game' },
  showRating: { type: Boolean, default: false },

  // ✅ Nuevo: para usar otro store (como el de News)
  externalStore: { type: Object, default: null },
  wrapperClass: { type: String, default: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' },

});

const store = props.externalStore || useRawgStore();

onMounted(() => {
  if (!props.externalStore) {
    store.search(props.query, true, props.resource);
  } else if (typeof store.fetchNews === 'function') {
    store.fetchNews();
  }
});

watch(
  () => [props.query, props.resource],
  () => {
    if (!props.externalStore) {
      store.search(props.query, true, props.resource);
    }
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
    <div v-if="store.loading && !store.data && !store.articles"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <CardGamePlaceholder v-for="n in 8" :key="n" />
    </div>

    <!-- Error -->
    <div v-else-if="store.error" class="text-destructive font-semibold">
      Error: {{ store.error }}
    </div>

    <!-- Cards dinámicas -->
    <div v-else :class="wrapperClass">
      <component v-for="item in store.data || store.articles" :key="item.id || item.guid" :is="cardComponent"
        v-bind="{ [itemPropName]: item, showRating }" />
    </div>

    <!-- Skeleton carga más -->
    <div v-if="store.loading && store.page > 1"
      class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <CardGamePlaceholder v-for="n in 4" :key="n" />
    </div>

    <!-- Botón Cargar más -->
    <Button v-if="!props.externalStore && store.page < store.pageCount" @click="store.loadMore(resource, query)"
      class="mt-6 px-6 py-3 bg-primary text-white font-semibold hover:bg-primary/90" :disabled="store.loading">
      <span v-if="!store.loading">Cargar más</span>
      <span v-else>Cargando...</span>
    </Button>
  </div>
</template>
