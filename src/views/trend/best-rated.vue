<script setup>
import CardGame from '@/components/cards/CardGame.vue';
import ListTemplate from '@/components/template/ListTemplate.vue';
import { Trophy } from 'lucide-vue-next';


</script>

<template>
  <ListTemplate title="Best Rated" :icon="Trophy" resource="games" :query="{ ordering: '-rating', metacritic: '1,100' }"
    :cardComponent="CardGame" itemPropName="game" :showRating="true" />
</template>
