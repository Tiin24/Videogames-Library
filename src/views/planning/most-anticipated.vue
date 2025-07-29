<script setup>
import CardGame from '@/components/cards/CardGame.vue';
import ResultListTemplate from '@/template/ResultListTemplate.vue';
import { CalendarIcon } from 'lucide-vue-next';

</script>

<template>
  <ResultListTemplate title="Most Anticipated" :icon="CalendarIcon" :component="CardGame" fetchType="most-anticipated"
    :params="{
      dates: new Date().toISOString().slice(0, 10) + ',2025-12-31',
      ordering: '-added'
    }" :componentProps="{ showReleaseDate: true }" />

</template>
