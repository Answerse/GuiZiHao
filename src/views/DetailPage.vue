<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Header from '@/components/Header.vue'
import FooterSection from '@/components/FooterSection.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { products } from '@/data/products'

const route = useRoute()

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

// 更新日期：显示当前日期
const today = computed(() => {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
})

// ---- 基于产品 id 的确定性 mock 数据（mulberry32 伪随机，刷新不变且各产品不同） ----
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// 统计栏数值：浦北陈皮（id=17）使用真实数据，其他产品按 id 生成确定性数值
const STATS_OVERRIDE: Record<number, { amount: number; weight: number; invoice: number }> = {
  17: { amount: 22106215.66, weight: 2744917.75, invoice: 13925062.41 }
}

function buildStats(pid: number) {
  const o = STATS_OVERRIDE[pid]
  if (o) return o
  const rnd = mulberry32(pid * 7919 + 13)
  const amount = Math.round((1_000_000 + rnd() * 20_000_000) * 100) / 100
  const pricePerJin = 6 + rnd() * 8 // 6~14 元/斤
  const weight = Math.round((amount / pricePerJin) * 100) / 100
  const invoice = Math.round(amount * (0.5 + rnd() * 0.25) * 100) / 100
  return { amount, weight, invoice }
}

const stats = computed(() => buildStats(product.value.id))

// ---- 订单分布：时间筛选 ----
const timeRanges = ['近 7 日', '近 30 天', '近 3 月', '近 1 年', '自定义']
const activeRange = ref(1)

// 各时间范围对应的日期范围（用于日期选择器展示）
const rangeDates = ref([
  { start: '2025-04-24', end: '2025-04-30' },
  { start: '2025-04-01', end: '2025-04-30' },
  { start: '2025-02-01', end: '2025-04-30' },
  { start: '2024-05-01', end: '2025-04-30' },
  { start: '2025-04-01', end: '2025-04-30' }
])

const shownRangeDates = computed(() => {
  const i = Math.min(activeRange.value, rangeDates.value.length - 1)
  return rangeDates.value[i]
})

// 自定义日期下拉
const showDatePicker = ref(false)
const customStart = ref('2025-04-01')
const customEnd = ref('2025-04-30')

function toggleDatePicker() {
  showDatePicker.value = !showDatePicker.value
}

function applyCustomRange() {
  if (!customStart.value || !customEnd.value) return
  rangeDates.value[4] = { start: customStart.value, end: customEnd.value }
  showDatePicker.value = false
  activeRange.value = 4
  drillStack.value = []
  renderMarkers()
}

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
  { key: 'red', label: '10000-99999 单', dot: '#991B1B', visible: true }
])

interface Bubble {
  x: number
  y: number
  size: number
  color: string
  value: string
  cat: LegendKey
}

type BubbleNode = Bubble & { children?: BubbleNode[] }

// ---- 多层级气泡树：子节点数值之和恒等于父节点 ----
// 数值 → 图例类别
function catForValue(v: number): LegendKey {
  if (v >= 10000) return 'red'
  if (v >= 5000) return 'purple'
  if (v >= 1000) return 'blue'
  if (v >= 100) return 'orange'
  return 'green'
}

function colorForCat(cat: LegendKey): string {
  const map: Record<LegendKey, string> = {
    red: 'var(--color-chart-red-80)',
    purple: 'var(--color-chart-purple-80)',
    blue: 'var(--color-chart-blue-80)',
    orange: 'var(--color-chart-orange-80)',
    green: 'var(--color-chart-green-80)'
  }
  return map[cat]
}

function sizeForCat(cat: LegendKey): number {
  const map: Record<LegendKey, number> = { red: 90, purple: 80, blue: 70, orange: 60, green: 50 }
  return map[cat]
}

// 递归构建气泡树：父值按 weights 拆分给子节点，子节点之和恒等于父值
function buildNode(
  x: number,
  y: number,
  value: number,
  weights: number[],
  radius: number,
  depth: number
): BubbleNode {
  const cat = catForValue(value)
  const node: BubbleNode = {
    x,
    y,
    size: sizeForCat(cat),
    color: colorForCat(cat),
    value: String(value),
    cat
  }
  if (depth > 0 && weights.length) {
    const sum = weights.reduce((a, b) => a + b, 0)
    node.children = weights.map((w, i) => {
      const childValue = Math.round((value * w) / sum)
      const angle = (i / weights.length) * Math.PI * 2 + 0.4
      const dist = radius
      return buildNode(
        x + Math.cos(angle) * dist,
        y + Math.sin(angle) * dist,
        childValue,
        [2, 1],
        radius * 0.45,
        depth - 1
      )
    })
    // 尾差修正，保证子节点之和 = 父节点数值
    const childSum = node.children.reduce((a, c) => a + Number(c.value), 0)
    const last = node.children[node.children.length - 1]
    if (last) last.value = String(Number(last.value) + (value - childSum))
  }
  return node
}

// 各时间范围订单量系数（相对近 30 天）
const RANGE_RATIO = [0.3, 1, 2.2, 4, 1]

// 树根定义：坐标、基准值、子节点权重（父值按权重拆分，和=父值）
// 基准值覆盖各数量级：红(≥1万)/紫(≥5千)/蓝(≥1千)/橙(≥百)/绿(<百)，保证首次进入各种颜色圆点都有
interface TreeRoot { x: number; y: number; value: number; weights: number[] }

const TREE_ROOTS_OVERRIDE: Record<number, TreeRoot[]> = {
  17: [
    { x: 440, y: 260, value: 32000, weights: [3, 3, 2, 2] },
    { x: 560, y: 330, value: 8000, weights: [4, 3, 3, 2, 3] },
    { x: 680, y: 300, value: 3000, weights: [3, 2, 2, 2] },
    { x: 610, y: 430, value: 500, weights: [3, 3, 2, 2] },
    { x: 380, y: 350, value: 50, weights: [3, 2, 2] },
    { x: 730, y: 380, value: 15000, weights: [3, 2, 2] }
  ]
}

const TREE_ROOT_POSITIONS = [
  { x: 440, y: 260 },
  { x: 560, y: 330 },
  { x: 680, y: 300 },
  { x: 610, y: 430 },
  { x: 380, y: 350 },
  { x: 730, y: 380 }
]

// 按产品 id 生成 6 个根圆点：每个数量级锚点取区间内确定性随机值，保证各颜色齐全且产品间不同
function buildTreeRoots(pid: number): TreeRoot[] {
  const fixed = TREE_ROOTS_OVERRIDE[pid]
  if (fixed) return fixed
  const rnd = mulberry32(pid * 104729 + 7)
  const ranges: { min: number; max: number; weights: number[] }[] = [
    { min: 20000, max: 40000, weights: [3, 3, 2, 2] }, // 红
    { min: 5000, max: 9900, weights: [4, 3, 3, 2, 3] }, // 紫
    { min: 1000, max: 4900, weights: [3, 2, 2, 2] }, // 蓝
    { min: 100, max: 990, weights: [3, 3, 2, 2] }, // 橙
    { min: 1, max: 99, weights: [3, 2, 2] }, // 绿
    { min: 10000, max: 30000, weights: [3, 2, 2] } // 红
  ]
  return TREE_ROOT_POSITIONS.map((p, i) => {
    const r = ranges[i]
    const value = Math.round(r.min + rnd() * (r.max - r.min))
    return { x: p.x, y: p.y, value, weights: r.weights }
  })
}

const TREE_ROOTS = computed(() => buildTreeRoots(product.value.id))

// 当前时间范围下的气泡树（随时间筛选联动）
const BUBBLE_TREE = computed<BubbleNode[]>(() => {
  const ratio = RANGE_RATIO[Math.min(activeRange.value, RANGE_RATIO.length - 1)]
  return TREE_ROOTS.value.map(r => buildNode(r.x, r.y, Math.round(r.value * ratio), r.weights, 70, 2))
})

function selectRange(i: number) {
  activeRange.value = i
  if (i === 4) {
    showDatePicker.value = true
  } else {
    showDatePicker.value = false
    drillStack.value = []
    renderMarkers()
  }
}

function toggleLegend(index: number) {
  legends.value[index].visible = !legends.value[index].visible
  renderMarkers()
}

// ---- 订单分布：Leaflet 真实地图（多层级下钻） ----
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

// ---- 多层级气泡：zoom 越大层级越细 ----
// 层级配置：minZoom 为该层级开始显示的缩放级别
const BUBBLE_LEVELS = computed(() => {
  const tree = BUBBLE_TREE.value
  const level1 = tree.flatMap(r => r.children || [])
  const level2 = level1.flatMap(n => n.children || [])
  return [
    { minZoom: 7, bubbles: tree },
    { minZoom: 9, bubbles: level1 },
    { minZoom: 11, bubbles: level2 }
  ]
})

// 下钻退出阈值：第 1 级下钻（显示子圆点）缩放到低于 9 时退回根层，第 2 级（显示孙圆点）低于 10.5 退回第 1 级
const DRILL_MIN_ZOOM = [9, 10.5]

// 下钻路径：空数组 = 未下钻（按 zoom 显示对应层级）；非空 = 只显示路径顶端节点的子圆点
const drillStack = ref<BubbleNode[]>([])

// 未下钻时按缩放级别取对应层级的圆点
function getLevelBubbles(zoom: number): BubbleNode[] {
  let idx = 0
  for (let i = 0; i < BUBBLE_LEVELS.value.length; i++) {
    if (zoom >= BUBBLE_LEVELS.value[i].minZoom) idx = i
  }
  return BUBBLE_LEVELS.value[idx].bubbles
}

// 当前应显示的圆点：下钻后只显示该节点的子圆点（数值之和 = 父圆点，且不混入其他分支）
const currentBubbles = computed<BubbleNode[]>(() => {
  if (drillStack.value.length > 0) {
    const parent = drillStack.value[drillStack.value.length - 1]
    return parent.children || []
  }
  return getLevelBubbles(map ? map.getZoom() : 7)
})

function renderMarkers() {
  if (!map) return
  if (markerLayer) {
    map.removeLayer(markerLayer)
    markerLayer = null
  }
  const levelBubbles = currentBubbles.value
  const layer = L.layerGroup()
  levelBubbles.forEach(b => {
    const [lat, lng] = toLatLng(b.x, b.y)
    // 仅显示图例中可见类别的圆点
    if (!legends.value.find(l => l.key === b.cat)?.visible) return
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
    marker.on('click', () => drillDown(b))
    marker.addTo(layer)
  })
  markerLayer = layer
  layer.addTo(map)
}

// 点击圆点：记录下钻路径，flyToBounds 缩放到包含所有下级圆点的区域
function drillDown(bubble: BubbleNode) {
  if (!map) return
  const children = bubble.children
  if (!children || !children.length) return // 已是最细层级
  drillStack.value = [...drillStack.value, bubble]
  hoveredBubble.value = null
  const bounds = L.latLngBounds(children.map(c => toLatLng(c.x, c.y)))
  map.flyToBounds(bounds, { padding: [50, 50], duration: 0.8 })
}

// 缩放结束：手动缩小到低于当前下钻层级所需缩放时，逐级退回上层
function onZoomEnd() {
  if (!map) return
  const zoom = map.getZoom()
  while (drillStack.value.length > 0 && zoom < DRILL_MIN_ZOOM[drillStack.value.length - 1]) {
    drillStack.value = drillStack.value.slice(0, -1)
  }
  renderMarkers()
}

function initMap() {
  if (!mapEl.value || map) return
  map = L.map(mapEl.value, {
    center: [23.65, 108.3], // 广西中心
    zoom: 7, // 放大到广西区内
    zoomSnap: 0.5,
    scrollWheelZoom: true,
    zoomControl: true
  })
  // 高德中文标注瓦片（浅色街道图，替换 CARTO 英文标注）
  L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    subdomains: ['1', '2', '3', '4'],
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.autonavi.com/">高德地图</a>'
  }).addTo(map)
  map.on('move zoom', updateTooltipPos)
  map.on('zoomend', onZoomEnd)
  renderMarkers()
  window.addEventListener('resize', onMapResize)
}

function onMapResize() {
  if (map) map.invalidateSize()
}

onMounted(() => {
  initMap()
  document.addEventListener('click', closeDatePicker)
})

function closeDatePicker(e: MouseEvent) {
  const target = e.target as HTMLElement
  // 点击筛选栏内部（分段控件 / 日期选择器区域）时不关闭，便于切换/展开
  if (target.closest('.orders-toolbar')) return
  showDatePicker.value = false
}

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDatePicker)
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

// 通用收购企业名后缀：按产品所属地区生成，避免跨产品串用浦北数据
const PURCHASER_SUFFIXES = [
  '农产品购销有限公司',
  '特色农业开发有限公司',
  '农产品购销专业合作社',
  '生态农业发展有限公司',
  '农副产品购销部'
]

function buildPurchasers(pid: number, region: string): string[] {
  if (pid === 17) return PURCHASERS
  return PURCHASER_SUFFIXES.map(s => `${region}${s}`)
}

function pad(n: number, len = 2): string {
  return String(n).padStart(len, '0')
}

// 按产品生成确定性订单记录（浦北陈皮保留原数据特征，其他产品商品列显示各自主营产品）
function genOrderRecords(pid: number, region: string, mainProduct: string, count: number): OrderRecord[] {
  const rnd = mulberry32(pid * 13 + 7)
  const purchasers = buildPurchasers(pid, region)
  const productName = pid === 17 ? '柑果' : mainProduct
  const baseId = 2084537408207798272n + BigInt(pid * 1000000 + 7)
  const records: OrderRecord[] = []
  // 基准时间：2026-08-04 15:10:21，逐条递减分钟
  const baseTime = new Date('2026-08-04T15:10:21+08:00').getTime()
  for (let i = 0; i < count; i++) {
    const unitPrice = rnd() < 0.7 ? 1.0 : 0.5
    const weight = Math.round(rnd() * 1450 + 50)
    const totalAmount = +(weight * unitPrice).toFixed(2)
    const time = new Date(baseTime - i * 3 * 60 * 1000) // 每条间隔 3 分钟
    const t = time
    const timeStr = `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())} ${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}`
    records.push({
      id: 'GG' + (baseId + BigInt(i)).toString(),
      time: timeStr,
      product: productName,
      totalAmount,
      unitPrice,
      weight,
      purchaser: purchasers[i % purchasers.length],
      purchaserName: PURCHASER_NAMES[i % PURCHASER_NAMES.length],
      sellerName: SELLER_NAMES[i % SELLER_NAMES.length]
    })
  }
  return records
}

const orderRecords = computed<OrderRecord[]>(() =>
  genOrderRecords(product.value.id, product.value.region, product.value.mainProduct, 200)
)

// 切换产品时重置分页与地图下钻状态
watch(
  () => product.value.id,
  () => {
    currentPage.value = 1
    drillStack.value = []
  }
)

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

// 陈皮通独立项目地址（陈皮通已抽为独立项目，部署后替换为正式域名）
const CHENPITONG_BASE_URL = 'http://localhost:5175'

// 去网点购买：有销售链接的产品在新标签页打开电商页面（如浦北陈皮 → 陈皮通独立项目）
function goSales() {
  const link = product.value.salesLink
  if (link) window.open(CHENPITONG_BASE_URL + link, '_blank')
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
      <Breadcrumb :items="[
        { label: '首页', to: '/' },
        { label: product.category, to: { name: 'Home', query: { tab: categoryTabIndex } } },
        { label: product.title }
      ]" />

      <!-- 信息 -->
      <div class="detail-info-section">
        <h1 class="detail-product-title">{{ product.title }}</h1>

        <!-- 产品信息 -->
        <div class="detail-product">
          <div class="product-main-image">
            <img :src="product.image" :alt="product.title">
          </div>
          <div class="product-divider"></div>
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
              <span class="info-value">{{ today }}</span>
            </div>
          </div>
          <div class="product-divider"></div>
          <div class="product-actions">
            <button class="product-action-btn product-action-btn--solid" type="button">货源联系方式</button>
            <button class="product-action-btn product-action-btn--outline" type="button" @click="goSales">去网点购买</button>
          </div>
        </div>

        <!-- 统计 -->
        <div class="detail-stats">
          <div class="stat-item">
            <span class="stat-label">总金额（元）</span>
            <span class="stat-value">{{ formatMoney(stats.amount) }}</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-label">总重量（斤）</span>
            <span class="stat-value">{{ formatMoney(stats.weight) }}</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-label">总开票金额（元）</span>
            <span class="stat-value">{{ formatMoney(stats.invoice) }}</span>
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
                @click="selectRange(i)"
              >{{ range }}</button>
            </div>
            <div class="date-range-wrapper">
              <button class="date-range-picker" type="button" @click="toggleDatePicker">
                <svg class="dp-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="1.5" y="2" width="13" height="12" rx="1.5" fill="#101215"/>
                  <rect x="3" y="0.5" width="1.6" height="3" rx="0.8" fill="#101215"/>
                  <rect x="11.4" y="0.5" width="1.6" height="3" rx="0.8" fill="#101215"/>
                </svg>
                <span class="dp-range">
                  <span class="dp-date">{{ shownRangeDates.start }}</span>
                  <span class="dp-separator">~</span>
                  <span class="dp-date">{{ shownRangeDates.end }}</span>
                </span>
                <svg class="dp-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3.5 6.5 8 11l4.5-4.5" stroke="#101215" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <!-- 自定义日期下拉 -->
              <div v-if="showDatePicker" class="date-picker-popup" @click.stop>
                <div class="date-picker-field">
                  <label class="date-picker-label" for="dp-start">开始日期</label>
                  <input id="dp-start" v-model="customStart" class="date-picker-input" type="date">
                </div>
                <div class="date-picker-field">
                  <label class="date-picker-label" for="dp-end">结束日期</label>
                  <input id="dp-end" v-model="customEnd" class="date-picker-input" type="date">
                </div>
                <button class="date-picker-apply" type="button" @click="applyCustomRange">确定</button>
              </div>
            </div>
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
