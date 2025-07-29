import HomeView from '@/views/HomeView.vue'
import DashboardLayout from '../layout/DashboardLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'advanced-search',
          name: 'advanced-search',
          component: () => import('../views/advanced-search.vue'),
        },
        {
          path: 'random',
          name: 'random',
          component: () => import('../views/random.vue'),
        },
        {
          path: 'news',
          name: 'news',
          component: () => import('../views/news.vue'),
        },

        // Trend
        {
          path: 'trend',
          redirect: '/trend/popular'
        },
        {
          path: 'trend/popular',
          name: 'trend-popular',
          component: () => import('../views/trend/popular.vue'),
        },
        {
          path: 'trend/best-rated',
          name: 'trend-best-rated',
          component: () => import('../views/trend/best-rated.vue'),
        },

        // Planning
        {
          path: 'planning',
          redirect: '/planning/recently-released'
        },
        {
          path: 'planning/recently-released',
          name: 'planning-recently-released',
          component: () => import('../views/planning/recently-released.vue'),
        },
        {
          path: 'planning/upcoming-release',
          name: 'planning-upcoming-release',
          component: () => import('../views/planning/upcoming-release.vue'),
        },
        {
          path: 'planning/most-anticipated',
          name: 'planning-most-anticipated',
          component: () => import('../views/planning/most-anticipated.vue'),
        },

        // Browse
        {
          path: 'browse',
          redirect: '/browse/genres'
        },
        {
          path: 'browse/genres',
          name: 'browse-genres',
          component: () => import('../views/browse/genres.vue'),
        },
        {
          path: 'browse/tags',
          name: 'browse-tags',
          component: () => import('../views/browse/tags.vue'),
        },
        {
          path: 'browse/platforms',
          name: 'browse-platforms',
          component: () => import('../views/browse/platforms.vue'),
        },
        {
          path: 'browse/stores',
          name: 'browse-stores',
          component: () => import('../views/browse/stores.vue'),
        },
        {
          path: 'browse/developers',
          name: 'browse-developers',
          component: () => import('../views/browse/developers.vue'),
        },
        {
          path: 'browse/publishers',
          name: 'browse-publishers',
          component: () => import('../views/browse/publishers.vue'),
        },
      ],
    },
  ],
})

export default router
