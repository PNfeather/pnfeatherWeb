<template>
  <div name='about' class="fillcontain">
    <mavon-editor class="md" v-html="aboutContent" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
  </div>
</template>

<script type='text/babel'>
  import aboutContent from './aboutContent.md';
  export default {
    data () {
      return {
        aboutContent: aboutContent
      };
    },
    mounted () {
    }
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'about']{
    .wh(100%, 100%);
    overflow: auto;
    .markdown-body{
      background: transparent;
      border: none;
    }
  }
</style>
