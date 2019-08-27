<template>
  <div name='collect'>
    <section class="btn_group">
      <div class="btn">
        <img class="icon" src="@IMG/collect_icon.png" alt="">
        添加收藏
      </div>
    </section>
    collect
  </div>
</template>

<script type='text/babel'>
  export default {
    name: 'collect',
    data () {
      return {
      };
    },
    created () {},
    mounted () {},
    computed: {},
    watch: {},
    methods: {},
    components: {}
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'collect']{
    position: relative;
    .wh(100%, 100%);
    overflow: auto;
    .btn_group{
      position: absolute;
      right: 0;
      top: 0;
      width: 10rem;
      height: 1.2rem;
      font-size: .6rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn{
        flex: 4.2rem 0 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999;
        font-size: .6rem;
        border-radius: .4rem;
        background: rgba(0, 0, 0, 0.2);
        &:hover{
          text-decoration: underline;
          color: #fff!important;
          .icon{
            transform: scale(1.2, 1.2);
          }
        }
        .icon{
          .wh(.7rem, .7rem);
          margin-right: .2rem;
        }
      }
    }
  }
</style>
