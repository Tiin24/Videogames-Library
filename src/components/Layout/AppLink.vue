<template>
  <SidebarMenuButton asChild>
    <RouterLink :to="setLink(navGroup, title)" :class="[
      'transition-colors flex items-center gap-2 px-3 py-2 rounded-md',
      route.path === setLink(navGroup, title)
        ? 'text-primary-foreground bg-primary'
        : 'text-background-foreground hover:bg-secondary'
    ]" @click="setRoute(setLink(navGroup, title))">
      <span v-if="icon" class="w-4 h-4 flex items-center justify-center">
        <component :is="icon" />
      </span>
      <span class="text-sm font-medium">{{ title }}</span>
    </RouterLink>
  </SidebarMenuButton>
</template>



<script setup>
import slugify from "slugify";
import { useRoute, useRouter } from 'vue-router'
import { SidebarMenuButton, useSidebar } from "../ui/sidebar";

// * PROPS
defineProps({
  navGroup: {
    type: Object,
    required: true,
    default: () => { return {}; }
  },
  title: {
    type: String,
    required: true,
    default: ""
  },
  icon: {
    type: Function,
    required: true,
  },
})

// * DATA
const { setOpenMobile, isMobile } = useSidebar()
const route = useRoute()
const router = useRouter()

// * MÉTODOS

/**
  * Assign data from props.
  * @param {Object} navGroup - Navigation group object
  * @param {string} title - Title string
  * @return {string} Generated link
  */
function setLink(navGroup, title) {
  if (title === 'Home') return '/'; // 👈 solución directa

  const groupPath = navGroup.group ? '/' + slugify(navGroup.title, { lower: true, strict: true, trim: true }) : '';
  const titlePath = '/' + slugify(title, { lower: true, strict: true, trim: true });

  return groupPath + titlePath;
}


/**
  * Set the new route.
  * @param {string} newRoute - New route to navigate to
  * @return {void}
  */
function setRoute(newRoute) {
  if (isMobile) {
    setOpenMobile(false)
  }
  router.replace(newRoute);
}
</script>
