<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginModal } from '../composables/useLoginModal'

const router = useRouter()
const { isLoginModalOpen, closeLoginModal } = useLoginModal()

const phone = ref('')
const code = ref('')
const agreed = ref(false)
const countdown = ref(0)
let timer: number | null = null

const canSubmit = computed(() => phone.value.trim().length > 0 && code.value.trim().length > 0 && agreed.value)

function getCode() {
  if (countdown.value > 0) return
  countdown.value = 60
  timer = window.setInterval(() => {
    countdown.value -= 1
    if (countdown.value <= 0 && timer) {
      window.clearInterval(timer)
      timer = null
    }
  }, 1000)
}

function onSubmit() {
  if (!canSubmit.value) return
  // TODO: 调用登录接口
  console.log('[LoginModal] 登录', { phone: phone.value, code: code.value })
}

function onClose() {
  closeLoginModal()
}

function onMaskClick() {
  closeLoginModal()
}

function goRegister() {
  closeLoginModal()
  router.push('/register')
}
</script>

<template>
  <div v-if="isLoginModalOpen" class="login-mask" @click.self="onMaskClick">
    <div class="login-window" role="dialog" aria-modal="true">
      <!-- 关闭按钮 -->
      <button class="login-close" @click="onClose" aria-label="关闭">
        <img src="/login/login-close.svg" class="login-close-icon" alt="" width="30" height="30">
      </button>

      <!-- 左侧品牌区 -->
      <div class="login-bg">
        <img src="/login/login-bg-logo.svg" class="login-bg-deco" alt="">
        <div class="login-bg-brand">
          <div class="login-bg-login">LOGIN</div>
          <div class="login-bg-text">
            <div class="login-bg-text-line1">广西优质农产品</div>
            <div class="login-bg-text-line2">原产地采购平台</div>
          </div>
        </div>
      </div>

      <!-- 右侧表单区 -->
      <div class="login-form">
        <!-- 顶部 Logo -->
        <div class="login-form-logo">
          <img src="/login/login-form-logo.svg" class="login-form-logo-img" alt="桂字号">
        </div>

        <div class="login-body">
          <!-- 表单 -->
          <div class="login-fields">
            <!-- 手机号 -->
            <div class="login-field">
              <div class="login-field-label">
                <img src="/login/login-icon-phone.svg" class="login-field-icon" alt="" width="24" height="24">
                <span class="login-field-text">手机号</span>
              </div>
              <div class="login-field-input">
                <input type="tel" class="login-input" placeholder="请输入手机号" v-model="phone">
              </div>
            </div>

            <!-- 验证码 -->
            <div class="login-field">
              <div class="login-field-label">
                <img src="/login/login-icon-safe.svg" class="login-field-icon" alt="" width="24" height="24">
                <span class="login-field-text">验证码</span>
              </div>
              <div class="login-field-input login-field-input--code">
                <input type="text" class="login-input" placeholder="请输入验证码" v-model="code">
                <span class="login-divider"></span>
                <button class="login-getcode" :disabled="countdown > 0" @click="getCode">
                  {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
                </button>
              </div>
            </div>

            <!-- 协议 -->
            <label class="login-agree">
              <span class="login-checkbox" :class="{ 'login-checkbox--checked': agreed }" @click.prevent="agreed = !agreed">
                <img v-if="agreed" src="/login/login-check-tick.svg" class="login-check-tick" alt="" width="12" height="12">
              </span>
              <span class="login-agree-text">我已阅读并同意《用户服务协议》《隐私协议》</span>
            </label>
          </div>

          <!-- 按钮区 -->
          <div class="login-actions">
            <button class="login-submit" :class="{ 'login-submit--disabled': !canSubmit }" @click="onSubmit">登录</button>
            <div class="login-register" @click="goRegister">
              <span class="login-register-text">还没有账号，立刻去注册</span>
              <img src="/login/login-register-arrow.svg" class="login-register-arrow" alt="" width="30" height="30">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
