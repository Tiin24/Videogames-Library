<script setup>
import { ref, computed, onMounted } from 'vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, Award, FolderOpen } from 'lucide-vue-next'

import SectionBanner from '../sections/SectionBanner.vue'
import SectionAbout from '../sections/SectionAbout.vue'
import SectionScreenshots from '../sections/SectionScreenshots.vue'
import SectionMetascore from '../sections/SectionMetascore.vue'
import SectionRawg from '../sections/SectionRawg.vue'
import ResultPaginateTemplate from '../template/ResultPaginateTemplate.vue'
import CardArchivement from './CardArchivement.vue'

import { useRawgStore } from '@/stores/games'
import { storeToRefs } from 'pinia'

const props = defineProps({
  gameId: {
    type: [String, Number],
    required: true
  }
})

const store = useRawgStore()
const { dataMap } = storeToRefs(store)

const game = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    game.value = await store.fetchGameDetails(props.gameId)

    await Promise.all([
      store.fetchGameEndpoint(props.gameId, 'additions'),
      store.fetchGameEndpoint(props.gameId, 'achievements'),
      store.fetchGameEndpoint(props.gameId, 'parent-games'),
      store.fetchGameEndpoint(props.gameId, 'game-series'),
      store.fetchGameEndpoint(props.gameId, 'screenshots')
    ])
  } catch (err) {
    error.value = 'Error al cargar los detalles del juego.'
    console.error(err)
  } finally {
    loading.value = false
  }
})

const additions = computed(() => dataMap.value[`${props.gameId}-additions`] || [])
const achievements = computed(() => dataMap.value[`${props.gameId}-achievements`] || [])
const parents = computed(() => dataMap.value[`${props.gameId}-parent-games`] || [])
const series = computed(() => dataMap.value[`${props.gameId}-game-series`] || [])
const screenshots = computed(() => dataMap.value[`${props.gameId}-screenshots`] || [])
</script>

<template>
  <div class="overflow-hidden">
    <Alert v-if="error" variant="destructive" class="mb-6">
      <AlertCircle class="w-4 h-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {{ error }}
        <br />
        <router-link to="/" class="underline">Volver al inicio</router-link>
      </AlertDescription>
    </Alert>

    <template v-else-if="game">
      <SectionBanner :game="game" :loading="loading" />

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col gap-6">
          <SectionAbout :game="game" :loading="loading" />
        </div>
        <div v-if="screenshots.length || game.metacritic || game.rating" class="flex flex-col gap-6">
          <SectionScreenshots :screenshots="screenshots" :loading="loading" v-if="screenshots.length" />
          <SectionMetascore :game="game" />
          <SectionRawg :game="game" />
        </div>
      </div>

      <ResultPaginateTemplate :gameId="game.id" title="DLCs, remakes, remasters..." endpoint="additions"
        :icon="FolderOpen" :pageTotal="additions.length" :loading="loading" />

      <ResultPaginateTemplate :gameId="game.id" title="Achievements" endpoint="achievements" :icon="Award"
        wrapperClass="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6" :pageTotal="achievements.length"
        :pageSize="6" :loading="loading" :card="CardArchivement" />

      <ResultPaginateTemplate :gameId="game.id" title="Original game" endpoint="parent-games" :icon="FolderOpen"
        :pageTotal="parents.length" :loading="loading" />

      <ResultPaginateTemplate :gameId="game.id" title="In the same series" endpoint="game-series" :icon="FolderOpen"
        :pageTotal="series.length" :loading="loading" />
    </template>
  </div>
</template>
