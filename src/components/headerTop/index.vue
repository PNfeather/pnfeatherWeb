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
    .wh(500px, 60px);
    display: flex;
    .header_item{
      flex: 1;
      display: flex;
      height: 100%;
      justify-content: center;
      align-content: center;
    }
  }
</style>
