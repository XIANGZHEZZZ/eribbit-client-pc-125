<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-else>
    <nav class="tab">
      <a @click="hasAccount=true" href="javascript:;" :class="{active:hasAccount}">
        <i class="iconfont icon-icon_unchecked" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click="hasAccount=false" href="javascript:;" :class="{active:!hasAccount}">
        <i class="iconfont icon-icon_checked" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <CallbackBind :unionId="unionId" v-if="hasAccount"></CallbackBind>
    <CallbackPatch :unionId="unionId" v-else></CallbackPatch>
  </section>
</template>

<script>
import { ref } from 'vue'
import LoginHeader from './components/login-header.vue'
import QC from 'qc'
import { userQQLogin } from '@/api/user'
import CallbackBind from './components/callback-bind.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Message from '@/components/library/Message'
import CallbackPatch from './components/callback-patch.vue'
export default {
  name: 'LoginCallback',
  components: {
    LoginHeader,
    CallbackBind,
    CallbackPatch
  },
  setup () {
    const hasAccount = ref(true)

    // 首先：默认认为已经注册且已经绑定
    // 通过QQ的API获取openId就是后台需要的unionId然后去进行登录
    // 如果成功：登录成功
    // 如果失败：改QQ未和小兔仙进行绑定（有帐号未绑定QQ，没有帐号未绑定QQ）
    const isBind = ref(true)
    // 确保QQ已经登录
    const unionId = ref(null)
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    if (QC.Login.check()) {
      // 第三方唯一标识QQ唯一标识
      QC.Login.getMe((openId) => {
        unionId.value = openId
        // 请求小兔鲜后台，做QQ登录
        userQQLogin(openId).then(data => {
          console.log(data)
          // 实现和之前登录一样的逻辑
          // 1. 存储用户信息
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          router.push(route.query.redirectUrl || '/')
          Message({ type: 'success', text: '登录成功' })
        }).catch(e => {
          // 登录失败：没有和小兔鲜绑定
          isBind.value = false
        })
      })
    }
    return { hasAccount, isBind, unionId }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: url(../../assets/images/load.gif) no-repeat center / 100px 100px;
    }
  }
  .tab {
    background-color: #fff;
    height: 80px;
    padding-top: 40px;
    font-size: 18px;
    text-align: center;
    a {
      color: #666;
      display: inline-block;
      width: 350px;
      line-height: 40px;
      border-bottom: 2px solid #e4e4e4;
      i {
        font-size: 22px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
        margin-left: 4px;
      }
      &.active {
        color: @xtxColor;
        border-color: @xtxColor;
      }
    }
  }
}
</style>>
