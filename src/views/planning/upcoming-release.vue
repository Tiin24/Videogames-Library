<script setup lang="ts">
import CardGame from '@/components/cards/CardGame.vue';
import ResultListTemplate from '@/template/ResultListTemplate.vue';
import { Calendar } from 'lucide-vue-next';

</script>

<template>
  <ResultListTemplate title="Upcoming Releases" :icon=Calendar :component="CardGame" fetchType="-added"
    :params="{ ordering: '-added' }" :componentProps="{ showReleaseDate: true }" />
</template>
