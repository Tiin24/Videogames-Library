<script setup>
import CardBrowse from '@/components/cards/CardBrowse.vue';
import ResultListTemplate from '@/template/ResultListTemplate.vue';
import { CodeXml } from 'lucide-vue-next';
</script>

<template>
  <ResultListTemplate title="All Developers" :icon="CodeXml" endpoint="developers" :component="CardBrowse" />
</template>
