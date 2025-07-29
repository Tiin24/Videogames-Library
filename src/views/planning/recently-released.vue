<script setup>
import CardGame from '@/components/cards/CardGame.vue';
import ResultListTemplate from '@/template/ResultListTemplate.vue';
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
  <ResultListTemplate key="recently-released-games" title="Recently Released" :icon="Calendar" :component="CardGame"
    fetchType="games" :params="{
      dates: `${getThirtyDaysAgo()},${getCurrentDate()}`, // Rango: últimos 30 días hasta hoy
      ordering: '-released' // Ordena por fecha de lanzamiento descendente (los más nuevos primero)
    }" :componentProps="{ showReleaseDate: true }" />
</template>
