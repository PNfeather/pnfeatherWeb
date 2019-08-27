<template>
  <div name='headerTop'>
    <div class="header_item" @click="redirect(item.clickMethod)" v-for="item in list" :key="item.id">{{item.value}}</div>
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
    mounted () {},
    computed: {},
    watch: {},
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
            this.$router.push('login');
            this.$message.success(data.msg);
          } else {
            this.$message.error(data.msg);
          }
        }).catch((err) => {
          this.$message.error(err);
        });
      }
    },
    components: {}
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'headerTop']{
    position: absolute;
    left: 50%;
    top: .8rem;
    transform: translateX(-50%);
    .wh(80%, 1.2rem);
    font-size: .8rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-height: 44px;
    .header_item{
      flex: 4.8rem 0 0;
      font-size: .7rem;
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      background: url("~@IMG/btn.png") center no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
