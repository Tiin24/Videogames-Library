<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js'
import { NumberTicker } from '../ui/number-ticker'

Chart.register(DoughnutController, ArcElement, Tooltip)

const props = defineProps({
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  maxRating: {
    type: Number,
    required: true,
    default: 100
  }
})

const chartCanvas = ref(null)
let chartInstance = null

const percentage = computed(() => (props.rating / props.maxRating) * 100)

const ratingColor = computed(() => {
  if (percentage.value >= 80) return '#22c55e' // green
  if (percentage.value >= 60) return '#eab308' // yellow
  if (percentage.value >= 40) return '#f97316' // orange
  return '#ef4444' // red
})

const createChart = () => {
  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(chartCanvas.value, {
    type: 'doughnut',
    data: {
      labels: ['Rating', 'Remaining'],
      datasets: [{
        data: [props.rating, props.maxRating - props.rating],
        backgroundColor: [ratingColor.value, '#e5e7eb'], // gray background
        borderWidth: 0,
        cutout: '75%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: { enabled: false }
      }
    }
  })
}

onMounted(() => {
  createChart()
})

watch(() => props.rating, () => {
  createChart()
})

watch(() => props.maxRating, () => {
  createChart()
})
</script>

<template>
  <div class="w-[7rem] h-[7rem] relative mx-auto">
    <canvas ref="chartCanvas" />
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
      <div class="text-xl font-bold">
        <NumberTicker class="text-secondary-foreground" :value="rating" :decimalPlaces="0" />
        <span class="text-muted-foreground">/{{ maxRating }}</span>
      </div>
    </div>
  </div>
</template>
