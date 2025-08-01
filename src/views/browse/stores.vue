<script setup>
import CardBrowse from '@/components/cards/CardBrowse.vue';
import ListTemplate from '@/components/template/ListTemplate.vue';
import { Download } from 'lucide-vue-next';
</script>

<template>
  <ListTemplate title="All Stores" :icon="Download" resource="stores" :query="{ ordering: '-games_count' }"
    :cardComponent="CardBrowse" itemPropName="model" />
</template>
