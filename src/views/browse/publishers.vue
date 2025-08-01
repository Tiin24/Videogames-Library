<script setup>
import CardBrowse from '@/components/cards/CardBrowse.vue';
import ListTemplate from '@/components/template/ListTemplate.vue';
import { DollarSign } from 'lucide-vue-next';
</script>

<template>
  <ListTemplate title="All Publishers" :icon="DollarSign" resource="publishers" :query="{ ordering: '-games_count' }"
    :cardComponent="CardBrowse" itemPropName="model" />
</template>
