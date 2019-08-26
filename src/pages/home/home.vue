<template>
  <div name='home' class="fillcontain">
    <section class="main_content">
      <headerTop></headerTop>
    </section>
  </div>
</template>

<script type='text/babel'>
  export default {
    data () {
      return {

      };
    }
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'home']{
    background: url("~@IMG/background-home.png") center no-repeat;
    background-size: cover;
    background-color: #222;
    .main_content{
      background: url("~@IMG/background.png") center no-repeat;
      background-size: cover;
      background-color: #222;
      .wh(28rem, 16rem);
      .ctt();
    }
  }
</style>
