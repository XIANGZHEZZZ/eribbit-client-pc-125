<template>
  <!-- 顶部通栏 -->
  <app-navbar></app-navbar>
  <!-- 头部组件 -->
  <app-header></app-header>
  <!-- 吸顶头部 -->
  <app-header-sticky></app-header-sticky>
  <!-- 内容容器 -->
  <div class="app-body">
    <!-- 二级路由 -->
    <RouterView />
  </div>
</template>

<script>
import AppNavbar from '@/components/app-navbar.vue'
import AppHeader from '@/components/app.header.vue'
import AppHeaderSticky from '@/components/app-heade-sticky.vue'
import { useStore } from 'vuex'

export default {
  name: 'Layout',
  components: { AppNavbar, AppHeader, AppHeaderSticky },
  // 获取下分类数据
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>>
