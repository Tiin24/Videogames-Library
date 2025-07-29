<template>
  <Card class="flex flex-col justify-end h-[16.125rem]">
    <CardContent class="space-y-2 p-4">
      <Skeleton class="h-6 w-full" />
      <Skeleton class="h-4 w-1/2 pb-[18px]" />
    </CardContent>
  </Card>
</template>

<script setup>
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

</script>
