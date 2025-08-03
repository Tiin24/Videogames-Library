<script setup>
import CardBrowse from '@/components/cards/CardBrowse.vue';
import ListTemplate from '@/components/template/ListTemplate.vue';
import { CodeXml } from 'lucide-vue-next';
</script>

<template>
  <ListTemplate title="All Genres" :icon="CodeXml" resource="developers" :query="{ ordering: '-games_count' }"
    :cardComponent="CardBrowse" itemPropName="model" />
</template>
