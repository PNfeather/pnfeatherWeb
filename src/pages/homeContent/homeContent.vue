<template>
  <div name='homeContent'>
    <div class="electromagnetism" data-text="欢迎来到羽的次元">
      欢迎来到羽的次元
    </div>
  </div>
</template>

<script type='text/babel'>
  export default {
    name: 'homeContent',
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
  [name = 'homeContent']{
    .electromagnetism { // 电磁干扰文
      position: relative;
      font-weight: bold;
      font-size: 2rem;
      &::before,
      &::after {
        color: #000;
        overflow: hidden;
        position: absolute;
        top: 0;
        clip: rect(0, 900px, 0, 0);
        content: attr(data-text);
        animation: shake 3s linear infinite alternate-reverse;
      }
      &::before {
        left: -2px;
        text-shadow: 1px 0 #0000ff;
      }
      &::after {
        left: 2px;
        text-shadow: -1px 0 #ff0000;
        animation-duration: 2s;
      }
      @keyframes shake {
        @steps: 20;
        @s: ~`Math.round(Math.random() * 100) + 'px'`; // 嵌入js，需要配置less选项
        .generate-columns(@steps);
        .generate-columns(@n, @i: 1) when (@i =< @n) {
          @percentage: round(percentage(@i * (1 / @n)));
          @{percentage} {
            clip: rect(@s, 9999px, @s, 0);
          }
          .generate-columns(@n, (@i + 1));
        }
      }
    }
  }
</style>
