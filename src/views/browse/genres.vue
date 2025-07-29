<script setup>
import CardBrowse from '@/components/cards/CardBrowse.vue';
import ResultListTemplate from '@/template/ResultListTemplate.vue';
import { Ghost } from 'lucide-vue-next';
</script>

<template>
  <ResultListTemplate title="All Genres" :icon="Ghost" endpoint="genres" fetchType="genres" :component="CardBrowse"
    :componentProps="{}" />
</template>
