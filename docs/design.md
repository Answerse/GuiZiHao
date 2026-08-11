# 桂农易采设计系统

> 从现有代码反向提取，以 `src/styles/variables.css` 和实际组件渲染为准。
> 与 `design-tokens.md` 不一致时，以本文件为准。

---

## 一、设计令牌 (Design Tokens)

### 1.1 色彩系统

#### 品牌色

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-brand-primary` | `#101215` | 品牌主色（顶栏背景、按钮） |
| `--color-brand-green` | `#15803D` | 品牌绿色（激活态、高亮） |
| `--color-brand-lime` | `#65A30D` | 品牌黄绿色 |
| `--color-brand-lime-dark` | `#4D7C0F` | 品牌深黄绿 |
| `--color-brand-orange` | `#FA6400` | 品牌橙色强调 |

#### 文字色

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-text-primary` | `#111827` | 标题 / 正文 |
| `--color-text-secondary` | `#222222` | 次要文字 |
| `--color-text-tertiary` | `#333333` | 三级文字 |
| `--color-text-quaternary` | `#666666` | 四级文字 |
| `--color-text-muted` | `#6B7280` | 辅助 / 说明文字 |
| `--color-text-placeholder` | `#767676` | 输入框占位 |
| `--color-text-disabled` | `#8D8D8D` | 禁用态文字 |

#### 背景色

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-bg-white` | `#FFFFFF` | 纯白背景 |
| `--color-bg-page` | `#EBF2FC` | 页面底色 |
| `--color-bg-card` | `#F8F8F8` | 卡片底色 |
| `--color-bg-input` | `#F4F4F4` | 表单输入背景 |
| `--color-bg-hover` | `#EBF2FC` | 悬停背景色 |
| `--color-bg-sidebar` | `#E1E8F2` | 侧边栏底色 |

#### 边框色

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-border-default` | `#DDDDDD` | 常规边框 |
| `--color-border-light` | `rgba(16, 18, 21, 0.1)` | 弱化边框 |

#### 覆盖层

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-overlay-dark` | `rgba(16, 18, 21, 0.6)` | 暗色遮罩（Hero 标签栏背景） |
| `--color-overlay-light` | `rgba(255, 255, 255, 0.2)` | 浅色遮罩 |
| `--color-black` | `#000000` | 纯黑 |

#### 实际使用高频硬编码值（应优先替换为 Token）

| 值 | 出现位置 | 建议替换 |
|-----|---------|---------|
| `#F9FAFB` | hero-section.css（文字色） | `--color-text-primary` |
| `#F3F4F6` | header.css（反白文字） | 无对应变量，可新增 |
| `rgba(16, 18, 21, 0.5)` | search-section.css（图标色） | `--color-border-light` |
| `#9CA3AF` | footer-section.css（底线色） | 无对应变量 |

---

### 1.2 字体系统

#### 字体系列

| Token | 值 | 用途 |
|-------|-----|------|
| `--font-family-sans` | `'MiSans', sans-serif` | 中文主体（全局默认） |
| `--font-family-display` | `'Altinn-DIN Condensed', sans-serif` | 西文标题（Hero 大字） |
| `--font-family-body` | `'Inter', sans-serif` | 通用西文正文 |

#### 字号阶梯

| Token | 值 | 字重 | 行高 | 用途 |
|-------|-----|------|------|------|
| `--font-size-display` | 100px | 700 | -- | 超大展示字 |
| `--font-size-huge` | 60px | 700 | -- | 巨大标题 |
| `--font-size-xl` | 30px | 450 | -- | 特大标题 |
| `--font-size-lg` | 24px | 630 | -- | 4 级标题 |
| `--font-size-md` / `--font-size-md-bold` | 20px | 330 / 630 | -- | 5 级文本 / 标题 |
| `--font-size-base` / `--font-size-sm-bold` | 16px | 330 / 630 | -- | 常规文本 / 6 级标题 |
| `--font-size-sm` | 14px | 330 | -- | 小号文本 |
| `--font-size-xs` | 12px | 330 | -- | 说明文字 |

**字重对照**：`330`(light) / `400`(regular) / `450`(medium) / `630`(semibold) / `600`(bold) / `700`(bold)

**实际组件中使用频次**：16px（最常用）> 20px > 14px > 24px > 12px

#### 行高

| Token | 值 |
|-------|-----|
| `--line-height-body` | 18px |
| `--line-height-heading` | 22px |
| `--line-height-display` | 26px |

---

### 1.3 间距刻度

| Token | 值 | 用途 |
|-------|-----|------|
| `--spacing-xs` | 4px | 紧凑元素间距 |
| `--spacing-sm` | 8px | 小元素间距 |
| `--spacing-md` | 10px | 中等元素间距 |
| `--spacing-lg` | 16px | 较大元素间距 |
| `--spacing-xl` | 24px | 区块间距 |
| `--spacing-xxl` | 32px | 页面级间距 |

---

### 1.4 圆角系统

| Token | 值 | 用途 |
|-------|-----|------|
| `--radius-xs` | 4px | 小元素 |
| `--radius-sm` | 8px | 卡片 / 按钮 |
| `--radius-md` | 16px | 大卡片 / 弹窗 |
| `--radius-lg` | 30px | 大按钮 |
| `--radius-full` | 9999px | 圆形 / 胶囊 |

---

### 1.5 阴影系统

| 值 | 使用场景 | 来源文件 |
|-----|---------|---------|
| `0 2px 12px rgba(0,0,0,0.08)` | 固定顶栏阴影 | header.css / header-secondary.css |
| `0 10px 40px rgba(0,0,0,0.1)` | 下拉弹窗 | header.css / header-secondary.css |
| `0px 10px 40px 0px rgba(0,0,0,0.1)` | Hero 标题文字阴影 | hero-section.css |
| `0 30px 80px rgba(0,0,0,0.4)` | Coverflow 焦点卡片 | recommend-section.css |
| `0 12px 32px rgba(0,0,0,0.12)` | 产品卡片 hover | product-section.css |

#### 1.5.1 卡片规范（强制）

**非必要时，卡片样式不允许使用描边（border）和阴影（box-shadow），除非特别说明。**

- 卡片的层次区分优先通过 `背景色`（如 `--color-bg-white` 置于 `--color-bg-page` 底色之上）与 `圆角`（`--radius-sm`）实现，而非描边或阴影。
- 仅在用户明确指定的场景下（如固定顶栏、下拉弹窗、Coverflow 焦点卡片、产品卡片 hover 等已有阴影的系统组件）保留阴影。
- 账户中心（`user-center-page.css`）所有卡片（余额头部、我的资产、功能中心、空态、订单卡）已统一去除描边与阴影，仅以白底 + 圆角呈现。

---

### 1.6 渐变系统

| 渐变值 | 使用场景 | 来源 |
|--------|---------|------|
| `linear-gradient(96deg, rgba(22,101,52,1) 0%, rgba(22,101,52,0) 88%)` | Hero 绿色遮罩 | hero-section.css |
| `linear-gradient(90deg, transparent 0%, #000 30%, #000 70%, transparent 100%)` | Logo 墙左右渐隐 | recommend-section.css |

---

## 二、组件库

### 2.1 Header (`src/components/Header.vue`)

全局顶栏，支持透明首页模式与白色二级页面模式。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `alwaysWhite` | `Boolean` | `false` | 固定白色背景（二级页面） |
| `activeTab` | `Number` | `0` | 当前激活品牌标签索引 (0-2) |

**Emits**: `tabChange(index: number)`

**内部状态**

| 状态 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `isScrolled` | `ref<boolean>` | `false` | scrollY > 400 切换白色固定态 |
| `showTypeMenu/RegionMenu/CategoryMenu` | `ref<boolean>` | `false` | 三个下拉菜单展开控制 |
| `selectedType` | `string` | `'区域公用品牌'` | 当前选中品牌类型 |
| `selectedRegion` | `string` | `'全部'` | 当前选中地区 |

**内部常量**

| 名称 | 值 |
|------|-----|
| `typeOptions` | `['区域公用品牌', '农产品品牌', '农业企业品牌']` |
| `regionOptions` | 16 个广西行政区 |
| `navTabs` | `['区域公用品牌', '农产品品牌', '农业企业品牌']` |
| `secondaryNavTabs` | `['首页', ...navTabs]` |

---

### 2.2 HeroSection (`src/components/HeroSection.vue`)

首页顶部 Hero 大图区域，含背景轮播和品牌选择标签。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `activeTab` | `Number` | `0` | 选项卡激活索引 |

**Emits**: `update:activeTab(index: number)` — 支持 `v-model`

**轮播时序**: `ENTER=3000ms | HOLD=4000ms | EXIT=1000ms | INTERVAL=7000ms`

**子组件**: 内部包含 `<Header>`

---

### 2.3 BrandCard (`src/components/BrandCard.vue`)

通用品牌卡片。

**Props**

| 名称 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | `String` | 是 | 卡片标题 |
| `description` | `String` | 是 | 卡片描述 |

---

### 2.4 ProductSection (`src/components/ProductSection.vue`)

产品列表网格区，根据 `activeTab` 切换三种品牌类型。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `activeTab` | `Number` | `0` | 0=区域 / 1=农产品 / 2=企业 |

**数据源**: `@/data/products`, `@/data/brand-products`, `@/data/enterprises`

**导航方法**: `goDetail(id)`, `goBrandProductDetail(bp)`, `goEnterpriseDetail(id)`

---

### 2.5 RecommendSection (`src/components/RecommendSection.vue`)

推荐区域 — Coverflow 轮播 / Logo 墙。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `activeTab` | `Number` | `0` | 0=区域公用品牌(Coverflow) / 1=农产品品牌(Coverflow) / 2=企业(Logo墙) |

**Coverflow 配置**: `totalSlides=9, INTERVAL=5000ms, CARD_WIDTH=320, CARD_RATIO=1.25`

**Logo 墙配置**: `GRID_WIDTH=2120, GRID_GAP=20, 10列x2行=20枚`

---

### 2.6 RegionSection (`src/components/RegionSection.vue`)

地区选择标签组。**无 props**，自管理 `activeRegion` 和 `regions` 状态。当前未在路由页面中使用。

### 2.7 SearchSection (`src/components/SearchSection.vue`)

独立搜索框。**无 props**，自管理 `searchText` 状态。当前未在路由页面中使用。

### 2.8 FooterSection (`src/components/FooterSection.vue`)

页脚信息区。**无 props**，纯展示。

---

## 三、布局骨架

### 3.1 页面层次 (Home.vue)

```
<div class="home-page">
  <HeroSection v-model:activeTab="activeTab" />   ← 内嵌 <Header>
  <RecommendSection :activeTab="activeTab" />      ← Coverflow / Logo 墙
  <ProductSection :activeTab="activeTab" />        ← 产品网格 + 分页
  <FooterSection />                                ← 页脚
</div>
```

### 3.2 内容容器

- 页面内层统一最大宽度：**`max-width: 1440px; margin: 0 auto`**
- 路由模式：`createWebHistory()` (HTML5 History)
- 路由滚动：`scrollBehavior()→{ top: 0, behavior: 'smooth' }`

### 3.3 Z-index 分层

| 层级 | 值 | 元素 |
|------|-----|------|
| 页面内容 | auto | 各 section |
| 固定顶栏 | 30 | `.header-scrolled`, `.header--secondary` |
| 下拉弹窗 | 100-1000 | `.category-popup`, `.type-popup`, `.region-popup` |

### 3.4 路由表

| 路径 | 名称 | 页面 |
|------|------|------|
| `/` | Home | 首页 |
| `/detail/:productId` | Detail | 区域公用品牌详情 |
| `/brand-product/:id` | BrandProductDetail | 农产品品牌详情 |
| `/enterprise/:id` | EnterpriseDetail | 农业企业详情 |
| `/chenpitong` | ChenpiTong | 陈皮通首页 |
| `/chenpitong/product` | ChenpiTongProduct | 陈皮通产品 |

---

## 四、响应式断点

### 4.1 核心产品断点

| 断点 | 生效规则 |
|------|---------|
| `max-width: 1280px` | 顶栏导航间距压缩、隐藏品牌标签导航、显示分类下拉菜单、Logo 缩放、区域选择器收窄 |
| `max-width: 768px` | 顶栏高度缩至 60px、Logo padding 缩至 12px 16px、字号降级、搜索区 padding 缩小 |

### 4.2 陈皮通专有断点

| 断点 | 生效规则 |
|------|---------|
| `min-width: 576px` | section inner padding 设为 0 40px |
| `min-width: 768px` | 显示 hamburger，inner padding 设为 12px 24px |
| `min-width: 1024px` | 隐藏 hamburger，inner padding 设为 16px 40px |
| `min-width: 1280px` | Hero 标题字号 96px，content padding 0 180px |
| `min-width: 1440px` | section inner padding 0（全宽） |

---

## 五、CSS 架构

### 5.1 文件清单

| 文件 | 命名空间前缀 | 职责 |
|------|------------|------|
| `variables.css` | `--color-/--spacing-/--font-/--radius-` | 全局设计令牌 |
| `global.css` | `* / body / #app` | Reset + 全局默认样式 |
| `home.css` | `.home-` | 首页容器 |
| `header.css` | `.header-` / `.scrolled-` / `.dropdown-` | 首页顶栏（透明/滚动） |
| `header-secondary.css` | `.header--secondary` / `.header-secondary-` | 二级页面白底顶栏 |
| `hero-section.css` | `.hero-` | Hero 大图 + 品牌标签 |
| `recommend-section.css` | `.recommend-` / `.region-` / `.brand-product-` | Coverflow + Logo 墙 |
| `product-section.css` | `.product-` | 产品网格卡片 |
| `brand-card.css` | `.brand-card-` | BrandCard 组件样式 |
| `region-section.css` | `.region-section-` | 地区标签组 |
| `search-section.css` | `.search-` | 搜索框 |
| `footer-section.css` | `.footer-` | 页脚 |
| `detail-page.css` | `.detail-` / `.brand-detail-` / `.enterprise-detail-` | 详情页共用样式 |
| `chenpi-tong.css` | （陈皮通特有命名） | 陈皮通独立样式 |

### 5.2 分层规则

```
variables.css      ← 设计令牌层（纯变量）
global.css         ← 基础层（reset + body）
{component}.css    ← 组件层（每个组件一个文件，命名空间隔离）
```

### 5.3 已知问题

- `--color-bg-page` 在 `variables.css` 中为 `#EBF2FC`，与 `design-tokens.md` 记录的 `#F9FAFB` 不一致
- `--font-weight-regular: 400` 和 `--font-weight-bold: 600` 仅在 `variables.scss` 中存在，`variables.css` 未引用
- 多处存在硬编码值（见 1.1 节末尾对照表），建议逐步替换为 Token 引用
