<template>
  <div name='homeContent'>
    <div v-for="(item, index) in pageTexts" :key="index">
      <span v-if="!item.children" :class=[item.className] :ref="item.el" data-text></span>
      <div v-if="item.children">
        <span v-for="(child, childIndex) in item.children" :key="childIndex" :class=[child.className] :ref="child.el"></span>
      </div>
    </div>
    <div class="initial-keyframe">
      <li><span>姓名<br>羽</span></li>
      <li><span>姓别<br>男</span></li>
      <li><span>年龄<br>{{years}}</span></li>
    </div>
    <div class="contactWay">
      <div class="title">联系方式:</div>
      <div class="content">
        <div>微信：<span v-clipboard:copy="wxInfo" v-clipboard:success="onCopy('wx')" v-clipboard:error="onError">{{wxInfo}}</span></div>
        <div>QQ：<span v-clipboard:copy="qqInfo" v-clipboard:success="onCopy('qq')" v-clipboard:error="onError">{{qqInfo}}</span></div>
      </div>
    </div>
  </div>
</template>

<script type='text/babel'>
  import Typing from './method';
  import {getServiceTime} from '@/api/common';
  export default {
    name: 'homeContent',
    data () {
      return {
        delayTime: 400,
        years: '',
        wxInfo: 'yu13824424446',
        qqInfo: '921192114',
        pageTexts: [
          {
            el: 'welcome',
            className: 'electromagnetism',
            text: '欢迎来到羽的空间'
          }, {
            className: 'nickName',
            children: [
              {
                el: 'nickName-label',
                className: 'labelText',
                text: '常用网络ID'
              }, {
                el: 'nickName-value',
                text: '：PNfeather、紫夜羽'
              }
            ]
          }, {
            className: 'occupation',
            children: [
              {
                el: 'occupation-label',
                className: 'labelText',
                text: '职业'
              }, {
                el: 'occupation-value',
                text: '：前端工程师'
              }
            ]
          }, {
            className: 'school',
            children: [
              {
                el: 'school-label',
                className: 'labelText',
                text: '毕业院校'
              }, {
                el: 'school-value',
                text: '：西安科技大学'
              }
            ]
          }, {
            className: 'birthday',
            children: [
              {
                el: 'birthday-label',
                className: 'labelText',
                text: '生日'
              }, {
                el: 'birthday-value',
                text: '：1991-10-26'
              }
            ]
          }, {
            className: 'presentAddress',
            children: [
              {
                el: 'presentAddress-label',
                className: 'labelText',
                text: '现居地'
              }, {
                el: 'presentAddress-value',
                text: '：深圳市罗湖区'
              }
            ]
          }, {
            className: 'presentCondition',
            children: [
              {
                el: 'presentCondition-label',
                className: 'labelText',
                text: '现状态'
              }, {
                el: 'presentCondition-value',
                text: '：工作ing'
              }
            ]
          }
        ]
      };
    },
    mounted () {
      this.start();
      this.getYears();
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
      },
      getYears () {
        getServiceTime().then(res => {
          let data = res.data;
          if (data.code == 0) {
            const nowTime = new Date(data.data);
            const diffYear = nowTime.getFullYear() - 1991;
            const diffMonth = nowTime.getMonth() - 10;
            const diffDate = nowTime.getDate() - 26;
            if (diffMonth > 0) {
              this.years = diffYear;
            } else if (diffMonth < 0) {
              this.years = diffYear - 1;
            } else {
              if (diffDate >= 0) {
                this.years = diffYear;
              } else if (diffDate < 0) {
                this.years = diffYear - 1;
              }
            }
          } else {
            this.$message.error(data.msg);
          }
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      onCopy (type) { // 复制成功
        if (type === 'wx') {
          return () => {
            this.$message.success('微信信息已复制');
          };
        } else {
          return () => {
            this.$message.success('qq信息已复制');
          };
        }
      },
      onError () { // 复制失败
        this.$message.error('复制失败');
      }
    }
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'homeContent']{
    .wh(100%, 100%);
    position: relative;
    span{
      font-size: .6rem;
    }
    .labelText{
      text-align-last: justify;
      display: inline-block;
      width: 4rem;
      margin-right: .3rem;
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
    .initial-keyframe {
      position: absolute;
      right: 2rem;
      top: 4rem;
      width: 100px;
      height: 100px;
      li {
        position: absolute;
        border-radius: 100%;
        width: 100%;
        height: 100%;
        text-align: center;
        background-image: linear-gradient(45deg, #616B70, #1E2D3A);
        font-size: 16px;
        line-height: 50px;
        color: #fff;
        transform: rotate(0) translate(0, -80px);
        animation: rotate 3s linear infinite;
        &:nth-child(2) {
          animation-delay: -1s;
        }
        &:nth-child(3) {
          animation-delay: -2s;
        }
        span::after{
          content: '';
          width: 100%;
          height: 1px;
          background-color: #fff;
          position: absolute;
          left: 0;
          top: 50%;
        }
      }
      @keyframes rotate {
        to {
          transform: rotate(1turn) translate(0, -80px);
        }
      }
    }
    .contactWay{
      position: absolute;
      bottom: 0;
      font-size: .7rem;
      .content{
        display: flex;
        justify-content: flex-start;
        >div{
          margin-right: 1rem;
          >span{
            cursor: pointer;
            &:hover{
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>
