<script setup lang="ts">
import { ref } from 'vue'
import Header from '../components/Header.vue'
import FooterSection from '../components/FooterSection.vue'
import Breadcrumb from '../components/Breadcrumb.vue'

// 账号类型：个人 / 企业
type AccountType = 'personal' | 'company'
const accountType = ref<AccountType>('personal')

// 身份选择：采购商 / 合作商
type Identity = 'buyer' | 'partner'
const identity = ref<Identity>('buyer')

type Region = 'guangxi' | 'hezhou' | 'other'
const region = ref<Region>('guangxi')

const form = ref({
  // 个人
  name: '',
  idCard: '',
  // 企业
  companyName: '',
  creditCode: '',
  legalName: '',
  // 共用
  phone: '',
  area: '',
  account: '',
  password: '',
})

function onSubmit() {
  const payload = {
    accountType: accountType.value,
    identity: identity.value,
    region: region.value,
    ...form.value,
  }
  // TODO: 调用注册接口
  console.log('register submit', payload)
  alert('注册信息已提交')
}
</script>

<template>
  <div class="register-page">
    <Header :alwaysWhite="true" />

    <div class="detail-body">
      <!-- 面包屑导航（与二级页通用框架一致，位于内容卡片内部） -->
      <Breadcrumb :items="[{ label: '首页', to: '/' }, { label: '注册' }]" />

      <section class="register-card">
        <h1 class="register-title">账号注册</h1>

        <!-- 账号类型选择 -->
        <div class="register-block">
          <div class="register-block-title">账号类型</div>
          <div class="account-type-group">
            <button
              class="account-type-btn"
              :class="{ active: accountType === 'personal' }"
              @click="accountType = 'personal'"
            >个人注册</button>
            <button
              class="account-type-btn"
              :class="{ active: accountType === 'company' }"
              @click="accountType = 'company'"
            >企业注册</button>
          </div>
        </div>

        <!-- 个人注册表单 -->
        <div v-if="accountType === 'personal'" class="register-fields">
          <div class="input-group">
            <label class="input-label">姓名</label>
            <input v-model="form.name" class="input-field" type="text" placeholder="请输入姓名" />
          </div>
          <div class="input-group">
            <label class="input-label">身份证号</label>
            <input v-model="form.idCard" class="input-field" type="text" placeholder="请输入身份证号" />
          </div>
          <div class="input-group">
            <label class="input-label">手机号</label>
            <input v-model="form.phone" class="input-field" type="tel" placeholder="请输入手机号" />
          </div>
          <div class="input-group">
            <label class="input-label">所在地区</label>
            <select v-model="region" class="input-field">
              <option value="guangxi">广西</option>
              <option value="hezhou">贺州</option>
              <option value="other">其他</option>
            </select>
          </div>
          <div class="input-group">
            <label class="input-label">登录账号</label>
            <input v-model="form.account" class="input-field" type="text" placeholder="请输入登录账号" />
          </div>
          <div class="input-group">
            <label class="input-label">登录密码</label>
            <input v-model="form.password" class="input-field" type="password" placeholder="请输入登录密码" />
          </div>
        </div>

        <!-- 企业注册表单 -->
        <div v-else class="register-fields">
          <div class="input-group">
            <label class="input-label">企业名称</label>
            <input v-model="form.companyName" class="input-field" type="text" placeholder="请输入企业名称" />
          </div>
          <div class="input-group">
            <label class="input-label">统一信用代码</label>
            <input v-model="form.creditCode" class="input-field" type="text" placeholder="请输入统一社会信用代码" />
          </div>
          <div class="input-group">
            <label class="input-label">法人姓名</label>
            <input v-model="form.legalName" class="input-field" type="text" placeholder="请输入法人姓名" />
          </div>
          <div class="input-group">
            <label class="input-label">身份证号</label>
            <input v-model="form.idCard" class="input-field" type="text" placeholder="请输入法人身份证号" />
          </div>
          <div class="input-group">
            <label class="input-label">手机号</label>
            <input v-model="form.phone" class="input-field" type="tel" placeholder="请输入手机号" />
          </div>
          <div class="input-group">
            <label class="input-label">所在地区</label>
            <select v-model="region" class="input-field">
              <option value="guangxi">广西</option>
              <option value="hezhou">贺州</option>
              <option value="other">其他</option>
            </select>
          </div>
          <div class="input-group">
            <label class="input-label">登录账号</label>
            <input v-model="form.account" class="input-field" type="text" placeholder="请输入登录账号" />
          </div>
          <div class="input-group">
            <label class="input-label">登录密码</label>
            <input v-model="form.password" class="input-field" type="password" placeholder="请输入登录密码" />
          </div>
        </div>

        <!-- 身份选择 -->
        <div class="register-block">
          <div class="register-block-title">身份选择</div>
          <div class="account-type-group">
            <button
              class="account-type-btn"
              :class="{ active: identity === 'buyer' }"
              @click="identity = 'buyer'"
            >采购商</button>
            <button
              class="account-type-btn"
              :class="{ active: identity === 'partner' }"
              @click="identity = 'partner'"
            >合作商</button>
          </div>
        </div>

        <button class="submit-btn" @click="onSubmit">提交注册</button>
      </section>
    </div>

    <FooterSection />
  </div>
</template>
