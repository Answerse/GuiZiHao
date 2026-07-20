<script setup lang="ts">
import { useRouter } from 'vue-router'
import { products } from '@/data/products'
import { enterprises } from '@/data/enterprises'
import { brandProducts } from '@/data/brand-products'

defineProps({
  activeTab: {
    type: Number,
    default: 0
  }
})

const router = useRouter()

function goDetail(id: number) {
  router.push({ name: 'Detail', params: { productId: id } })
}

function goBrandProductDetail(bp: typeof brandProducts[0]) {
  router.push({ name: 'BrandProductDetail', params: { id: bp.id } })
}

function goEnterpriseDetail(id: number) {
  router.push({ name: 'EnterpriseDetail', params: { id } })
}
</script>

<template>
  <div class="product-section">
    <div class="product-content">
      <!-- 区域公用品牌 -->
      <template v-if="activeTab === 0">
        <div class="product-grid">
          <div v-for="product in products" :key="product.id" class="region-card" @click="goDetail(product.id)">
            <div class="region-card-image">
              <img :src="product.image" :alt="product.title">
            </div>
            <div class="region-card-body">
              <h3 class="region-card-title">{{ product.title }}</h3>
              <p class="region-card-desc">{{ product.description }}</p>
              <div class="region-card-footer">
                <span class="region-card-more">了解更多</span>
                <div class="region-card-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 22" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.6805 10.1377C24.1065 10.5637 24.1065 11.2545 23.6805 11.6805L13.8623 21.4987C13.4363 21.9247 12.7455 21.9247 12.3195 21.4987C11.8935 21.0726 11.8935 20.3819 12.3195 19.9559L20.2754 12H1.09091C0.488417 12 -2.63358e-08 11.5116 0 10.9091C2.63358e-08 10.3066 0.488417 9.81818 1.09091 9.81818H20.2754L12.3195 1.8623C11.8935 1.43627 11.8935 0.745546 12.3195 0.31952C12.7455 -0.106507 13.4363 -0.106507 13.8623 0.31952L23.6805 10.1377Z" fill="#101215"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 农产品品牌 -->
      <template v-if="activeTab === 1">
        <div class="product-grid brand-product-grid">
          <div v-for="bp in brandProducts" :key="bp.id" class="brand-product-card" @click="goBrandProductDetail(bp)">
            <div class="brand-product-card-image">
              <img :src="bp.logo" :alt="bp.name">
            </div>
            <div class="brand-product-card-body">
              <h3 class="brand-product-card-title">{{ bp.fullName }}</h3>
              <p class="brand-product-card-desc">{{ bp.description }}</p>
              <div class="brand-product-card-footer">
                <span class="brand-product-card-more">了解更多</span>
                <div class="brand-product-card-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 22" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.6805 10.1377C24.1065 10.5637 24.1065 11.2545 23.6805 11.6805L13.8623 21.4987C13.4363 21.9247 12.7455 21.9247 12.3195 21.4987C11.8935 21.0726 11.8935 20.3819 12.3195 19.9559L20.2754 12H1.09091C0.488417 12 -2.63358e-08 11.5116 0 10.9091C2.63358e-08 10.3066 0.488417 9.81818 1.09091 9.81818H20.2754L12.3195 1.8623C11.8935 1.43627 11.8935 0.745546 12.3195 0.31952C12.7455 -0.106507 13.4363 -0.106507 13.8623 0.31952L23.6805 10.1377Z" fill="#101215"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 农业企业品牌 -->
      <template v-if="activeTab === 2">
        <div class="product-grid">
          <div v-for="enterprise in enterprises" :key="enterprise.id" class="enterprise-card" @click="goEnterpriseDetail(enterprise.id)">
            <div class="enterprise-card-image">
              <img :src="enterprise.logo" :alt="enterprise.name">
            </div>
            <div class="enterprise-card-body">
              <h3 class="enterprise-card-title">{{ enterprise.name }}</h3>
              <p class="enterprise-card-desc">{{ enterprise.description }}</p>
              <div class="enterprise-card-footer">
                <span class="enterprise-card-more">了解更多</span>
                <div class="enterprise-card-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 22" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.6805 10.1377C24.1065 10.5637 24.1065 11.2545 23.6805 11.6805L13.8623 21.4987C13.4363 21.9247 12.7455 21.9247 12.3195 21.4987C11.8935 21.0726 11.8935 20.3819 12.3195 19.9559L20.2754 12H1.09091C0.488417 12 -2.63358e-08 11.5116 0 10.9091C2.63358e-08 10.3066 0.488417 9.81818 1.09091 9.81818H20.2754L12.3195 1.8623C11.8935 1.43627 11.8935 0.745546 12.3195 0.31952C12.7455 -0.106507 13.4363 -0.106507 13.8623 0.31952L23.6805 10.1377Z" fill="#101215"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="product-pagination">
        <button class="pagination-btn pagination-prev">
          <svg width="13" height="24" viewBox="0 0 13 24" fill="none">
            <path d="M11 2L3 12L11 22" stroke="#101215" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <button class="pagination-page pagination-page-active">1</button>
        <button class="pagination-page">2</button>
        <button class="pagination-btn pagination-next">
          <svg width="13" height="24" viewBox="0 0 13 24" fill="none">
            <path d="M2 2L10 12L2 22" stroke="#101215" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>