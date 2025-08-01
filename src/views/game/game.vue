<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRawgStore } from '@/stores/games';
import CardGameDetail from '@/components/cards/CardGameDetails.vue';

const route = useRoute();
const gameId = route.params.id;

const store = useRawgStore();
const gameDetails = ref(null);

const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    gameDetails.value = await store.fetchGameDetails(gameId);
  } catch (err) {
    error.value = 'Error al cargar detalles del juego';
    console.log(err)
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="container py-8">
    <div v-if="loading" class="text-center text-muted-foreground">
      Cargando detalles del juego...
    </div>
    <div v-else-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>
    <div v-else>
      <CardGameDetail :game="gameDetails" />
    </div>
  </section>
</template>
