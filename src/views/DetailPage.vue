<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Header from '@/components/Header.vue'
import FooterSection from '@/components/FooterSection.vue'
import { products } from '@/data/products'

const route = useRoute()
const router = useRouter()

const product = computed(() => {
  const id = Number(route.params.productId)
  return products.find(p => p.id === id) || products[0]
})

const categoryTabMap: Record<string, number> = {
  '区域公用品牌': 0,
  '农业企业品牌': 1,
  '农产品品牌': 2
}

const categoryTabIndex = computed(() => categoryTabMap[product.value.category] ?? 0)

// ---- 订单分布：时间筛选 ----
const timeRanges = ['近 7 日', '近 30 天', '近 3 月', '近 1 年', '自定义']
const activeRange = ref(1)

// ---- 订单分布：图例 ----
type LegendKey = 'green' | 'orange' | 'blue' | 'purple' | 'red'

interface LegendItem {
  key: LegendKey
  label: string
  dot: string
  visible: boolean
}

const legends = ref<LegendItem[]>([
  { key: 'green', label: '1-99 单', dot: '#22C55E', visible: true },
  { key: 'orange', label: '100-999 单', dot: '#EA580C', visible: true },
  { key: 'blue', label: '1000-4999 单', dot: '#1D4ED8', visible: true },
  { key: 'purple', label: '5000-9999 单', dot: '#5B21B6', visible: true },
  { key: 'red', label: '10000-99999 单', dot: '#991B1B', visible: false }
])

interface Bubble {
  x: number
  y: number
  size: number
  color: string
  value: string
  cat: LegendKey
}

// 气泡坐标 = 设计稿气泡组(200, 8) + 组内位置
const BUBBLES: Bubble[] = [
  // red 10000单 90px
  { x: 725, y: 492, size: 90, color: 'var(--color-chart-red-80)', value: '10000', cat: 'red' },
  { x: 382, y: 416, size: 90, color: 'var(--color-chart-red-80)', value: '10000', cat: 'red' },
  { x: 465, y: 603, size: 90, color: 'var(--color-chart-red-80)', value: '10000', cat: 'red' },
  { x: 514, y: 507, size: 90, color: 'var(--color-chart-red-80)', value: '10000', cat: 'red' },
  { x: 349, y: 522, size: 90, color: 'var(--color-chart-red-80)', value: '10000', cat: 'red' },
  { x: 425, y: 486, size: 90, color: 'var(--color-chart-red-80)', value: '10000', cat: 'red' },
  // blue 4999 70px
  { x: 674, y: 282, size: 70, color: 'var(--color-chart-blue-80)', value: '4999', cat: 'blue' },
  { x: 596, y: 390, size: 70, color: 'var(--color-chart-blue-80)', value: '4999', cat: 'blue' },
  { x: 674, y: 387, size: 70, color: 'var(--color-chart-blue-80)', value: '4999', cat: 'blue' },
  { x: 682, y: 564, size: 70, color: 'var(--color-chart-blue-80)', value: '4999', cat: 'blue' },
  { x: 520, y: 399, size: 70, color: 'var(--color-chart-blue-80)', value: '4999', cat: 'blue' },
  { x: 925, y: 547, size: 70, color: 'var(--color-chart-blue-80)', value: '4999', cat: 'blue' },
  // purple 9999 80px
  { x: 808, y: 315, size: 80, color: 'var(--color-chart-purple-80)', value: '9999', cat: 'purple' },
  { x: 741, y: 284, size: 80, color: 'var(--color-chart-purple-80)', value: '9999', cat: 'purple' },
  { x: 752, y: 572, size: 80, color: 'var(--color-chart-purple-80)', value: '9999', cat: 'purple' },
  // orange 999 60px
  { x: 503, y: 329, size: 60, color: 'var(--color-chart-orange-80)', value: '999', cat: 'orange' },
  { x: 200, y: 132, size: 60, color: 'var(--color-chart-orange-80)', value: '999', cat: 'orange' },
  { x: 425, y: 8, size: 60, color: 'var(--color-chart-orange-80)', value: '999', cat: 'orange' },
  { x: 371, y: 27, size: 60, color: 'var(--color-chart-orange-80)', value: '999', cat: 'orange' },
  // green 99 50px
  { x: 478, y: 447, size: 50, color: 'var(--color-chart-green-80)', value: '99', cat: 'green' },
  { x: 554, y: 282, size: 50, color: 'var(--color-chart-green-80)', value: '99', cat: 'green' },
  { x: 571, y: 459, size: 50, color: 'var(--color-chart-green-80)', value: '99', cat: 'green' },
  { x: 786, y: 390, size: 50, color: 'var(--color-chart-green-80)', value: '99', cat: 'green' },
  { x: 836, y: 370, size: 50, color: 'var(--color-chart-green-80)', value: '99', cat: 'green' },
  { x: 225, y: 13, size: 50, color: 'var(--color-chart-green-80)', value: '99', cat: 'green' },
  { x: 351, y: 86, size: 50, color: 'var(--color-chart-green-80)', value: '99', cat: 'green' },
  { x: 298, y: 34, size: 50, color: 'var(--color-chart-green-80)', value: '99', cat: 'green' },
  { x: 293, y: 134, size: 50, color: 'var(--color-chart-green-80)', value: '99', cat: 'green' }
]

const bubbles = ref<Bubble[]>(BUBBLES)

const visibleBubbles = computed(() =>
  bubbles.value.filter(b => legends.value.find(l => l.key === b.cat)?.visible)
)

function toggleLegend(index: number) {
  legends.value[index].visible = !legends.value[index].visible
  renderMarkers()
}

// ---- 订单分布：Leaflet 真实地图 ----
const mapEl = ref<HTMLDivElement | null>(null)
let map: L.Map | null = null
let markerLayer: L.LayerGroup | null = null

// 设计稿地图容器 1200×640 线性映射到广西经纬度范围
const MAP_WIDTH = 1200
const LngMin = 104.5
const LngMax = 112
const LatMin = 20.9
const LatMax = 26.4

function toLatLng(x: number, y: number): [number, number] {
  const lng = LngMin + (x / MAP_WIDTH) * (LngMax - LngMin)
  const lat = LatMax - (y / 640) * (LatMax - LatMin)
  return [lat, lng]
}

function renderMarkers() {
  if (!map) return
  if (markerLayer) {
    map.removeLayer(markerLayer)
    markerLayer = null
  }
  const layer = L.layerGroup()
  visibleBubbles.value.forEach(b => {
    const [lat, lng] = toLatLng(b.x, b.y)
    const size = b.size + 16 + 4 // 内层数值区 + padding 8×2 + border 2×2
    const icon = L.divIcon({
      className: 'detail-map-icon',
      html: `<div class="map-bubble" style="width:${size}px;height:${size}px;background-color:${b.color};">
        <div class="bubble-value" style="width:${b.size}px;height:${b.size}px;">
          <span class="bubble-num">${b.value}</span><span class="bubble-unit">单</span>
        </div>
      </div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    })
    const marker = L.marker([lat, lng], { icon })
    marker.on('mouseover', () => {
      hoveredBubble.value = b
      updateTooltipPos()
    })
    marker.on('mouseout', () => {
      hoveredBubble.value = null
    })
    marker.addTo(layer)
  })
  markerLayer = layer
  layer.addTo(map)
}

function initMap() {
  if (!mapEl.value || map) return
  map = L.map(mapEl.value, {
    center: [23.65, 108.3], // 广西中心
    zoom: 7, // 放大到广西区内
    zoomSnap: 0.5,
    scrollWheelZoom: false
  })
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(map)
  map.on('move zoom', updateTooltipPos)
  renderMarkers()
  window.addEventListener('resize', onMapResize)
}

function onMapResize() {
  if (map) map.invalidateSize()
}

onMounted(initMap)

onBeforeUnmount(() => {
  window.removeEventListener('resize', onMapResize)
  if (map) {
    map.remove()
    map = null
    markerLayer = null
  }
})

// ---- 订单分布：悬停详情 ----
const TOOLTIP_WIDTH = 560
const TOOLTIP_HEIGHT = 150

const hoveredBubble = ref<Bubble | null>(null)
const tooltipPos = ref({ left: 0, top: 0 })

// 根据气泡在真实地图容器中的实时位置定位弹窗（气泡上方居中）
function updateTooltipPos() {
  const b = hoveredBubble.value
  if (!b || !map) return
  const [lat, lng] = toLatLng(b.x, b.y)
  const point = map.latLngToContainerPoint([lat, lng])
  const size = map.getSize()
  tooltipPos.value = {
    left: Math.max(0, Math.min(point.x - TOOLTIP_WIDTH / 2, size.x - TOOLTIP_WIDTH)),
    top: Math.max(0, point.y - b.size / 2 - TOOLTIP_HEIGHT)
  }
}

// 悬停详情 mock 数据：由设计稿示例（4999 单 → 56,330.20 元 / 1,020.50 公斤）推导单均价与单重，
// 悬停不同气泡时按气泡订单数动态计算
const AMOUNT_PER_ORDER = 56330.2 / 4999
const WEIGHT_PER_ORDER = 1020.5 / 4999

function formatMoney(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const hoveredStats = computed(() => {
  const orders = hoveredBubble.value ? Number(hoveredBubble.value.value) : 4999
  return {
    orders: orders.toLocaleString('en-US'),
    amount: formatMoney(orders * AMOUNT_PER_ORDER),
    weight: formatMoney(orders * WEIGHT_PER_ORDER)
  }
})

// ---- 订单记录 ----
interface OrderRecord {
  id: string
  time: string
  product: string
  totalAmount: number
  unitPrice: number
  weight: number
  purchaser: string
  purchaserName: string
  sellerName: string
}

// 生成 200 条 mock 订单记录
const PURCHASERS = [
  '浦北县来好运业有限公司',
  '广西中皮健康产业有限公司',
  '广西浦北县桂柑健康产业...',
  '浦北县桂龙农产品购销部',
  '广西陈皮王农业开发有限公司'
]
const PURCHASER_NAMES = ['陈肇鑫', '陈肇锟', '陈妹凤', '陈启威', '龙波', '吴成娟', '李青梅']
const SELLER_NAMES = ['吴成娟', '余传祥', '吴福明', '吴朝兰', '黄荣', '谭彩明', '李青梅', '吴远志', '赵传作', '吴伟军', '王秀英', '刘建国']

function pad(n: number, len = 2): string {
  return String(n).padStart(len, '0')
}

function genOrderRecords(count: number): OrderRecord[] {
  const records: OrderRecord[] = []
  // 基准时间：2026-08-04 15:10:21，逐条递减分钟
  const baseTime = new Date('2026-08-04T15:10:21+08:00').getTime()
  for (let i = 0; i < count; i++) {
    const unitPrice = Math.random() < 0.7 ? 1.0 : 0.5
    const weight = Math.round(Math.random() * 1450 + 50)
    const totalAmount = +(weight * unitPrice).toFixed(2)
    const time = new Date(baseTime - i * 3 * 60 * 1000) // 每条间隔 3 分钟
    const t = time
    const timeStr = `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())} ${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}`
    records.push({
      id: 'GG' + (2084537408207798272n + BigInt(i)).toString(),
      time: timeStr,
      product: '柑果',
      totalAmount,
      unitPrice,
      weight,
      purchaser: PURCHASERS[i % PURCHASERS.length],
      purchaserName: PURCHASER_NAMES[i % PURCHASER_NAMES.length],
      sellerName: SELLER_NAMES[i % SELLER_NAMES.length]
    })
  }
  return records
}

const orderRecords = ref<OrderRecord[]>(genOrderRecords(200))

const orderColumns = [
  { key: 'id', label: '订单编号', width: '180px' },
  { key: 'time', label: '订单时间', width: '160px' },
  { key: 'product', label: '商品', width: '80px' },
  { key: 'totalAmount', label: '总金额(元)', width: '120px' },
  { key: 'unitPrice', label: '单价(元)', width: '100px' },
  { key: 'weight', label: '重量(斤)', width: '100px' },
  { key: 'purchaser', label: '收购企业', width: '200px' },
  { key: 'purchaserName', label: '收购员', width: '100px' },
  { key: 'sellerName', label: '卖果人', width: '100px' }
]

// ---- 订单记录：分页 ----
const PAGE_SIZE = 30
const currentPage = ref(1)

const totalCount = computed(() => orderRecords.value.length)
const totalPages = computed(() => Math.max(1, Math.ceil(totalCount.value / PAGE_SIZE)))

const pagedRecords = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return orderRecords.value.slice(start, start + PAGE_SIZE)
})

// 页码按钮：始终展示首页与末页，当前页前后各 2 页，其余用省略号
const pageNumbers = computed<(number | '...')[]>(() => {
  const cur = currentPage.value
  const total = totalPages.value
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const pages: (number | '...')[] = [1]
  const left = Math.max(2, cur - 1)
  const right = Math.min(total - 1, cur + 1)
  if (left > 2) pages.push('...')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push('...')
  pages.push(total)
  return pages
})

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  currentPage.value = page
}

function prevPage() {
  goToPage(currentPage.value - 1)
}

function nextPage() {
  goToPage(currentPage.value + 1)
}
</script>

<template>
  <div class="detail-page">
    <Header alwaysWhite />
    <div class="detail-body">
      <!-- 面包屑导航 -->
      <div class="detail-breadcrumb">
        <div class="breadcrumb-row">
          <button class="back-btn" @click="router.go(-1)" aria-label="后退">
            <img src="/icons/arrow-back-green.svg" class="back-btn-icon" alt="">
          </button>
          <div class="breadcrumb-items">
            <router-link to="/" class="breadcrumb-item">首页</router-link>
            <img src="/images/breadcrumb-chevron.svg" class="breadcrumb-chevron" alt=">">
            <router-link :to="{ name: 'Home', query: { tab: categoryTabIndex } }" class="breadcrumb-item">{{ product.category }}</router-link>
            <img src="/images/breadcrumb-chevron.svg" class="breadcrumb-chevron" alt=">">
            <span class="breadcrumb-item breadcrumb-current">{{ product.title }}</span>
          </div>
        </div>
      </div>

      <!-- 信息 -->
      <div class="detail-info-section">
        <h1 class="detail-product-title">{{ product.title }}</h1>

        <!-- 统计 -->
        <div class="detail-stats">
          <div class="stat-item">
            <span class="stat-label">总金额 (单)</span>
            <span class="stat-value">4999</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-label">总重量 (元)</span>
            <span class="stat-value">56,330.20</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-label">总开票金额 (公斤)</span>
            <span class="stat-value">256,330.20</span>
          </div>
        </div>

        <!-- 产品信息 -->
        <div class="detail-product">
          <div class="product-main-image">
            <img src="/images/detail-product-main-211962.png" :alt="product.title">
          </div>
          <div class="product-info">
            <div class="info-row">
              <span class="info-label">品牌类别：</span>
              <span class="info-value">{{ product.category }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">所属地区：</span>
              <span class="info-value">{{ product.region }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">主营产品：</span>
              <span class="info-value">{{ product.mainProduct }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">更新日期：</span>
              <span class="info-value">{{ product.updateDate }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 订单分布 -->
      <div class="detail-orders">
        <!-- 筛选栏 -->
        <div class="orders-filter">
          <h2 class="orders-title">订单分布</h2>
          <div class="orders-toolbar">
            <div class="segmented-control">
              <button
                v-for="(range, i) in timeRanges"
                :key="range"
                class="segment-btn"
                :class="{ 'segment-btn-active': activeRange === i }"
                @click="activeRange = i"
              >{{ range }}</button>
            </div>
            <button class="date-range-picker" type="button">
              <svg class="dp-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1.5" y="2" width="13" height="12" rx="1.5" fill="#101215"/>
                <rect x="3" y="0.5" width="1.6" height="3" rx="0.8" fill="#101215"/>
                <rect x="11.4" y="0.5" width="1.6" height="3" rx="0.8" fill="#101215"/>
              </svg>
              <span class="dp-range">
                <span class="dp-date">2025-04-01</span>
                <span class="dp-separator">~</span>
                <span class="dp-date">2025-04-30</span>
              </span>
              <svg class="dp-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3.5 6.5 8 11l4.5-4.5" stroke="#101215" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- 地图 -->
        <div class="orders-map">
          <div ref="mapEl" class="map-canvas"></div>

          <!-- 悬停详情（悬停气泡时显示） -->
          <div v-show="hoveredBubble" class="map-tooltip" :style="{ left: tooltipPos.left + 'px', top: tooltipPos.top + 'px' }">
            <div class="tooltip-stats">
              <div class="tooltip-stat">
                <span class="tooltip-label">订单数 (单)</span>
                <span class="tooltip-value">{{ hoveredStats.orders }}</span>
              </div>
              <div class="tooltip-divider"></div>
              <div class="tooltip-stat">
                <span class="tooltip-label">订单总金额 (元)</span>
                <span class="tooltip-value">{{ hoveredStats.amount }}</span>
              </div>
              <div class="tooltip-divider"></div>
              <div class="tooltip-stat">
                <span class="tooltip-label">重量 (公斤)</span>
                <span class="tooltip-value">{{ hoveredStats.weight }}</span>
              </div>
            </div>
            <svg class="tooltip-arrow" width="30" height="15" viewBox="0 0 30 15" aria-hidden="true">
              <path d="M0 0h30L15 15z" fill="#fff"/>
            </svg>
          </div>

          <!-- 图例栏 -->
          <div class="map-legend">
            <div v-for="(item, i) in legends" :key="item.key" class="legend-item">
              <span class="legend-dot" :style="{ backgroundColor: item.dot }"></span>
              <span class="legend-text">{{ item.label }}</span>
              <button class="legend-toggle" type="button" :aria-label="item.visible ? '隐藏' : '显示'" @click="toggleLegend(i)">
                <svg v-if="item.visible" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M10 4C4.5 4 1.5 10 1.5 10s3 6 8.5 6 8.5-6 8.5-6-3-6-8.5-6z" fill="rgba(16,18,21,0.5)"/>
                  <circle cx="10" cy="10" r="2.2" fill="#fff"/>
                </svg>
                <template v-else>
                  <!-- 隐藏状态：设计稿 隐藏-面性 图标（fill-opacity 0.3，颜色更浅） -->
                  <img class="legend-eye-off legend-eye-off-eye" src="/icons/icon-eye-off-1.svg" alt="">
                  <img class="legend-eye-off legend-eye-off-line" src="/icons/icon-eye-off-2.svg" alt="">
                </template>
              </button>
            </div>
          </div>
        </div>

        <!-- 订单记录 -->
        <div class="orders-records">
          <h2 class="records-title">订单记录</h2>
          <div class="records-table-wrapper">
            <table class="records-table">
              <thead>
                <tr>
                  <th v-for="col in orderColumns" :key="col.key" :style="{ width: col.width }">
                    {{ col.label }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="record in pagedRecords" :key="record.id">
                  <td class="cell-id">{{ record.id }}</td>
                  <td>{{ record.time }}</td>
                  <td>{{ record.product }}</td>
                  <td class="cell-amount">{{ record.totalAmount.toFixed(2) }}</td>
                  <td class="cell-mask">***</td>
                  <td>{{ record.weight.toFixed(2) }}</td>
                  <td>{{ record.purchaser }}</td>
                  <td>{{ record.purchaserName }}</td>
                  <td>{{ record.sellerName }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 分页控件 -->
          <div class="records-pagination">
            <span class="pagination-total">共 {{ totalCount }} 条</span>
            <div class="pagination-controls">
              <button
                class="page-btn page-nav"
                type="button"
                :disabled="currentPage === 1"
                @click="prevPage"
                aria-label="上一页"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M9 2 4 7l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <template v-for="(page, idx) in pageNumbers" :key="idx">
                <span v-if="page === '...'" class="page-ellipsis">…</span>
                <button
                  v-else
                  class="page-btn"
                  type="button"
                  :class="{ 'page-btn-active': page === currentPage }"
                  @click="goToPage(page)"
                >{{ page }}</button>
              </template>
              <button
                class="page-btn page-nav"
                type="button"
                :disabled="currentPage === totalPages"
                @click="nextPage"
                aria-label="下一页"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterSection />
  </div>
</template>
