<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import FooterSection from '@/components/FooterSection.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

const router = useRouter()

const menuList = [
  { key: 'profile', label: '个人信息' },
  { key: 'pending', label: '待确认订单' },
  { key: 'fulfilled', label: '履约订单' }
]

const activeMenu = ref('profile')
const userRole = ref<'buyer' | 'partner'>('buyer')

function goHome() {
  router.push('/')
}

const profileCards = [
  { title: '基本信息', items: { 姓名: '张三', 手机号: '138****8888', 所在地区: '广西 · 贺州' } },
  { title: '账户信息', items: { 登录账号: 'zhangsan2024', 注册时间: '2024-06-12', 身份: '采购商' } },
  { title: '余额信息', items: { 可用余额: '¥ 128,500.00', 冻结金额: '¥ 0.00', 总资产: '¥ 128,500.00' } },
  { title: '资金明细', items: { 累计充值: '¥ 300,000.00', 累计提现: '¥ 171,500.00', 累计成交: '¥ 560,000.00' } }
]
</script>

<template>
  <div class="user-center-page">
    <Header always-white />

    <div class="detail-page">
      <div class="detail-body">
        <!-- 面包屑 -->
        <Breadcrumb :items="[{ label: '首页', to: '/' }, { label: '账户中心' }]" />

        <!-- 页面主体：左侧栏 + 右侧内容 -->
        <div class="uc-layout">
          <aside class="uc-sidebar">
            <div class="uc-sidebar-title">账户中心</div>
            <nav class="uc-menu">
              <button
                v-for="menu in menuList"
                :key="menu.key"
                class="uc-menu-item"
                :class="{ active: activeMenu === menu.key }"
                @click="activeMenu = menu.key"
              >
                {{ menu.label }}
              </button>
            </nav>
          </aside>

          <main class="uc-main">
            <!-- 个人信息 -->
            <section v-if="activeMenu === 'profile'" class="uc-section">
              <h2 class="uc-section-title">个人信息</h2>
              <div class="uc-profile-grid">
                <div v-for="card in profileCards" :key="card.title" class="uc-info-card">
                  <div class="uc-info-title">{{ card.title }}</div>
                  <div class="uc-info-list">
                    <div v-for="(value, key) in card.items" :key="key" class="uc-info-row">
                      <span class="uc-info-label">{{ key }}</span>
                      <span class="uc-info-value">{{ value }}</span>
                    </div>
                  </div>
                </div>
                <div class="uc-info-card">
                  <div class="uc-info-title">成交订单</div>
                  <div class="uc-info-list">
                    <div class="uc-info-row">
                      <span class="uc-info-label">累计成交单数</span>
                      <span class="uc-info-value">28 单</span>
                    </div>
                    <div class="uc-info-row">
                      <span class="uc-info-label">最近成交</span>
                      <span class="uc-info-value">2025-07-18</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="uc-actions">
                <button class="uc-btn uc-btn-primary">充值</button>
                <button class="uc-btn uc-btn-outline">提现</button>
              </div>
            </section>

            <!-- 待确认订单 -->
            <section v-if="activeMenu === 'pending'" class="uc-section">
              <h2 class="uc-section-title">待确认订单</h2>
              <div class="uc-empty-state">
                <div class="uc-empty-icon">?</div>
                <p class="uc-empty-text">线下完成撮合后，由运维人员在运营后台记录订单信息，提交双方确认。</p>
                <p class="uc-empty-sub">当前暂无待确认订单</p>
              </div>
            </section>

            <!-- 履约订单 -->
            <section v-if="activeMenu === 'fulfilled'" class="uc-section">
              <div class="uc-section-header">
                <h2 class="uc-section-title">履约订单</h2>
                <div class="uc-role-switch">
                  <span>当前身份：</span>
                  <button class="uc-role-btn" :class="{ active: userRole === 'buyer' }" @click="userRole = 'buyer'">采购商</button>
                  <button class="uc-role-btn" :class="{ active: userRole === 'partner' }" @click="userRole = 'partner'">合作商</button>
                </div>
              </div>
              <div class="uc-order-card">
                <div class="uc-order-header">
                  <span class="uc-order-no">订单号：20250718-001</span>
                  <span class="uc-order-status">已确认</span>
                </div>
                <div class="uc-order-body">
                  <div class="uc-order-info">
                    <div><span class="uc-info-label">商品：</span>横县茉莉花茶 · 特级 500g</div>
                    <div><span class="uc-info-label">金额：</span>¥ 12,000.00</div>
                    <div><span class="uc-info-label">下单时间：</span>2025-07-18 14:30</div>
                  </div>
                  <div class="uc-order-actions">
                    <button class="uc-btn uc-btn-sm uc-btn-outline">订单详情</button>
                    <template v-if="userRole === 'buyer'">
                      <button class="uc-btn uc-btn-sm uc-btn-primary">确认收货</button>
                      <button class="uc-btn uc-btn-sm uc-btn-primary">尾款支付</button>
                    </template>
                    <template v-else>
                      <button class="uc-btn uc-btn-sm uc-btn-primary">发货</button>
                      <button class="uc-btn uc-btn-sm uc-btn-primary">确认收款</button>
                    </template>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>

    <FooterSection />
  </div>
</template>
