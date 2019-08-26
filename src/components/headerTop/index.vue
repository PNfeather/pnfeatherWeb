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
            value: '首页'
          }, {
            id: '2',
            value: '登出',
            clickMethod: 'logout'
          }, {
            id: '3',
            value: '登出',
            clickMethod: 'logout'
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
        this[method]();
      },
      logout () {
        console.log('登出');
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
    .wh(100%, 1.6rem);
    font-size: .8rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: linear-gradient(#555, #999);
    .header_item{
      flex: 4.8rem 0 0;
      display: flex;
      height: 1.2rem;
      justify-content: center;
      align-content: center;
      background: url("~@IMG/btn.png") center no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
