import { reactive, toRefs } from 'vue'

// 单例登录弹窗状态，供全站任意位置（顶栏按钮等）触发
const state = reactive({
  isLoginModalOpen: false
})

export function useLoginModal() {
  function openLoginModal() {
    state.isLoginModalOpen = true
  }
  function closeLoginModal() {
    state.isLoginModalOpen = false
  }
  return {
    ...toRefs(state),
    openLoginModal,
    closeLoginModal
  }
}
