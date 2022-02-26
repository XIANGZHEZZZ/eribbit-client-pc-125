<template>
  <div class="page-login">
    <LoginHeader>欢迎登录</LoginHeader>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a  @click="activeName='account'" :class="{active:activeName==='account'}" href="javascript:;">账户登录</a>
          <a  @click="activeName='qrcode'" :class="{active:activeName==='qrcode'}" href="javascript:;">扫码登录</a>
        </nav>
        <login-form></login-form>
      </div>
    </section>
    <login-footer></login-footer>
  </div>
</template>

<script>
import LoginHeader from './components/login-header.vue'
import { ref } from 'vue'
import LoginForm from './components/login-form.vue'
import LoginFooter from './components/login-footer.vue'
export default {
  name: 'PageLogin',
  components: { LoginHeader, LoginForm, LoginFooter },
  setup () {
    const activeName = ref('account')
    return { activeName }
  }
}
</script>

<style lang="less" scoped>
.page-login {
  .login-section {
    height: 488px;
    position: relative;
    background: url(../../assets/images/login-bg.png) no-repeat center;
    background-size: cover;
    .wrapper {
      width: 380px;
      background: #fff;
      min-height: 400px;
      position: absolute;
      left: 50%;
      top: 54px;
      transform: translate3d(100px,0,0);
      box-shadow: 0 0 10px rgba(0,0,0,.15);
      nav {
        height: 55px;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        padding: 0 40px;
        text-align: right;
        align-items: center;
        a {
          flex: 1;
          line-height: 1;
          display: inline-block;
          font-size: 18px;
          position: relative;
          &:first-child {
            border-right: 1px solid #f5f5f5;
            text-align: left;
          }
          &.active{
            color: @xtxColor;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>>
