<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import FooterSection from '@/components/FooterSection.vue'

const activeMenu = ref('profile')
const userRole = ref<'buyer' | 'partner'>('buyer')

const user = {
  name: '张三',
  id: '138****6688',
  avatarInitial: '张'
}

const quickActions = [
  { label: '个人中心', icon: 'home', to: 'profile' },
  { label: '订单管理', icon: 'order', to: 'pending' },
  { label: '编辑资料', icon: 'edit' },
  { label: '修改密码', icon: 'lock' },
  { label: '实名认证', icon: 'id' },
  { label: '消息通知', icon: 'bell' }
]

const assets = [
  { name: '累计充值', amount: '300,000.00', unit: '¥', key: 'recharge' },
  { name: '累计提现', amount: '171,500.00', unit: '¥', key: 'withdraw' }
]

const orderStats = [
  { label: '待确认订单', count: 0, key: 'pending' },
  { label: '履约订单', count: 1, key: 'fulfilled' }
]

const quickIcons: Record<string, string> = {
  home: 'M12 3 2 12h3v8h6v-5h2v5h6v-8h3L12 3zm0 2.7 6 5.3V19h-2v-5H8v5H6v-8.7l6-5.3z',
  edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM14.06 6.19l3.75 3.75 1.83-1.83a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83z',
  lock: 'M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5zm3 8H9V6a3 3 0 0 1 6 0v3z',
  id: 'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
  bell: 'M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22zm7-6v-5a7 7 0 0 0-5-6.7V4a2 2 0 0 0-4 0v.3A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2z',
  order: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 12h-5v-2h5v2zm0-4h-5v-2h5v2zm0-4h-5V7h5v2zm6 8h-3v-2h3v2zm0-4h-3v-2h3v2zm0-4h-3V7h3v2z'
}
</script>

<template>
  <div class="user-center-page">
    <Header always-white />

    <div class="detail-page">
      <div class="uc-page">
        <!-- 左侧导航 -->
        <aside class="uc-sidebar">

          <div class="uc-user-badge">
            <div class="uc-avatar">{{ user.avatarInitial }}</div>
            <div class="uc-user-meta">
              <div class="uc-user-name">{{ user.name }}</div>
              <div class="uc-user-id">{{ user.id }}</div>
            </div>
          </div>

          <nav class="uc-side-quick">
            <div class="uc-side-quick-list">
              <button
                v-for="action in quickActions"
                :key="action.label"
                class="uc-side-quick-item"
                :class="{ active: action.to && activeMenu === action.to }"
                type="button"
                @click="action.to && (activeMenu = action.to)"
              >
                <svg class="uc-quick-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path :d="quickIcons[action.icon]" />
                </svg>
                <span class="uc-quick-label">{{ action.label }}</span>
              </button>
            </div>
          </nav>
        </aside>

        <!-- 右侧主内容 -->
        <main class="uc-main">
          <!-- 资产总览 -->
          <template v-if="activeMenu === 'profile'">
            <section class="uc-hero">
              <div class="uc-hero-balance">
                <span class="uc-balance-label">账户余额</span>
                <div class="uc-balance-value">
                  <span class="uc-balance-unit">¥</span>
                  128,500.00
                </div>
              </div>

              <div class="uc-hero-side">
                <div class="uc-balance-sub">
                  <span>可用：¥ 128,500.00</span>
                  <span>冻结：¥ 0.00</span>
                </div>

                <div class="uc-hero-actions">
                  <button class="uc-btn uc-btn-primary">充值</button>
                  <button class="uc-btn uc-btn-outline">转账</button>
                  <button class="uc-btn uc-btn-outline">明细</button>
                </div>
              </div>
            </section>

            <div class="uc-stats">
              <button
                v-for="stat in orderStats"
                :key="stat.key"
                class="uc-stat-card"
                type="button"
                @click="activeMenu = stat.key"
              >
                <span class="uc-stat-label">{{ stat.label }}</span>
                <span class="uc-stat-value">
                  <span class="uc-stat-count">{{ stat.count }}</span>
                  <span class="uc-stat-unit">笔</span>
                </span>
              </button>
            </div>

            <div class="uc-content-row">
              <section class="uc-assets">
                <div class="uc-asset-grid">
                  <div v-for="asset in assets" :key="asset.key" class="uc-asset-card">
                    <div class="uc-asset-name">{{ asset.name }}</div>
                    <div class="uc-asset-amount">
                      <span class="uc-asset-unit">{{ asset.unit }}</span>
                      {{ asset.amount }}
                    </div>
                    <div class="uc-asset-actions">
                      <button class="uc-btn uc-btn-sm uc-btn-outline" type="button">收款</button>
                      <button class="uc-btn uc-btn-sm uc-btn-primary" type="button">转账</button>
                      <button class="uc-btn uc-btn-sm uc-btn-text" type="button">明细</button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </template>

          <!-- 待确认订单 -->
          <section v-if="activeMenu === 'pending'" class="uc-section">
            <div class="uc-stats">
              <div class="uc-stat-card">
                <span class="uc-stat-label">待确认订单</span>
                <span class="uc-stat-value">
                  <span class="uc-stat-count">0</span>
                  <span class="uc-stat-unit">笔</span>
                </span>
              </div>
            </div>
            <div class="uc-table-card">
              <table class="uc-table">
                <thead>
                  <tr>
                    <th>订单号</th>
                    <th>商品</th>
                    <th>金额</th>
                    <th>下单时间</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="uc-table-empty">
                    <td colspan="6">当前暂无待确认订单</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- 履约订单 -->
          <section v-if="activeMenu === 'fulfilled'" class="uc-section">
            <div class="uc-section-head-between uc-stats-head">
              <div class="uc-stats">
                <div class="uc-stat-card">
                  <span class="uc-stat-label">履约订单</span>
                  <span class="uc-stat-value">
                    <span class="uc-stat-count">1</span>
                    <span class="uc-stat-unit">笔</span>
                  </span>
                </div>
              </div>
              <div class="uc-role-switch">
                <span>当前身份：</span>
                <button class="uc-role-btn" :class="{ active: userRole === 'buyer' }" @click="userRole = 'buyer'">采购商</button>
                <button class="uc-role-btn" :class="{ active: userRole === 'partner' }" @click="userRole = 'partner'">合作商</button>
              </div>
            </div>
            <div class="uc-table-card">
              <table class="uc-table">
                <thead>
                  <tr>
                    <th>订单号</th>
                    <th>商品</th>
                    <th>金额</th>
                    <th>下单时间</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>20250718-001</td>
                    <td>横县茉莉花茶 · 特级 500g</td>
                    <td>¥ 12,000.00</td>
                    <td>2025-07-18 14:30</td>
                    <td><span class="uc-order-status">已确认</span></td>
                    <td>
                      <div class="uc-order-actions">
                        <button class="uc-btn uc-btn-sm uc-btn-outline" type="button">订单详情</button>
                        <button v-if="userRole === 'buyer'" class="uc-btn uc-btn-sm uc-btn-primary" type="button">确认收货</button>
                        <button v-if="userRole === 'buyer'" class="uc-btn uc-btn-sm uc-btn-primary" type="button">尾款支付</button>
                        <button v-if="userRole !== 'buyer'" class="uc-btn uc-btn-sm uc-btn-primary" type="button">发货</button>
                        <button v-if="userRole !== 'buyer'" class="uc-btn uc-btn-sm uc-btn-primary" type="button">确认收款</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>

    <FooterSection />
  </div>
</template>
