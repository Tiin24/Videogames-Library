<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRawgStore } from '@/stores/games';
import ListTemplate from '@/components/template/ListTemplate.vue';
import FilterButton from '@/components/filters/FilterButton.vue';
import FilterYear from '@/components/filters/FilterYear.vue';
import CardGame from '@/components/cards/CardGame.vue';
import { Filter, Search, SlidersHorizontal } from 'lucide-vue-next';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Card, CardContent } from '@/components/ui/card';


const searchText = ref('');

// Store
const store = useRawgStore();

// Config de filtros dinámicos
const filterConfigs = [
  { label: 'Género', type: 'genres' },
  { label: 'Plataforma', type: 'platforms' },
  { label: 'Tienda', type: 'stores' },
  { label: 'Desarrollador', type: 'developers' },
  { label: 'Tags', type: 'tags' },
  { label: 'Publisher', type: 'publishers' },
  { label: 'Ordenar por', type: 'ordering' },
];

// Filtros reactivos
const filters = ref({
  genres: '',
  platforms: '',
  stores: '',
  developers: '',
  tags: '',
  publishers: '',
  ordering: '',
  dates: '',
  search: '', // nuevo
});

const resetQuery = () => {
  filters.value = {
    genres: '',
    platforms: '',
    stores: '',
    developers: '',
    tags: '',
    publishers: '',
    ordering: '',
    dates: '',
    search: '',
  };
  dateRange.value = '';
  searchText.value = '';
  collapseOpen.value = false;
  store.search({}, true);
};


// Rango de fechas
const dateRange = ref('');
watch(dateRange, (val) => {
  filters.value.dates = val;
});

// Query para la store
const query = computed(() => {
  const q = {};
  for (const key in filters.value) {
    if (filters.value[key]) q[key] = filters.value[key];
  }
  return q;
});

// Estado colapsable (desktop)
const collapseOpen = ref(false);

// Resultados y loading
const totalResults = computed(() => store.data.length);
const loading = computed(() => store.loading);

// Cargar datos para filtros
onMounted(async () => {
  for (const config of filterConfigs) {
    if (config.type !== 'ordering') {
      await store.fetchGamesByEndpoint(config.type);
    }
  }
});

watch(searchText, (val) => {
  filters.value.search = val;
});
</script>

<template>
  <ListTemplate title="Búsqueda Avanzada" :icon="SlidersHorizontal" resource="games" :query="query"
    :cardComponent="CardGame" itemPropName="game" :showRating="true">
    <!-- MOBILE FILTERS -->
    <Sheet>
      <div class="sticky md:hidden top-[66px] bg-background pb-4 z-30">
        <div class="relative w-full items-center mb-4">
          <Input id="search" type="text" placeholder="Search..." class="pl-10" v-model="searchText" />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Search class="size-6 text-muted-foreground" />
          </span>
        </div>
        <div class="flex justify-between items-center w-full">
          <div class="flex justify-between items-center">
            <SheetTrigger asChild>
              <Button type="button" variant="outline" class="rounded-r-none" :disabled="loading">
                <Filter />
                Filters
              </Button>
            </SheetTrigger>
            <Button type="button" class="rounded-l-none" @click="resetQuery" :disabled="loading">
              Reset filter
            </Button>
          </div>
          <Skeleton v-if="loading" class="h-6 w-[95px]" />
          <p v-else class="text-sm italic text-muted-foreground ms-3">
            {{ totalResults.toLocaleString('en-US') }} results
          </p>
        </div>

        <SheetContent>
          <SheetHeader class="text-start">
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Select all filters you would apply to results.
            </SheetDescription>
          </SheetHeader>

          <div class="grid grid-cols-1 gap-4 py-4">
            <FilterYear v-model="dateRange" />
            <FilterButton v-for="config in filterConfigs" :key="config.type" :type="config.type" :label="config.label"
              v-model="filters[config.type]" />
          </div>

          <SheetFooter>
            <SheetClose as-child>
              <Button type="button" @click="resetQuery">
                Reset filter
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </div>
    </Sheet>

    <!-- DESKTOP FILTERS -->
    <Collapsible v-model:open="collapseOpen" class="hidden md:block sticky top-[66px] bg-background pb-4 z-30">
      <div class="relative w-full items-center mb-4">
        <Input id="search" type="text" placeholder="Search..." class="pl-10" v-model="searchText" />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
          <Search class="size-6 text-muted-foreground" />
        </span>
      </div>

      <div class="flex justify-between items-center w-full">
        <div class="flex justify-between items-center">
          <CollapsibleTrigger :disabled="loading" asChild>
            <Button type="button" variant="outline" :class="{
              'rounded-r-none': true,
              'rounded-bl-none border-b-0': collapseOpen
            }" :disabled="loading">
              <Filter />
              Filters
            </Button>
          </CollapsibleTrigger>
          <Button type="button" :class="{
            'rounded-l-none': true,
            'rounded-br-none border-b-0': collapseOpen
          }" @click="resetQuery" :disabled="loading">
            Reset filter
          </Button>
        </div>

        <Skeleton v-if="loading" class="h-6 w-[95px]" />
        <p v-else class="text-sm italic text-muted-foreground ms-3">
          {{ totalResults.toLocaleString('en-US') }} results
        </p>
      </div>

      <CollapsibleContent>
        <Card :class="{ 'rounded-tl-none': collapseOpen }">
          <CardContent class="p-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-2">
              <FilterYear v-model="dateRange" />
              <FilterButton v-for="config in filterConfigs" :key="config.type" :type="config.type" :label="config.label"
                v-model="filters[config.type]" />
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  </ListTemplate>
</template>
