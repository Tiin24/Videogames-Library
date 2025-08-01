<script setup>
import CardBrowse from '@/components/cards/CardBrowse.vue';
import ListTemplate from '@/components/template/ListTemplate.vue';
import { Hash } from 'lucide-vue-next';
</script>

<template>
  <ListTemplate title="All Tags" :icon="Hash" resource="tags" :query="{ ordering: '-games_count' }"
    :cardComponent="CardBrowse" itemPropName="model" />
</template>
