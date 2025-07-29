<script setup>
import CardBrowse from '@/components/cards/CardBrowse.vue';
import ResultListTemplate from '@/template/ResultListTemplate.vue';
import { Download } from 'lucide-vue-next';
</script>

<template>
  <ResultListTemplate title="All Stores" :icon="Download" endpoint="stores" fetchType="stores" :component="CardBrowse"
    :componentProps="{}" />
</template>
