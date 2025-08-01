<script setup>
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppHeader from '@/components/Layout/AppHeader.vue';
import AppSidebar from '@/components/Layout/AppSidebar.vue';
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="relative container w-[calc(100%-var(--sidebar-width))] px-4 sm:px-8">
      <AppHeader />
      <div class="flex-grow">
        <main>
          <router-view />
        </main>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<style>
body {
  overflow: visible !important;
}

.animation-enter-active,
.animation-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.animation-enter-from {
  opacity: 0;
}

.animation-leave-to {
  opacity: 0;
}

.font-bebas {
  font-family: 'Bebas Neue', sans-serif;
}
</style>
