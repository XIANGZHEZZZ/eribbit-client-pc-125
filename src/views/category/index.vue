<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBreadItem to="1005002">全部</XtxBreadItem>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <a href="javascript:;">
              <img :src="sub.picture" >
              <p>{{sub.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 全部分类 -->

      <!-- 各个分类推荐商品 -->
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { findBanner } from '@/api/home'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  name: 'TopCategory',
  setup () {
    // 轮播图
    const sliders = ref()
    findBanner().then(data => {
      sliders.value = data.result
    })
    // 面包屑+所有子分类 ====> vuex
    // 分类数据在vuex category.list中
    // 面包屑+所有子分类 ====> vuex
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      let cate = {}
      // 当前顶级分类 === 根据路由上的ID去vuex中category模块的list中查找
      const item = store.state.category.list.find(item => {
        return item.id === route.params.id
      })
      // 找到数据赋值
      if (item) cate = item
      return cate
    })
    return { sliders, topCategory }
  }
}
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      min-height: 160px;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
