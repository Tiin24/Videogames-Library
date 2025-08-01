<script setup>
import CardGame from '@/components/cards/CardGame.vue';
import ListTemplate from '@/components/template/ListTemplate.vue';
</script>

<template>
  <ListTemplate title="Best Rated" :icon="Trophy" resource="games" :query="{
    ordering: '-added',
    dates: new Date().toISOString().slice(0, 10) + ',2025-12-31',
  }" :cardComponent="CardGame" itemPropName="game" :showRating="false" />
</template>
