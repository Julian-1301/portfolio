import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/project/:slug',
      name: 'project',
      component: () => import('../views/ProjectView.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    // the router ignores scroll-margin, so leave room for the sticky nav here (same gap as base.css)
    if (to.hash) {
      const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'))
      return { el: to.hash, top: (nav || 57) + 16 }
    }
    return { top: 0 }
  },
})
