<script setup>
import { SquareArrowOutUpRight, Star } from 'lucide-vue-next';
import { CardContent, CardHeader, CardTitle } from '../ui/card';
import Card from '../ui/card/Card.vue';
import RatingMin from '../rating/RatingMin.vue';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import RatingDonut from '../rating/RatingDonut.vue';
import { computed } from 'vue';

function isPastOrToday(dateStr) {
  const inputDate = new Date(dateStr);
  const today = new Date();

  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return inputDate <= today;
}

const props = defineProps({
  game: {
    type: Object,
    required: true
  },
  loading: { type: Boolean, default: false }
})

const sortedMetacriticPlatforms = computed(() => {
  return [...(props.game?.metacritic_platforms ?? [])].sort((a, b) =>
    a.platform.name.localeCompare(b.platform.name)
  )
})
</script>
<template>
  <Card v-if="game?.metacritic && game.released && isPastOrToday(game.released)">
    <CardHeader class="flex flex-row justify-start items-center">
      <CardTitle class="flex justify-start items-center font-bebas text-3xl tracking-wide font-medium">
        <Star class="mr-[5px]" />Metascore
      </CardTitle>
      <RatingMin :rating="game?.metacritic" :maxRating="100" class="mx-2" />
    </CardHeader>
    <CardContent v-if="game?.metacritic_platforms.length" class="flex flex-wrap justify-around items-center">
      <Carousel class="lg:hidden w-full mx-auto">
        <CarouselContent class="-ml-2">
          <CarouselItem v-for="(metacriticPlatform, i) in sortedMetacriticPlatforms" :key="i"
            class="sm:basis-1/2 md:basis-full lg:basis-1/2 xl:basis-1/4 pl-2 mx-auto">
            <div>
              <a :href="metacriticPlatform.url" target="_blank" class="rounded-md p-2">
                <RatingDonut :rating="metacriticPlatform.metascore" :max-rating="100" />
                <p class="flex justify-center items-center underline underline-offset-4 mt-2">
                  {{ metacriticPlatform.platform.name }}
                  <SquareArrowOutUpRight class="text-muted-foreground w-[1rem] pt-[0.2rem] ml-1" />
                </p>
              </a>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious class="left-0" />
        <CarouselNext class="right-0" />
      </Carousel>
      <a v-for="(metacriticPlatform, i) in sortedMetacriticPlatforms" :key="i" :href="metacriticPlatform.url"
        target="_blank"
        class="hidden transition-colors lg:block group hover:bg-secondary focus:bg-secondary rounded-md p-2">
        <RatingDonut :rating="metacriticPlatform.metascore" :max-rating="100" />
        <p
          class="flex justify-center items-center underline underline-offset-4 transition-colors group-hover:text-primary group-focus:text-primary mt-2">
          {{ metacriticPlatform.platform.name }}
          <SquareArrowOutUpRight class="text-muted-foreground w-[1rem] pt-[0.2rem] ml-1" />
        </p>
      </a>
    </CardContent>
  </Card>
</template>
