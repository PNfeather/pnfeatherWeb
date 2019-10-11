<template>
  <div name='home' class="fillcontain">
    <headerTop></headerTop>
    <section class="main_content">
      <transition name="form-fade" mode="in-out">
        <div class="main_content_border" v-show="showContent">
          <div class="main_content_border_wrapper" v-show="showContent">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </div>
      </transition>
    </section>
    <footer class="footer">
      <p>Copyright © 2019 PNfeather-info by PNfeather</p>
      <p>
        <a href="http://www.beian.miit.gov.cn">湘ICP备19020287号</a>. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<script type='text/babel'>
  export default {
    data () {
      return {
        showContent: false
      };
    },
    watch: {
      '$route.path' () {
        this.showContent = false;
        setTimeout(() => {
          this.showContent = true;
        }, 400);
      }
    },
    mounted () {
      this.showContent = true;
    }
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'home']{
    background: url("~@IMG/china-background1.png") center no-repeat;
    background-size: cover;
    background-color: #222;
    padding-top: .8rem;
    box-sizing: border-box;
    overflow: auto;
    position: relative;
    .main_content{
      color: #222;
      overflow: hidden;
      .wh(28rem, 78%);
      min-height: 19rem;
      margin: .8rem auto 120px;
      .main_content_border{
        background: rgba(255, 255, 255, 0.2);
        .wh(100%, 100%);
        padding: .4rem;
        border-radius: .3rem;
        box-sizing: border-box;
        .main_content_border_wrapper{
          background: rgba(255, 255, 255, 0.2);
          box-sizing: border-box;
          padding: .4rem;
          .wh(100%, 100%)
        }
      }
    }
    .footer{
      padding: 5px 0;
      position: absolute;
      bottom: 0;
      left: 0;
      .wh(100%, 60px);
      box-sizing: border-box;
      font-size: 16px;
      text-align: center;
      background: rgba(255, 255, 255, 0.2);
      line-height: 25px;
    }
  }
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all .5s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -90%, 0);
  }
</style>
