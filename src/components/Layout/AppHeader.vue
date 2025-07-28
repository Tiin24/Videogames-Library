<script setup lang="ts">
import { useRoute } from 'vue-router'
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import Breadcrumb from '../ui/breadcrumb/Breadcrumb.vue';
import { SidebarTrigger } from '../ui/sidebar';
import { computed } from 'vue';

const route = useRoute();

const pathSegments = computed(() => {
  // Filtra los segmentos vacíos y arma el array de rutas acumuladas
  const segments = route.path.split('/').filter(Boolean);
  return segments.map((segment, idx) => ({
    name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
    to: '/' + segments.slice(0, idx + 1).join('/'),
    isLast: idx === segments.length - 1
  }));
});
</script>

<template>
  <header class="sticky top-0 left-0 flex flex-row justify-between items-center bg-background w-full py-4 z-30">
    <div class="flex flex-row justify-start items-center">
      <SidebarTrigger class="text-gray-700 text-body-foreground hover:text-primary w-auto h-auto p-2"
        variant="outline" />
      <Breadcrumb class="border-s ms-3 px-3 md:ms-4 md:px-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <RouterLink to="/" class="text-foreground hover:text-primary">Home</RouterLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <template v-for="(segment) in pathSegments" :key="segment.to">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <template v-if="!segment.isLast">
                <BreadcrumbLink>
                  <RouterLink :to="segment.to" class="text-foreground hover:text-primary">
                    {{ segment.name }}
                  </RouterLink>
                </BreadcrumbLink>
              </template>
              <template v-else>
                <BreadcrumbPage>
                  {{ segment.name }}
                </BreadcrumbPage>
              </template>
            </BreadcrumbItem>
          </template>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>
</template>
