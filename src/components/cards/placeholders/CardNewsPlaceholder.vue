<template>
  <Card
    class="relative overflow-hidden flex flex-col xl:flex-row justify-start items-center text-center group cursor-pointer w-full h-full">
    <CardHeader class="relative aspect-[16/9] w-full xl:w-[15rem] xl:h-full p-0">
      <Skeleton class="rounded-none w-full h-full" />
    </CardHeader>
    <CardContent class="flex flex-col items-center xl:items-start w-full xl:w-[calc(100%-15rem)] p-4">
      <Skeleton class="h-6 w-1/2" />
      <Skeleton class="w-[100px] h-[20px] mt-1 mb-3" />
      <Skeleton class="w-full h-[24px] mb-1" />
      <Skeleton class="w-3/4 h-[24px]" />
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
</script>
