<script setup lang="ts">
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppHeader from '@/components/Layout/AppHeader.vue';
import AppSidebar from '@/components/Layout/AppSidebar.vue';
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="relative container w-[calc(100%-var(--sidebar-width))] px-4 sm:px-8">
      <AppHeader />
      <div class="flex-grow p-4">
        <router-view />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
