<script setup>
import { CalendarIcon, LoaderCircle } from 'lucide-vue-next';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import placeholderImage from '../../assets/images/placeholder-image.png'
import { computed } from 'vue'



const props = defineProps({
  game: {
    type: Object,
    required: true,
    default: () => ({})
  },
  showRating: {
    type: Boolean,
    default: false
  }
});

const displayedRating = computed(() => {
  return props.game.rating ? Math.round(props.game.rating * 20) : 'N/A'
})

const ratingColor = computed(() => {
  const rating = props.game.rating ? props.game.rating * 20 : 0
  if (rating >= 80) return 'border-green-500 text-green-300'
  if (rating >= 60) return 'border-yellow-500 text-yellow-300'
  if (rating > 0) return 'border-red-500 text-red-300'
  return 'border-muted text-muted-foreground'
})


function getFormatDate(timestamp) {
  return timestamp
    ? new Date(timestamp).toLocaleDateString('en-EN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
    : 'Date inconnue';
}

function lazyloadImage(event) {
  const image = event.target;
  const pictureLoader = image.nextElementSibling;
  if (pictureLoader) {
    pictureLoader.classList.add("opacity-0");
    setTimeout(() => {
      pictureLoader.remove();
    }, 300);
  }
}


</script>

<template>
  <Card class="group relative inline-flex justify-start rounded-md overflow-hidden w-full h-[16.125rem] cursor-pointer">
    <!-- Imagen -->
    <img :src="game.background_image !== null ? game.background_image : placeholderImage"
      class="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105 group-focus:scale-105 z-0"
      :alt="`Cover of the game ${game.name}`" @load="lazyloadImage($event)" />

    <!-- Loader -->
    <div
      class="picture-loarder absolute top-0 left-0 flex justify-center items-center bg-secondary ease-in-out duration-300 w-full h-full z-10">
      <LoaderCircle class="animate-spin" />
    </div>

    <!-- Contenido del card -->
    <CardHeader
      class="absolute bottom-0 start-0 flex flex-row justify-between items-center p-6 z-20 w-full bg-gradient-to-t from-black/80 to-transparent">
      <div class="flex flex-col justify-center items-start pe-6 text-white">
        <CardTitle class="transition-colors duration-200 group-hover:text-primary group-focus:text-primary mb-1">
          {{ game.name }}
        </CardTitle>
        <div class="flex items-center gap-2 mt-1">
          <CardDescription class="flex items-center text-sm">
            <CalendarIcon class="mr-2 h-4 w-4 opacity-70" />
            <span>{{ getFormatDate(game.released) }}</span>
          </CardDescription>

          <!-- Rating circle -->
          <div v-if="showRating"
            class="w-10 h-10 rounded-full border font-bold text-sm flex items-center justify-center"
            :class="ratingColor">
            {{ displayedRating }}
          </div>
        </div>
      </div>
    </CardHeader>

  </Card>
</template>
