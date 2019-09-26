<template>
  <div name='homeContent'>
    <div v-for="(item, index) in pageTexts" :key="index">
      <span v-if="!item.children" :class=[item.className] :ref="item.el" data-text></span>
      <div v-if="item.children">
        <span v-for="(child, childIndex) in item.children" :key="childIndex" :class=[child.className] :ref="child.el"></span>
      </div>
    </div>
  </div>
</template>

<script type='text/babel'>
  import Typing from './method';
  export default {
    name: 'homeContent',
    data () {
      return {
        delayTime: 400,
        pageTexts: [
          {
            el: 'welcome',
            className: 'electromagnetism',
            text: '欢迎来到羽的空间'
          }, {
            className: 'name',
            children: [
              {
                el: 'name-label',
                className: 'labelText',
                text: '姓名:'
              }, {
                el: 'name-value',
                text: '羽'
              }
            ]
          }, {
            className: 'nickName',
            children: [
              {
                el: 'nickName-label',
                className: 'labelText',
                text: '常用网络ID:'
              }, {
                el: 'nickName-value',
                text: 'PNfeather、紫夜羽'
              }
            ]
          }
        ]
      };
    },
    mounted () {
      this.start();
    },
    methods: {
      start () { // 欢迎文案依次打出效果
        this.pageTexts.forEach((item) => {
          if (!item.children) {
            this.dealItem(item);
          } else {
            item.children.forEach((child) => {
              this.dealItem(child);
            });
          }
        });
      },
      dealItem (item) {
        const el = this.$refs[item.el][0];
        const text = item.text;
        const typing = new Typing(el, text);
        el.innerHTML = '';
        el.attributes['data-text'] && (el.attributes['data-text'].value = '');
        setTimeout(() => {
          typing.startTyping();
        }, this.delayTime);
        this.delayTime += (text.length + 20) * 20;
      }
    },
    components: {}
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'homeContent']{
    .wh(100%, 100%);
    [class*='section-']{
      .wh(100%, 100%)
    }
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
    .labelText{
      margin-right: .3rem;
    }
  }
</style>
