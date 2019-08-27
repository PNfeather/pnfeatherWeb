<template>
  <div name='collect'>
    <section class="btn_group">
      <div class="btn">
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
        justify-content: flex-end;
        align-items: center;
        background: url("~@IMG/btn.png") center no-repeat;
        background-size: 100% 100%;
        color: #333;
        text-align: right;
        box-sizing: border-box;
        padding-right: .5rem;
      }
    }
  }
</style>
