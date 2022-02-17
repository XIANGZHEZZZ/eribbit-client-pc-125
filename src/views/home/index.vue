<template>
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
      <!-- 新鲜好物 -->
      <home-new></home-new>
      <!-- 人气推荐 -->
      <home-hots></home-hots>
    </div>
  </div>
</template>

<script>

import HomeBanner from './components/home-banner.vue'
import HomeCategory from './components/home-category.vue'
import HomeNew from './components/home-new.vue'
import HomeHots from './components/home-hots.vue'
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHots
  }
}
</script>

<style lang="less" scoped>
</style>>
