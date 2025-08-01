<script setup>
import CardBrowse from '@/components/cards/CardBrowse.vue';
import ListTemplate from '@/components/template/ListTemplate.vue';
import { Gamepad2 } from 'lucide-vue-next';
</script>

<template>
  <ListTemplate title="All Tags" :icon="Gamepad2" resource="platforms" :query="{ ordering: '-games_count' }"
    :cardComponent="CardBrowse" itemPropName="model" />
</template>
