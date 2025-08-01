<script setup>
import { ref, onMounted } from 'vue';
import { useRawgStore } from '@/stores/games';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, Check } from 'lucide-vue-next';

const props = defineProps({
  type: String,
  label: String,
  modelValue: [String, Number]  // Añade prop para v-model
});

const emit = defineEmits(['update:modelValue']);
const selected = ref('');
const open = ref(false);
const options = ref([]);
const store = useRawgStore();

const ORDERING_OPTIONS = [
  { label: 'Nombre (A-Z)', value: 'name' },
  { label: 'Nombre (Z-A)', value: '-name' },
  { label: 'Fecha más reciente', value: '-released' },
  { label: 'Fecha más antigua', value: 'released' },
  { label: 'Rating mayor', value: '-rating' },
  { label: 'Rating menor', value: 'rating' },
];

const loadOptions = async () => {
  if (props.type === 'ordering') {
    options.value = ORDERING_OPTIONS;
    return;
  }

  await store.fetchGamesByEndpoint(props.type);
  options.value = store.dataMap[props.type] || [];
};

onMounted(() => {
  loadOptions();
});

const getOptionLabel = (value) => {
  const match = options.value.find(
    (opt) => (props.type === 'ordering' ? opt.value : opt.id) === value
  );
  return match?.label || match?.name || 'Todos';
};

const updateSelection = (value) => {
  selected.value = value;
  emit('update:modelValue', value);  // Actualizado para v-model
  open.value = false;
};
</script>

<template>
  <div class="space-y-1">

    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button type="button" variant="outline" role="combobox"
          class="justify-between w-full rounded-md px-3 py-2 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground">
          <span class="truncate max-w-[180px]">
            {{ selected ? getOptionLabel(selected) : 'Todos' }}
          </span>
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent class="w-[250px] p-0">
        <Command>
          <CommandInput class="h-9 px-3" placeholder="Buscar opción..." />
          <CommandEmpty class="p-4 text-sm text-muted-foreground">
            No hay resultados.
          </CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem value="" @select="() => updateSelection('')"
                class="px-3 py-2 flex items-center justify-between">
                Todos
                <Check :class="['h-4 w-4', selected === '' ? 'opacity-100' : 'opacity-0']" />
              </CommandItem>

              <CommandItem v-for="option in options" :key="option.id || option.value"
                :value="props.type === 'ordering' ? option.value : option.id" @select="() =>
                  updateSelection(props.type === 'ordering' ? option.value : option.id)"
                class="px-3 py-2 flex items-center justify-between">
                {{ option.label || option.name }}
                <Check :class="[
                  'h-4 w-4',
                  selected === (props.type === 'ordering' ? option.value : option.id)
                    ? 'opacity-100 text-primary'
                    : 'opacity-0',
                ]" />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>
