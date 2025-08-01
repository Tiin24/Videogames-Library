<script setup>
import { Flame } from 'lucide-vue-next';
import ListTemplate from '@/components/template/ListTemplate.vue';
import CardGame from '@/components/cards/CardGame.vue';
</script>

<template>
  <ListTemplate title="Popular Games" :icon="Flame" resource="games" :query="{ ordering: '-popularity' }"
    :cardComponent="CardGame" itemPropName="game" :showRating="false" />
</template>
