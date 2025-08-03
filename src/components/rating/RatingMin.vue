<template>
  <NumberTicker
    :class="`font-semibold border leading-tight rounded-md h-[26px] pl-[5px] pr-[6px] ${borderColor} ${textColor}`"
    :value="rating" :decimalPlaces="maxRating === 100 ? 0 : 2" />
</template>

<script setup>
import { computed } from 'vue'
import { NumberTicker } from '@/components/ui/number-ticker'

const props = defineProps({
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  maxRating: {
    type: Number,
    required: true,
    default: 0
  }
})

const percentage = computed(() => (props.rating / props.maxRating) * 100)

const borderColor = computed(() => {
  if (percentage.value >= 80) return 'border-[#22c55e]'
  if (percentage.value >= 60) return 'border-[#eab308]'
  if (percentage.value >= 40) return 'border-[#f97316]'
  return 'border-[#ef4444]'
})

const textColor = computed(() => {
  if (percentage.value >= 80) return 'text-[#22c55e]'
  if (percentage.value >= 60) return 'text-[#eab308]'
  if (percentage.value >= 40) return 'text-[#f97316]'
  return 'text-[#ef4444]'
})
</script>
