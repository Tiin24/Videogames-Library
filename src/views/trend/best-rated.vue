<script setup>
import ResultListTemplate from '@/template/ResultListTemplate.vue'
import CardGame from '@/components/cards/CardGame.vue'
import { Trophy } from 'lucide-vue-next'
</script>

<template>
  <ResultListTemplate title="Best Rated" :icon="Trophy" :component="CardGame" fetchType="-rating"
    :params="{ ordering: '-rating', metacritic: '1,100' }" :componentProps="{ showRating: true }" />

</template>
