<script setup>
import CardBrowse from '@/components/cards/CardBrowse.vue';
import ResultListTemplate from '@/template/ResultListTemplate.vue';
import { Hash } from 'lucide-vue-next';
</script>

<template>
  <ResultListTemplate title="All Tags" :icon="Hash" endpoint="tags" fetchType="tags" :component="CardBrowse"
    :componentProps="{}" />
</template>
