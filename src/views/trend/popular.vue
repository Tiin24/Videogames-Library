<script setup>
import ResultListTemplate from '@/template/ResultListTemplate.vue'
import CardGame from '@/components/cards/CardGame.vue'
import { Flame } from 'lucide-vue-next'
</script>

<template>
  <ResultListTemplate title="Most Popular Games" :icon="Flame" :component="CardGame" fetchType="popular"
    :params="{ ordering: '-popular' }" />
</template>
