import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/detail/:productId',
      name: 'Detail',
      component: () => import('@/views/DetailPage.vue')
    },
    {
      path: '/brand-product/:id',
      name: 'BrandProductDetail',
      component: () => import('@/views/BrandProductDetail.vue')
    },
    {
      path: '/enterprise/:id',
      name: 'EnterpriseDetail',
      component: () => import('@/views/EnterpriseDetail.vue')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('@/views/SearchPage.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterPage.vue')
    },
    {
      path: '/user-center',
      name: 'UserCenter',
      component: () => import('@/views/UserCenterPage.vue')
    }
  ]
})

export default router