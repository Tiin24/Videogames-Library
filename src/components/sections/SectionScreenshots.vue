<script setup>
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import CardPlaceholderSlider from '../cards/placeholders/CardPlaceholderSlider.vue'
import { Images, LoaderCircle } from 'lucide-vue-next'
import { ref, watch } from 'vue'

const props = defineProps({
  screenshots: {
    type: Array,
    required: true,
    default: () => []
  },
  loading: { type: Boolean, default: false }
})

const current = ref(1) // 1-based for display

// Simulamos la cantidad de slides total
const total = ref(props.screenshots.length)

watch(
  () => props.screenshots.length,
  (val) => {
    total.value = val
  }
)

function isDesktop() {
  return window.matchMedia('(min-width: 1280px)').matches
}

function lazyloadImage(event) {
  const image = event.target
  const pictureLoader = image.nextElementSibling
  if (pictureLoader) {
    pictureLoader.classList.add('opacity-0')
    setTimeout(() => {
      pictureLoader.remove()
    }, 300)
  }
}
</script>

<template>
  <div :data-aos="isDesktop() ? 'fade-left' : 'fade-up'" class="relative">
    <div class="flex justify-between mb-6">
      <h3 class="flex justify-start items-center font-bebas text-3xl tracking-wide font-medium">
        <Images class="mr-[5px]" />
        Screenshots
      </h3>
    </div>

    <Carousel class="w-full mx-auto relative">
      <CarouselContent class="-ml-2 mb-2">
        <template v-if="loading">
          <CarouselItem v-for="skeleton in 6" :key="'skeleton-' + skeleton"
            class="sm:basis-1/2 md:basis-full lg:basis-1/2 pl-2">
            <CardPlaceholderSlider />
          </CarouselItem>
        </template>
        <template v-else>
          <CarouselItem v-for="(screenshot, screenshotIndex) in screenshots" :key="screenshotIndex"
            class="sm:basis-1/2 md:basis-full lg:basis-1/2 pl-2">
            <AspectRatio :ratio="16 / 9">
              <img :src="screenshot.image" :alt="`Screenshot ${screenshotIndex + 1}`"
                class="w-full h-full object-cover rounded-md" @load="lazyloadImage($event)" />
              <div
                class="picture-loarder absolute top-0 left-0 flex justify-center items-center bg-secondary ease-in-out duration-300 w-full h-full rounded-md z-10">
                <LoaderCircle class="animate-spin" />
              </div>
            </AspectRatio>
          </CarouselItem>
        </template>
      </CarouselContent>

      <!-- Gradients -->
      <div
        class="absolute bottom-0 left-0 w-[32px] bg-gradient-to-r from-[hsl(var(--background))] to-transparent h-full z-10 pointer-events-none" />
      <div
        class="absolute bottom-0 right-0 w-[32px] bg-gradient-to-l from-[hsl(var(--background))] to-transparent h-full z-10 pointer-events-none" />

      <!-- Controls -->
      <div class="flex justify-center items-center z-10">
        <CarouselPrevious class="relative rounded-md hover:text-primary translate-y-0" />
        <div class="text-center text-sm text-muted-foreground py-2 mx-2">
          Slide {{ current }} of {{ total }}
        </div>
        <CarouselNext class="relative rounded-md hover:text-primary translate-y-0" />
      </div>
    </Carousel>
  </div>
</template>
