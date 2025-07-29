<script setup>
import CardBrowse from '@/components/cards/CardBrowse.vue';
import ResultListTemplate from '@/template/ResultListTemplate.vue';
import { Gamepad2 } from 'lucide-vue-next';
</script>

<template>
  <ResultListTemplate title="All Platform" :icon="Gamepad2" endpoint="platforms" fetchType="platforms"
    :component="CardBrowse" :componentProps="{}" />
</template>
