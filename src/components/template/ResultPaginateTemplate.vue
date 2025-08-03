<template>
  <div v-if="games.length || loading" class="mb-6">
    <h3 class="text-2xl font-semibold mb-4 flex items-center gap-2">
      <component :is="icon" class="w-5 h-5" />
      {{ title }}
    </h3>

    <div :class="wrapperClass || gridClass">
      <component v-for="game in paginatedItems" :key="game.id" :is="card" :game="game" />
    </div>

    <div v-if="hasMore && !loading" class="flex justify-center mt-4">
      <button class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition" @click="loadMore">
        Cargar más
      </button>
    </div>

    <div v-if="loading" class="text-center mt-4 text-gray-500">Cargando...</div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRawgStore } from '@/stores/games'
import CardGame from '@/components/cards/CardGame.vue'


const props = defineProps({
  gameId: {
    type: [String, Number],
    required: true
  },
  endpoint: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  icon: {
    type: [Object, Function],
    required: true
  },
  wrapperClass: {
    type: String,
    default: ''
  },
  card: {
    type: Object,
    default: CardGame
  },
  pageTotal: {
    type: Number,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 8
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const store = useRawgStore()
const currentPage = ref(1);

const allItems = computed(() => store.dataMap[`${props.gameId}-${props.endpoint}`] || []);

const paginatedItems = computed(() => {
  const end = currentPage.value * props.pageSize;
  return allItems.value.slice(0, end);
});

onMounted(() => {
  store.fetchGameEndpointPaginated(props.gameId, props.endpoint);
});



const games = computed(() => {
  return store.dataMap[`${props.gameId}-${props.endpoint}`] || []
})

const hasMore = computed(() => {
  return allItems.value.length > currentPage.value * props.pageSize;
});

function loadMore() {
  if (hasMore.value) {
    currentPage.value++;
  }
}


const gridClass = computed(() => {
  return 'grid grid-cols-2 xl:grid-cols-4 gap-4'
})
</script>
