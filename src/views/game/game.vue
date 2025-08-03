<script setup>
import { useRoute } from 'vue-router'
import CardGameDetail from '@/components/cards/CardGameDetails.vue'

const route = useRoute()
const gameId = route.params.id
</script>

<template>
  <CardGameDetail :gameId="gameId" />
</template>
