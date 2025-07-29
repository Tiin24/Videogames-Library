<script setup>
import { CalendarCheck, ChevronDown, CodeXml, DollarSign, Download, Flame, Gamepad2, Ghost, Hash, History, Home, Hourglass, Newspaper, Search, Shuffle, Trophy } from 'lucide-vue-next';
import AppLink from './AppLink.vue';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuItem, useSidebar } from '../ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
// 👇 Importa Tooltip y computed
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { computed } from 'vue';

const { state } = useSidebar();
const isCollapsed = computed(() => state.value === 'collapsed');

const navList = [
  {
    title: 'Pages',
    group: false,
    links: [
      {
        title: 'Home',
        icon: Home,
        path: '/'
      },
      {
        title: 'Advanced search',
        icon: Search
      },
      {
        title: 'Random',
        icon: Shuffle
      },
      {
        title: 'News',
        icon: Newspaper
      },
    ]
  },
  {
    title: 'Trend',
    group: true,
    links: [
      {
        title: 'Popular',
        icon: Flame
      },
      {
        title: 'Best rated',
        icon: Trophy
      }
    ]
  },
  {
    title: 'Planning',
    group: true,
    links: [
      {
        title: 'Recently released',
        icon: History
      },
      {
        title: 'Upcoming release',
        icon: Hourglass
      },
      {
        title: 'Most anticipated',
        icon: CalendarCheck
      }
    ]
  },
  {
    title: 'Browse',
    group: true,
    links: [
      {
        title: 'Genres',
        icon: Ghost
      },
      {
        title: 'Tags',
        icon: Hash
      },
      {
        title: 'Platforms',
        icon: Gamepad2
      },
      {
        title: 'Stores',
        icon: Download
      },
      {
        title: 'Developers',
        icon: CodeXml
      },
      {
        title: 'Publishers',
        icon: DollarSign
      }
    ]
  }
]
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem class="text-center">
          <h1>hola</h1>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <!-- customise -->
      <SidebarGroup>
        <h2>customise</h2>
      </SidebarGroup>
      <!-- NavLinks -->
      <SidebarGroup v-for="(navGroup, navGroupIndex) in navList" :key="navGroupIndex">
        <Collapsible defaultOpen>
          <!-- Si NO está contraído, muestra el trigger normal -->
          <template v-if="!isCollapsed">
            <CollapsibleTrigger class="rounded-md hover:bg-secondary transition-colors w-full">
              <SidebarGroupLabel class="font-bebas tracking-wide text-xl justify-between">
                {{ navGroup.title }}
                <ChevronDown />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
          </template>
          <!-- Si está contraído, NO se muestra nada aquí -->
          <CollapsibleContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="(link, linkIndex) in navGroup.links" :key="linkIndex">
                <!-- Tooltip solo si está colapsado -->
                <TooltipProvider v-if="isCollapsed">
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <AppLink :navGroup="navGroup" :title="link.title" :icon="link.icon" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {{ link.title }}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <AppLink v-else :navGroup="navGroup" :title="link.title" :icon="link.icon" />
              </SidebarMenuItem>
            </SidebarMenu>
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
