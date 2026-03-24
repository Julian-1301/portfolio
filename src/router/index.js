import { createRouter, createWebHistory } from 'vue-router'
import HomeView        from '../views/HomeView.vue'
import HowItWorksView  from '../views/HowItWorksView.vue'
import DemoView        from '../views/DemoView.vue'
import PrivacyView     from '../views/PrivacyView.vue'

const routes = [
  { path: '/',            component: HomeView,       meta: { title: 'IRIS — Home' } },
  { path: '/how-it-works',component: HowItWorksView, meta: { title: 'IRIS — How It Works' } },
  { path: '/demo',        component: DemoView,       meta: { title: 'IRIS — Live Demo' } },
  { path: '/privacy',     component: PrivacyView,    meta: { title: 'IRIS — Privacy' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((to) => {
  document.title = to.meta.title || 'IRIS'
})

export default router
