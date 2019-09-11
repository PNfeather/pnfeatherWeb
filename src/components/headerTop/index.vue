<template>
  <div name='headerTop'>
    <div class="header_item" :class="{header_item_active: isActive(item.clickMethod)}" @click="redirect(item.clickMethod)" v-for="item in list" :key="item.id">{{item.value}}</div>
  </div>
</template>

<script type='text/babel'>
  import {logout} from '@/api/user';
  export default {
    name: 'headerTop',
    data () {
      return {
        list: [
          {
            id: '1',
            value: '首页',
            clickMethod: 'jump-home'
          }, {
            id: '2',
            value: '经历',
            clickMethod: 'jump-experience'
          }, {
            id: '3',
            value: '收藏',
            clickMethod: 'jump-collect'
          }, {
            id: '4',
            value: '登出',
            clickMethod: 'logout'
          }
        ]
      };
    },
    created () {},
    mounted () {
    },
    computed: {
      isActive () {
        return (param) => {
          let active = false;
          if (~param.indexOf('-')) {
            this.$route.path.replace('/', '') == param.split('-')[1] && (active = true);
          }
          return active;
        };
      }
    },
    methods: {
      redirect (method) {
        let methodArr = method.split('-');
        let methodType = methodArr[0];
        let methodParams = methodArr[1];
        this[methodType](methodParams);
      },
      jump (path) {
        let currentPath = this.$route.fullPath.replace('/', '');
        path != currentPath && this.$router.push(path);
      },
      logout () {
        logout().then(res => {
          let data = res.data;
          if (data.code == 0) {
            this.$router.push({path: 'login', query: {autoBack: true}});
            this.$message.success(data.msg);
          } else {
            this.$message.error(data.msg);
          }
        }).catch((err) => {
          this.$message.error(err);
        });
      }
    }
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'headerTop']{
    margin: 0 auto;
    .wh(28rem, 1.2rem);
    font-size: .8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: 44px;
    .header_item_active{
      color: #26649D!important;
    }
    .header_item{
      color: #000;
      flex: 4.2rem 0 0;
      font-size: .6rem;
      display: flex;
      height: 100%;
      justify-content: center;
      box-sizing: border-box;
      align-items: center;
      background: url("~@IMG/btn2.png") center no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      &:hover{
        transform: scale(1.2, 1.2);
      }
    }
  }
</style>
