<script setup lang="ts">
import ResultListTemplate from '@/components/templates/ResultListTemplate.vue';
import { Flame } from 'lucide-vue-next';
// 1. Importa el componente ResultsListTemplate// <--- ¡Asegúrate de que la ruta sea correcta!

const query = {
  ordering: '-popularity',
};
</script>

<template>
  <ResultListTemplate title="Most popular games" :icon="Flame" :query="JSON.stringify(query)" />
</template>
