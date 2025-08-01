<script setup>
import { ref, watch, computed } from 'vue';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const props = defineProps({
  modelValue: String  // Añade prop para v-model
});

console.log("FilterYear props:", props);

const emit = defineEmits(['update:modelValue']);

const startYear = ref('');
const endYear = ref('');
const currentYear = new Date().getFullYear();

const specificRange = computed(() => startYear.value && endYear.value);
const labelBadge = computed(() =>
  specificRange.value ? `${startYear.value} - ${endYear.value}` : ''
);

watch([startYear, endYear], () => {
  if (specificRange.value) {
    const range = `${startYear.value}-01-01,${endYear.value}-12-31`;
    emit('update:modelValue', range);  // Actualizado para v-model
  } else {
    emit('update:modelValue', '');
  }
});

const reset = () => {
  startYear.value = '';
  endYear.value = '';
};
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button type="button" class="justify-start px-4 py-2 gap-2" variant="outline">
        <span>Seleccionar rango...</span>
        <Badge v-if="specificRange" class="font-bold text-sm px-2 py-0.5 bg-muted border border-input"
          variant="secondary">
          {{ labelBadge }}
        </Badge>
      </Button>
    </DrawerTrigger>

    <DrawerContent class="rounded-t-xl shadow-2xl">
      <div class="mx-auto w-full max-w-sm">
        <DrawerHeader class="space-y-1">
          <DrawerTitle class="text-center text-lg font-semibold">
            Seleccionar rango de años
          </DrawerTitle>
          <DrawerDescription class="text-center italic text-sm text-muted-foreground">
            entre 1980 y {{ currentYear }}
          </DrawerDescription>
        </DrawerHeader>

        <div class="p-6 space-y-4">
          <div class="flex gap-2">
            <Input type="number" v-model="startYear" :max="endYear || currentYear" min="1980" placeholder="Desde" />
            <Input type="number" v-model="endYear" :min="startYear || 1980" :max="currentYear" placeholder="Hasta" />
          </div>
        </div>

        <DrawerFooter class="space-y-2 px-6 pb-6">
          <DrawerClose as-child>
            <Button type="button" class="w-full">Aplicar</Button>
          </DrawerClose>
          <DrawerClose as-child v-if="specificRange">
            <Button type="button" variant="outline" class="w-full" @click="reset">
              Limpiar filtro
            </Button>
          </DrawerClose>
          <DrawerClose as-child>
            <Button type="button" variant="ghost" class="w-full">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>
