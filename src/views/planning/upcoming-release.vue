<script setup>
import CardGame from '@/components/cards/CardGame.vue';
import ResultListTemplate from '@/template/ResultListTemplate.vue';
import { Calendar } from 'lucide-vue-next';

// Función para obtener la fecha de mañana en formato YYYY-MM-DD
const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Suma 1 día
  return tomorrow.toISOString().split('T')[0];
};
</script>

<template>
  <ResultListTemplate key="upcoming-releases-games" title="Upcoming Releases" :icon="Calendar" :component="CardGame"
    fetchType="games" :params="{
      dates: `${getTomorrowDate()},2099-12-31`, // Rango: de mañana hasta una fecha futura lejana
      ordering: 'released' // Ordena por fecha de lanzamiento ascendente (los más cercanos primero)
    }" :componentProps="{ showReleaseDate: true }" />
</template>
