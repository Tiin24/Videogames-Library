<template>
  <Card class="inline-flex flex-row-reverse justify-end items-center text-center w-full p-4">
    <CardHeader class="flex flex-col justify-center items-start w-[calc(100%-3rem)] p-0 ps-4">
      <CardTitle class="text-start">{{ game.name }}</CardTitle>
      <CardDescription class="text-start">
        {{ game.description }}
      </CardDescription>
    </CardHeader>
    <CardContent class="w-[4rem] p-0">
      <AspectRatio :ratio="1 / 1" class="relative rounded-md overflow-hidden">
        <img :src="game.image" :alt="`Cover of the achievement ${game.name}`" class="w-full h-full object-cover"
          @load="lazyloadImage($event)">
        <div
          class="picture-loarder absolute top-0 left-0 flex justify-center items-center bg-secondary ease-in-out duration-300 w-full h-full z-10">
          <LoaderCircle class="animate-spin" />
        </div>
      </AspectRatio>
      <Badge class="mt-2" variant="secondary">
        <NumberTicker class="text-secondary-foreground" :value="Number(game.percent)" :decimalPlaces="2" />
        %
      </Badge>
    </CardContent>
  </Card>
</template>

<script setup>
import { LoaderCircle } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { AspectRatio } from '../ui/aspect-ratio';
import { Badge } from '../ui/badge';
import { NumberTicker } from '../ui/number-ticker';

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

// * PROPS
defineProps({
  game: {
    type: Object,
    default: () => { return }
  },
})
</script>
