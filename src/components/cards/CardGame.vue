<script setup>
import { Card } from '../ui/card';

defineProps({
  game: {
    type: Object,
    required: true
  }
});
</script>
<template>
  <Card class="relative inline-flex justify-start rounded-md overflow-hidden w-full h-[16.125rem]">
    <div class="flex justify-center items-center overflow-hidden w-full h-full">
      <img :src="game.background_image" :alt="game.name" class="object-cover w-full h-full" />
    </div>
  </Card>
</template>
