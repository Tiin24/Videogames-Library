<script setup>
import { onMounted } from 'vue'
import { useRawgStore } from '@/stores/games'
import CardGamePlaceholder from '@/components/cards/placeholders/CardGamePlaceholder.vue' // 👈 importar placeholder

const props = defineProps({
  title: String,
  icon: Function,
  component: Object,
  fetchType: String,
  params: Object,
  componentProps: {
    type: Object,
    default: () => ({}) // 👈 importante
  }
});


const rawg = useRawgStore()

onMounted(() => {
  if (!rawg.dataMap[props.fetchType]) {
    rawg.fetchGamesByType(props.fetchType, props.params || {})
  }
})

function loadMore() {
  rawg.fetchNextPage(props.fetchType)
}
</script>

<template>
  <section class="relative">
    <!-- Header -->
    <div
      class="flex items-center justify-start scroll-m-20 border-b pb-2 text-2xl md:text-3xl transition-colors first:mt-0 mb-4">
      <component :is="icon" class="mr-[5px]" />
      <h1 class="font-bebas text-4xl tracking-wide">{{ title }}</h1>
    </div>

    <slot></slot>

    <!-- Loading -->
    <div v-if="rawg.loading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <CardGamePlaceholder v-for="n in 8" :key="n" /> <!-- 👈 8 placeholders de ejemplo -->
    </div>

    <!-- Error -->
    <div v-else-if="rawg.error" class="text-center py-10 text-red-500">{{ rawg.error }}</div>

    <!-- Lista de juegos -->
    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <component :is="component" v-for="(game, index) in rawg.dataMap[fetchType]" :key="game.id ?? index" :game="game"
        v-bind="componentProps" />
    </div>

    <!-- Botón para paginación -->
    <div v-if="rawg.nextPage && !rawg.loading" class="mt-6 text-center">
      <button @click="loadMore" class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition">
        Cargar más
      </button>
    </div>
  </section>
</template>
