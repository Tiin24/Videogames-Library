<script setup lang="ts">
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

</script>

<template>
  <Card class="relative inline-flex flex-row-reverse justify-end rounded-md overflow-hidden w-full h-[16.125rem]">
    <AspectRatio :ratio="16 / 9">
      <Skeleton class="w-full h-full" />
    </AspectRatio>
    <CardHeader class="absolute bottom-0 start-0 w-full p-6 z-10">
      <Skeleton class="w-1/2 h-[24px]" />
    </CardHeader>
  </Card>
</template>