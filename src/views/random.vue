<script setup>
import { onMounted, ref } from 'vue'
import { useRawgStore } from '@/stores/games'
import CardGameDetail from '@/components/cards/CardGameDetails.vue'

const rawg = useRawgStore()
const gameId = ref(null)

onMounted(async () => {
  gameId.value = await rawg.fetchRandomGameId()
})
</script>

<template>
  <CardGameDetail v-if="gameId" :gameId="gameId" />
</template>
