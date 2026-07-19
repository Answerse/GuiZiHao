# Trae Design System Rules (Vue 3 项目)

## 通用约束
- **禁止硬编码**：严禁在样式中直接写死 hex 颜色、固定 px 间距。必须从项目设计 Token 中引用。
- **变量映射**：Figma 中的 Variables 必须映射到项目 `src/styles/variables.css` 或 CSS Variables 中：
  - Figma `colors/primary/500` → `var(--color-primary-500)`
  - Figma `spacing/md` → `var(--spacing-md)`
- **组件复用**：优先使用项目已有 UI 组件库（`src/components/*`），如 Button/Input，禁止重复造轮子。
- **框架规范**：使用 Vue 3 `<script setup>` 语法，遵循项目 ESLint/Stylelint 配置。
- **样式完全分离**：Vue 组件中**不得包含任何 `<style>` 标签**，所有样式必须写在 `src/styles/*.css` 单独文件中，通过 `main.ts` 集中 `import` 加载。
  - 每个组件对应一个独立 CSS 文件，命名与组件名一致（如 HeroSection.vue → `src/styles/hero-section.css`）。
  - 使用命名空间前缀隔离样式（如 `hero-`、`brand-`、`product-`），避免类名冲突。
  - ✅ 正确：`<div class="hero-tab">`，CSS 中 `.hero-tab { ... }`
  - ❌ 错误：Vue 组件中出现 `<style>`、内联 `style="..."`
- **图片资源完整性**：Figma 设计稿中的所有图片资源（PNG、SVG 等）必须通过 `download_figma_images` 工具下载到 `public/` 目录下。
  - SVG 图标资源统一放在 `public/icons/` 目录，PNG 背景/产品图统一放在 `public/images/` 目录。
  - 引用时使用绝对路径，如 `/images/hero-bg.png`、`/icons/search-icon.svg`。

## 样式调整工作流（面向设计师）

### 开发环境准备
1. 启动开发服务器：`npm run dev`
2. 打开浏览器访问 http://localhost:5173/
3. 打开 Chrome DevTools（F12）

### 调整样式步骤
1. **定位元素**：在 Elements 面板中点击要调整的元素
2. **查看样式**：右侧 Styles 面板会显示该元素的所有样式规则，右侧显示文件名和行号
3. **找到源文件**：点击文件名（如 `hero-section.css:48`）跳转到源文件
4. **修改样式**：在 IDE 中修改对应的 `.css` 文件
5. **即时预览**：Vite 热更新会自动刷新页面

### DevTools 使用技巧
- **筛选样式**：使用 Styles 面板顶部的筛选框快速定位特定属性
- **禁用属性**：点击属性前的复选框临时禁用，查看效果
- **添加新样式**：在样式规则末尾点击，添加新的 CSS 属性
- **复制样式**：右键样式规则可复制，粘贴到 `.css` 文件中

## 样式文件结构

```
src/styles/
├── variables.css        ←-- CSS Variables 定义（全局变量）
├── global.css           ←-- 全局样式（reset、body、#app）
├── home.css             ←-- Home 页面样式
├── hero-section.css     ←-- HeroSection 组件样式（hero-前缀）
├── brand-card.css       ←-- BrandCard 组件样式（brand-前缀）
└── product-section.css  ←-- ProductSection 组件样式（product-前缀）
```

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

## 类名命名规范

| 组件 | 前缀 | 示例 |
|------|------|------|
| HeroSection | `hero-` | `.hero-section`, `.hero-tab`, `.hero-search-box` |
| BrandCard | `brand-` | `.brand-card`, `.brand-card-title`, `.brand-card-image` |
| ProductSection | `product-` | `.product-section`, `.product-list`, `.product-content` |

### 状态类名

| 状态 | 后缀 | 示例 |
|------|------|------|
| 激活状态 | `-active` | `.hero-tab-active`, `.hero-region-tag-active` |
| 悬停状态 | `-hover` | `.hero-button-hover` |
| 禁用状态 | `-disabled` | `.hero-input-disabled` |

8. 自检与纠错（生成后必做）

### 生成完成后，必须执行以下自检：
✅ 所有图片路径均为本地相对路径
✅ 无任何在线图片 / 占位图标
✅ 所有尺寸、间距与 absoluteBoundingBox一致
✅ 所有颜色、字号来自 CSS Variables
✅ SVG 未被篡改内部结构
✅ Clip Content → overflow: hidden
✅ Hover / Active / Disabled 样式齐全
✅ 小屏断点未修改字号 / 颜色 / 圆角
❌ 若任意一项不通过，必须重新生成，不得提交。

### Token 截断防护（防漏图关键）
单 Frame / Component 处理，禁止一次性丢整页
若返回数据明显截断：
立即停止
拆分为更小节点重新请求
图片节点若不在返回 JSON 中：
视为 MCP 调用失败
禁止继续生成代码
