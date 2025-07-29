<script setup>
import CardBrowse from '@/components/cards/CardBrowse.vue';
import ResultListTemplate from '@/template/ResultListTemplate.vue';
import { DollarSign } from 'lucide-vue-next';
</script>

<template>
  <ResultListTemplate title="All Publishers" :icon="DollarSign" endpoint="publishers" fetchType="publishers"
    :component="CardBrowse" :componentProps="{}" />
</template>
