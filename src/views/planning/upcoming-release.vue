<script setup>
import CardGame from '@/components/cards/CardGame.vue';
import ListTemplate from '@/components/template/ListTemplate.vue';
import { Calendar } from 'lucide-vue-next';

// Función para obtener la fecha de mañana en formato YYYY-MM-DD
const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Suma 1 día
  return tomorrow.toISOString().split('T')[0];
};

</script>

<template>
  <ListTemplate title="Upcoming Releases" :icon="Calendar" resource="games" :query="{
    ordering: 'released',
    dates: `${getTomorrowDate()},2099-12-31`,
  }" :cardComponent="CardGame" itemPropName="game" :showRating="false" />
</template>
