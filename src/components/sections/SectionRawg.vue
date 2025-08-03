<script setup>
import { ref, computed } from 'vue'
import { PencilLine, SquareArrowOutUpRight } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import RatingMin from '../rating/RatingMin.vue'
import { Button } from '../ui/button'
import { NumberTicker } from '../ui/number-ticker'

const props = defineProps({
  game: {
    type: Object,
    required: true
  },
  loading: { type: Boolean, default: false }
})

// Estado reactivo para saber qué rating está hovereado
const hoveredIndex = ref(null)

// Lista de colores para cada tipo de rating
const colors = computed(() => {
  const fallback = ['#22c55e', '#eab308', '#f97316', '#ef4444', '#3b82f6'] // verde, amarillo, naranja, rojo, azul
  const length = props.game?.ratings?.length || 0
  return fallback.slice(0, length)
})

// Utilidad para validar la fecha de lanzamiento
function isPastOrToday(dateStr) {
  const inputDate = new Date(dateStr)
  const today = new Date()
  inputDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  return inputDate <= today
}
</script>

<template>
  <Card v-if="game?.rating && game.released && isPastOrToday(game.released)">
    <CardHeader class="flex flex-row justify-start items-center">
      <CardTitle class="flex justify-start items-center font-bebas text-3xl tracking-wide font-medium">
        <PencilLine class="mr-[5px]" />RAWG
      </CardTitle>
      <RatingMin :rating="game?.rating" :maxRating="5" class="mx-2" />
    </CardHeader>

    <CardContent v-if="game?.ratings" class="flex flex-col justify-center items-center gap-4 w-full">
      <!-- Donut de barras -->
      <div class="relative flex rounded-md overflow-hidden w-full h-[36px]">
        <div v-for="(value, index) in game.ratings" :key="index" :class="{
          'relative h-full cursor-pointer transition-opacity duration-200': true,
          'opacity-100': hoveredIndex === index,
          'opacity-50': hoveredIndex !== null && hoveredIndex !== index
        }" :style="{ width: `${value.percent}%`, backgroundColor: colors[index] }" @mouseover="hoveredIndex = index"
          @mouseleave="hoveredIndex = null" />
      </div>

      <!-- Botones de filtro -->
      <div class="flex flex-wrap justify-center items-center gap-2">
        <Button v-for="(value, index) in game.ratings" :key="index" type="button" variant="outline" :class="{
          'capitalize transition-colors': true,
          'bg-secondary': hoveredIndex === index
        }" @mouseover="hoveredIndex = index" @mouseleave="hoveredIndex = null">
          <span class="w-4 h-4 rounded-full mr-2" :style="{ backgroundColor: colors[index] }" />
          {{ value.title }}
          <div class="text-muted-foreground ml-1">
            (
            <NumberTicker class="text-muted-foreground" :value="value.count" :decimalPlaces="0" />
            )
          </div>
        </Button>
      </div>

      <!-- Link a RAWG -->
      <a :href="`https://rawg.io/games/${game?.id}`" target="_blank"
        class="flex justify-center items-center underline underline-offset-4 transition-colors hover:text-primary focus:text-primary">
        {{ game?.ratings_count }} ratings on RAWG
        <SquareArrowOutUpRight class="text-muted-foreground w-[1rem] pt-[0.2rem] ml-1" />
      </a>
    </CardContent>
  </Card>
</template>
