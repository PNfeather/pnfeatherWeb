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
      <div v-show="showFooter">
        <p @click="handleFooter">Copyright © 2019 PNfeather-info by PNfeather</p>
        <p>
          <a href="http://www.beian.miit.gov.cn">湘ICP备19020287号-1</a>. All rights reserved.
        </p>
      </div>
      <p v-show="!showFooter" @click="handleFooter">显示网站备案</p>
    </footer>
  </div>
</template>

<script type='text/babel'>
  export default {
    data () {
      return {
        showContent: false,
        showFooter: true
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

      const oldData = [
        {id: 1, name: 'boss', parentId: 0},
        {id: 2, name: 'lily', parentId: 1},
        {id: 3, name: 'jack', parentId: 1},
        {id: 4, name: 'john', parentId: 2},
        {id: 5, name: 'boss2', parentId: 0}
      ];

      function listToTree (oldArr) {
        let result = {};
        oldArr.forEach(element => {
          let parentId = element.parentId;
          if (parentId !== 0) {
            oldArr.forEach(ele => {
              if (ele.id == parentId) {
                if (!ele.children) {
                  ele.children = {};
                }
                ele.children[element.id] = element;
              }
            });
          } else {

          }
        });
        console.log(oldArr);
        return oldArr;
      }
      listToTree(oldData);
    },
    methods: {
      handleFooter () {
        this.$store.getters.userLevel === '1' && (this.showFooter = !this.showFooter);
      }
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
    .main_content{
      color: #222;
      overflow: hidden;
      .wh(28rem, 78%);
      min-height: 500px;
      margin: .8rem auto 80px;
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
      position: fixed;
      bottom: 0;
      padding: 5px 0;
      width: 100%;
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
