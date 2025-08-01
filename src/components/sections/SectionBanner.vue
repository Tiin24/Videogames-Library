<template>
  <AspectRatio :ratio="isMobile() ? 4 / 3 : 16 / 9" class="relative rounded-md overflow-hidden mb-6">
    <!-- Título y Fecha -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold w-full z-10">
      <div class="flex justify-center items-center px-8">
        <Skeleton v-if="loading" class="w-[10rem] h-12 mx-auto mb-2" />
        <h1 class="text-2xl md:text-5xl font-bebas tracking-wide font-medium text-white">
          {{ game?.name }}
        </h1>
      </div>
      <Skeleton v-if="loading" class="w-[7.5rem] h6 reounded-xl mx-auto" />
      <Badge v-else class="leading-normal" variant="secondary">
        {{ game ? formatDate(game?.released) : "" }}
      </Badge>
    </div>
    <Skeleton v-if="loading" class="w-full h-full" />
    <template v-else>
      <div class="absolute bottom-0 left-0 bg-gradient-to-b from-transparent to-black w-full h-full"></div>
      <img :src="game?.background_image !== null ? game?.background_image : placeholderBanner" :alt="game?.name"
        class="w-full h-full object-cover" @load="lazyloadImage($event)">
      <div
        class="picture-loarder absolute top-0 left-0 flex justify-center items-center bg-secondary ease-in-out duration-300 w-full h-full z-10">
        <LoaderCircle class="animate-spin" />
      </div>
    </template>
  </AspectRatio>
</template>

<script setup>
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import placeholderBanner from '@/assets/images/placeholder-image.png'
import { LoaderCircle } from 'lucide-vue-next'

const props = defineProps({
  game: { type: Object, required: true },
  loading: { type: Boolean, default: false }
})

console.log(props)
function formatDate(dateStr) {
  return dateStr
    ? new Date(dateStr).toLocaleDateString('en-EN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
    : 'Unknown'
}

function isMobile() {
  return window.matchMedia('(max-width: 640px)').matches
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
