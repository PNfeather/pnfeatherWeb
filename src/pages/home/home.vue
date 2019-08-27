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
    background: url("~@IMG/background-home.jpg") center no-repeat;
    background-size: cover;
    background-color: #222;
    .main_content{
      color: #f1f1f1;
      overflow: hidden;
      .wh(28rem, 78%);
      position: absolute;
      top: 2rem;
      left: 50%;
      transform: translateX(-50%);
      .main_content_border{
        background: url("~@IMG/background-home.png") center no-repeat;
        background-size: cover;
        background-color: #222;
        .wh(100%, 100%);
        position: absolute;
        left: 0;
        top: 0;
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
  }
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all .5s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -90%, 0);
  }
</style>
