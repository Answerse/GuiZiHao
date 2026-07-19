import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
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
      path: '/chenpitong',
      name: 'ChenpiTong',
      props: { src: '/chenpitong/index.html' },
      component: () => import('@/views/ChenpiTongPage.vue')
    },
    {
      path: '/chenpitong/product',
      name: 'ChenpiTongProduct',
      props: { src: '/chenpitong/product.html' },
      component: () => import('@/views/ChenpiTongPage.vue')
    }
  ]
})

export default router