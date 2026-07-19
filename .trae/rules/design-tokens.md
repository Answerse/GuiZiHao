# 设计 Tokens 映射规则

## ⚠️ 重要说明

由于当前 MCP 工具限制，无法直接访问 Figma Variables API（Collections）。本文件中的 Tokens 是从设计稿节点的样式属性中提取的，使用描述性命名而非 Figma 内部自动生成的 ID（如 `fill_3c2d32fd`）。

此外，项目中未找到 `src/styles/variables.scss` 文件，因此无法与现有变量对齐。

---

## 核心规则

- **禁止硬编码**：严禁在样式中直接写死 hex 颜色值、固定 px 间距、固定字号。
- **变量引用**：所有样式必须从本文件定义的 CSS Variables 中引用。
- **命名规范**：使用 `var(--category-name-variant)` 格式，如 `var(--color-brand-primary)`、`var(--spacing-md)`。

---

## 色彩系统 (Colors)

| 描述 | CSS 变量 | 值 | 用途说明 |
|------|----------|-----|----------|
| 品牌主色 | `var(--color-brand-primary)` | #101215 | 品牌主色调 |
| 品牌绿色 | `var(--color-brand-green)` | #15803D | 品牌绿色标识 |
| 品牌黄绿色 | `var(--color-brand-lime)` | #65A30D | 品牌黄绿色 |
| 品牌橙色 | `var(--color-brand-orange)` | #FA6400 | 品牌橙色强调 |
| 文字主色 | `var(--color-text-primary)` | #111827 | 正文标题 |
| 文字次色 | `var(--color-text-secondary)` | #222222 | 次要文字 |
| 文字三色 | `var(--color-text-tertiary)` | #333333 | 三级文字 |
| 文字四色 | `var(--color-text-quaternary)` | #666666 | 四级文字 |
| 辅助文字 | `var(--color-text-muted)` | #6B7280 | 说明文字 |
| 占位文字 | `var(--color-text-placeholder)` | #767676 | 输入框占位 |
| 禁用文字 | `var(--color-text-disabled)` | #8D8D8D | 禁用状态文字 |
| 白色 | `var(--color-bg-white)` | #FFFFFF | 纯白背景 |
| 页面背景 | `var(--color-bg-page)` | #F9FAFB | 页面底色 |
| 卡片背景 | `var(--color-bg-card)` | #F8F8F8 | 卡片底色 |
| 输入框背景 | `var(--color-bg-input)` | #F4F4F4 | 表单输入背景 |
| 悬停背景 | `var(--color-bg-hover)` | #EBF2FC | 按钮悬停背景 |
| 侧边栏背景 | `var(--color-bg-sidebar)` | #E1E8F2 | 侧边栏底色 |
| 默认边框 | `var(--color-border-default)` | #DDDDDD | 常规边框 |
| 浅色边框 | `var(--color-border-light)` | rgba(16, 18, 21, 0.1) | 弱化边框 |
| 纯黑色 | `var(--color-black)` | #000000 | 纯黑 |

---

## 间距系统 (Spacing)

| 描述 | CSS 变量 | 值 | 用途说明 |
|------|----------|-----|----------|
| 极小间距 | `var(--spacing-xs)` | 4px | 紧凑元素间距 |
| 小间距 | `var(--spacing-sm)` | 8px | 小元素间距 |
| 中等间距 | `var(--spacing-md)` | 10px | 中等元素间距 |
| 大间距 | `var(--spacing-lg)` | 16px | 较大元素间距 |
| 超大间距 | `var(--spacing-xl)` | 24px | 区块间距 |
| 特大间距 | `var(--spacing-xxl)` | 32px | 页面级间距 |

---

## 字体系统 (Typography)

### 字体系列

| 描述 | CSS 变量 | 值 | 用途说明 |
|------|----------|-----|----------|
| 中文无衬线 | `var(--font-family-sans)` | MiSans | 中文主体字体 |
| 西文标题 | `var(--font-family-display)` | Altinn-DIN Condensed | 西文标题字体 |
| 通用西文 | `var(--font-family-body)` | Inter | 正文通用字体 |

### 字号层级

| Figma 样式名 | CSS 变量 | 值 | 字重 | 用途说明 |
|-------------|----------|-----|------|----------|
| style_372dd158 | `var(--font-size-display)` | 100px | 700 | 超大展示字 |
| style_9357c44b | `var(--font-size-huge)` | 60px | 700 | 巨大标题 |
| style_c85e937c | `var(--font-size-xl)` | 30px | 450 | 特大标题 |
| 中文/中文4级标题 | `var(--font-size-lg)` | 24px | 630 | 4级标题 |
| 中文/中文5级文本 | `var(--font-size-md)` | 20px | 330 | 5级文本 |
| 中文/中文5级标题 | `var(--font-size-md-bold)` | 20px | 630 | 5级标题 |
| 中文/中文常规文本 | `var(--font-size-base)` | 16px | 330 | 常规文本 |
| 中文/中文6级标题 | `var(--font-size-sm-bold)` | 16px | 630 | 6级标题 |
| 中文/中文小号文本 | `var(--font-size-sm)` | 14px | 330 | 小号文本 |
| 中文/中文说明文字 | `var(--font-size-xs)` | 12px | 330 | 说明文字 |

### 行高

| 描述 | CSS 变量 | 值 |
|------|----------|-----|
| 正文行高 | `var(--line-height-body)` | 18px |
| 标题行高 | `var(--line-height-heading)` | 22px |
| 大标题行高 | `var(--line-height-display)` | 26px |

---

## 圆角系统 (Border Radius)

| 描述 | CSS 变量 | 值 | 用途说明 |
|------|----------|-----|----------|
| 小圆角 | `var(--radius-xs)` | 4px | 小元素 |
| 常规圆角 | `var(--radius-sm)` | 8px | 卡片/按钮 |
| 中等圆角 | `var(--radius-md)` | 16px | 大卡片 |
| 大圆角 | `var(--radius-lg)` | 30px | 大按钮 |
| 圆形/胶囊 | `var(--radius-full)` | 9999px | 圆形元素 |

---

## 代码示例

### ✅ 正确示例

```vue
<script setup>
// 组件逻辑
</script>

<template>
  <div class="card">
    <h3 class="card-title">卡片标题</h3>
    <p class="card-text">卡片内容描述</p>
    <button class="btn-primary">了解更多</button>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-md);
  padding: var(--spacing-xl);
}

.card-title {
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

.card-text {
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  line-height: var(--line-height-body);
}

.btn-primary {
  background-color: var(--color-brand-primary);
  color: var(--color-bg-white);
  padding: var(--spacing-sm) var(--spacing-xxl);
  border-radius: var(--radius-full);
  font-size: var(--font-size-md);
}
</style>
```

### ❌ 错误示例

```vue
<script setup>
// 组件逻辑
</script>

<template>
  <div class="card">
    <h3 class="card-title">卡片标题</h3>
    <p class="card-text">卡片内容描述</p>
  </div>
</template>

<style scoped>
.card {
  background-color: #F8F8F8;        /* ❌ 禁止硬编码 hex */
  border-radius: 8px;               /* ❌ 禁止硬编码 px */
  padding: 24px;                    /* ❌ 禁止硬编码 px */
}

.card-title {
  font-size: 24px;                  /* ❌ 禁止硬编码 px */
  color: #111827;                   /* ❌ 禁止硬编码 hex */
  margin-bottom: 10px;              /* ❌ 禁止硬编码 px */
}

.card-text {
  font-size: 16px;                  /* ❌ 禁止硬编码 px */
  color: #6B7280;                   /* ❌ 禁止硬编码 hex */
}
</style>
```

---

## 变量命名约定

| 分类 | 前缀 | 示例 |
|------|------|------|
| 颜色 | `--color-` | `--color-brand-primary` |
| 间距 | `--spacing-` | `--spacing-md` |
| 字体大小 | `--font-size-` | `--font-size-lg` |
| 字体系列 | `--font-family-` | `--font-family-sans` |
| 行高 | `--line-height-` | `--line-height-body` |
| 圆角 | `--radius-` | `--radius-md` |

### 变体后缀

| 后缀 | 含义 | 示例 |
|------|------|------|
| `-primary` | 主色/主要 | `--color-text-primary` |
| `-secondary` | 次要 | `--color-text-secondary` |
| `-muted` | 弱化/辅助 | `--color-text-muted` |
| `-xs` | 极小 | `--spacing-xs` |
| `-sm` | 小 | `--spacing-sm` |
| `-md` | 中等 | `--spacing-md` |
| `-lg` | 大 | `--spacing-lg` |
| `-xl` | 特大 | `--spacing-xl` |
| `-xxl` | 超大 | `--spacing-xxl` |
| `-full` | 完全/最大 | `--radius-full` |