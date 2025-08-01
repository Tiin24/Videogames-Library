<script setup>
import CardGame from '@/components/cards/CardGame.vue';
import ListTemplate from '@/components/template/ListTemplate.vue';
import { Calendar } from 'lucide-vue-next';

// Función para obtener la fecha actual en formato YYYY-MM-DD
const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Función para obtener la fecha de hace 30 días en formato YYYY-MM-DD
const getThirtyDaysAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 30); // Resta 30 días
  return date.toISOString().split('T')[0];
};

</script>

<template>
  <ListTemplate title="Recently Released" :icon="Calendar" resource="games" :query="{
    ordering: '-released',
    dates: `${getThirtyDaysAgo()},${getCurrentDate()}`
  }" :cardComponent="CardGame" itemPropName="game" :showRating="false" />
</template>
