<script setup>
import { reactiveOmit } from "@vueuse/core";
import { ListboxRoot, useFilter, useForwardPropsEmits } from "reka-ui";
import { reactive, ref, watch } from "vue";
import { cn } from "@/lib/utils";
import { provideCommandContext } from ".";

const props = defineProps({
  modelValue: { type: null, required: false, default: "" },
  defaultValue: { type: null, required: false },
  multiple: { type: Boolean, required: false },
  orientation: { type: String, required: false },
  dir: { type: String, required: false },
  disabled: { type: Boolean, required: false },
  selectionBehavior: { type: String, required: false },
  highlightOnHover: { type: Boolean, required: false },
  by: { type: [String, Function], required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  name: { type: String, required: false },
  required: { type: Boolean, required: false },
  class: { type: null, required: false },
});

const emits = defineEmits([
  "update:modelValue",
  "highlight",
  "entryFocus",
  "leave",
]);

const delegatedProps = reactiveOmit(props, "class");

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const allItems = ref(new Map());
const allGroups = ref(new Map());

const { contains } = useFilter({ sensitivity: "base" });
const filterState = reactive({
  search: "",
  filtered: {
    /** The count of all visible items. */
    count: 0,
    /** Map from visible item id to its search score. */
    items: new Map(),
    /** Set of groups with at least one visible item. */
    groups: new Set(),
  },
});

function filterItems() {
  if (!filterState.search) {
    filterState.filtered.count = allItems.value.size;
    // Do nothing, each item will know to show itself because search is empty
    return;
  }

  // Reset the groups
  filterState.filtered.groups = new Set();
  let itemCount = 0;

  // Check which items should be included
  for (const [id, value] of allItems.value) {
    const score = contains(value, filterState.search);
    filterState.filtered.items.set(id, score ? 1 : 0);
    if (score) itemCount++;
  }

  // Check which groups have at least 1 item shown
  for (const [groupId, group] of allGroups.value) {
    for (const itemId of group) {
      if (filterState.filtered.items.get(itemId) > 0) {
        filterState.filtered.groups.add(groupId);
        break;
      }
    }
  }

  filterState.filtered.count = itemCount;
}

function handleSelect() {
  filterState.search = "";
}

watch(
  () => filterState.search,
  () => {
    filterItems();
  },
);

provideCommandContext({
  allItems,
  allGroups,
  filterState,
});
</script>

<template>
  <ListboxRoot
    data-slot="command"
    v-bind="forwarded"
    :class="
      cn(
        'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
        props.class,
      )
    "
  >
    <slot />
  </ListboxRoot>
</template>
