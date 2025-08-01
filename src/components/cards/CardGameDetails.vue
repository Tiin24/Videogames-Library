<script setup>
import { AlertCircle } from 'lucide-vue-next'
import SectionBanner from '../sections/SectionBanner.vue'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { computed, onMounted, ref } from 'vue'
import { useRawgStore } from '@/stores/games'
import SectionAbout from '../sections/SectionAbout.vue'
import SectionScreenshots from '../sections/SectionScreenshots.vue'
const store = useRawgStore()

const props = defineProps({
  game: { type: Object, required: true },
  loading: { type: Boolean, default: false }
})

console.log(props)

const additions = computed(() => store.additions || { results: [] })
const achievements = computed(() => store.achievements || { results: [] })
const parents = computed(() => store.parents || { results: [] })
const series = computed(() => store.series || { results: [] })

function isDesktop() {
  return window.matchMedia('(min-width: 1280px)').matches;
}

const screenshots = ref([])

onMounted(async () => {
  const result = await store.fetchScreenshots(props.game.id)
  screenshots.value = result
})

</script>

<template>
  <div class="overflow-hidden">
    <div v-if="game === null && !loading">
      <Alert variant="destructive">
        <AlertCircle class="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p>No game associated to this id : {{ id }}</p>
          <router-link to="/" class="font-medium hover:text-primary focus:text-primary underline underline-offset-4">
            Back to the homepage
          </router-link>
        </AlertDescription>
      </Alert>
    </div>
    <template v-else>
      <SectionBanner :game="game" :loading="loading" data-aos="fade-up" />
      <div :class="{
        'grid grid-cols-1 xl:grid-cols-2 gap-6': true,
        'mb-6': additions.results.length || achievements.results.length || parents.results.length || series.results.length
      }">
        <div class="flex flex-col gap-6">
          <SectionAbout :game="game" :loading="loading" :data-aos="isDesktop() ? 'fade-right' : 'fade-up'" />
        </div>
        <div v-if="screenshots.length || game?.metacritic || game?.rating" class="flex flex-col gap-6">
          <SectionScreenshots :screenshots="screenshots" :loading="loading" />
          <!-- <SectionMetascore :data-aos="isDesktop() ? 'fade-left' : 'fade-up'" :model="game" /> -->
        </div>
      </div>
    </template>
  </div>
</template>
