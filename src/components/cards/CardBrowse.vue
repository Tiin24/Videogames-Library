<script setup>
import { ref, watch } from 'vue';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import placeholderImg from '../../assets/images/placeholder-image.png';
import { LoaderCircle } from 'lucide-vue-next';
import Separator from '../ui/separator/Separator.vue';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';

// Props
const props = defineProps({
  model: {
    type: Object,
    required: true
  }
});

// Imagen cargada
const isLoaded = ref(false);

const handleImageLoad = () => {
  isLoaded.value = true;
};

// Resetear estado si cambia la imagen (por ejemplo, si se reusa el componente)
watch(() => props.model.image_background, () => {
  isLoaded.value = false;
});

// Utilidad defensiva
const hasProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
</script>

<template>
  <router-link to=" " class="group block">
    <Card
      class="relative flex flex-col overflow-hidden w-full h-[16.125rem] rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.015]">

      <!-- Imagen -->
      <img :src="model.image_background ?? placeholderImg" :alt="`Cover of the card ${model.name}`"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        @load="handleImageLoad" />

      <!-- Loader mientras carga -->
      <div v-if="!isLoaded"
        class="absolute inset-0 flex items-center justify-center bg-black/40 z-20 pointer-events-none">
        <LoaderCircle class="animate-spin text-white w-6 h-6" />
      </div>

      <!-- Overlays -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
      <div class="absolute inset-0 bg-black/50 z-10" />

      <!-- Contenido -->
      <div class="relative z-10 flex flex-col justify-between h-full p-4 text-white">
        <div class="text-center">
          <CardTitle class="text-lg font-bold tracking-wide leading-snug">
            {{ model.name }}
            <template v-if="hasProperty(model, 'year_start') && model.year_start !== null">
              ({{ model.year_start }})
            </template>
          </CardTitle>
          <CardDescription class="text-sm italic mt-1">
            ({{ model.games_count }} games)
          </CardDescription>
        </div>

        <CardContent class="mt-4 p-0">
          <Separator class="bg-white opacity-60 w-1/2 mx-auto mb-3" />
          <Table class="text-center text-sm no-hover">
            <TableBody class="scrollable-body">
              <TableRow v-for="(game, index) in (model.games || []).slice(0, 3)" :key="index" class="border-0">
                <TableCell class="p-0 text-white/90 truncate">
                  {{ game.name }}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </div>
    </Card>
  </router-link>
</template>
