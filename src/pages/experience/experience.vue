<template>
  <div name='experience' class="fillcontain">
    <div class="top_title">
      <div class="title">时间线</div>
      <div class="download">
        <span>下载</span>
        <a href="static/files/aboutMe.doc" download="个人简历">word版</a>
        <span>最后更新：2019.10.9</span>
      </div>
    </div>
    <div class="down_content">
      <section class="experience-item" :class="{'activeItem': activeItem === index}" @mouseenter="changeActiveItem(index)" @mouseover="changeActiveItem(index)" @mouseleave="changeActiveItem(-1)" v-for="(item, index) in experienceList" :key="index">
        <div class="time" @click="changeShow(item)">
          <span class="time_time">2014/9-2016/4</span>
          <span class="time_icon_line">
            <i v-show="item.showDetail" class="iconfont iconUp"></i>
            <i v-show="!item.showDetail" class="iconfont iconDown"></i>
          </span>
          <span class="funBtn" @click.stop>
            <i v-show="activeItem === index" class="iconfont iconEdit" @click.stop="editItem(item)"></i>
            <i v-show="activeItem === index" class="iconfont iconDelete" @click.stop="deleteItem(item)"></i>
          </span>
        </div>
        <div class="border">
          <transition name="form-fade" mode="in-out">
            <div class="detail" v-show="item.showDetail">
              <div class="company">单位：中国建筑第五工程局有限公司</div>
              <div class="introduce">建筑/建材/工程 | 10000人以上 | 国企 | 工程部</div>
              <div class="position">职位：建筑工程师</div>
              <div class="sub-title">工作描述:</div>
              <pre class="sub-content">
        工作内容：
        1、监督管理楼栋施工进度及施工质量；
        2、协调各工种之间的配合；
        3、楼栋工人的人员调配；
        4、根据楼栋工作安排工长嵌入施工时间；
        个人成长：
        1、合理安排工作时间及工作流程；
        2、善于沟通，知道如何才能有效的安排包工头手下工人去不抗拒的工作；
        3、韧性变得极强，懂进退
            </pre>
            </div>
          </transition>
        </div>
      </section>
    </div>
  </div>
</template>

<script type='text/babel'>
  export default {
    name: 'experience',
    data () {
      return {
        activeItem: -1,
        experienceList: [
          {showDetail: true},
          {showDetail: true}
        ]
      };
    },
    created () {},
    mounted () {},
    computed: {},
    watch: {},
    methods: {
      changeShow (item) {
        this.$set(item, 'showDetail', !item.showDetail);
      },
      changeActiveItem (index) {
        this.activeItem = index;
      },
      editItem (item) {
        console.log('编辑');
      },
      deleteItem (item) {
        console.log('删除');
      }
    },
    components: {}
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'experience']{
    display: flex;
    flex-direction: column;
    .top_title{
      margin-bottom: .5rem;
      .title{
        text-align: center;
        border-bottom: 1px solid #333;
      }
      .download{
        font-size: .4rem;
        text-align: center;
        a{
          margin: 0 .3rem;
        }
        span{
          color: #666;
        }
      }
    }
    .down_content{
      flex: 1;
      overflow: auto;
      pre{
        margin: 0;
      }
      .activeItem{
        background: rgba(255, 255, 255, 0.2);
      }
      .experience-item{
        font-size: .6rem;
        padding: .5rem;
        box-sizing: border-box;
        line-height: .9rem;
        .time{
          display: flex;
          justify-content: flex-start;
          cursor: pointer;
          .time_time{
            margin-right: .3rem;
          }
          .time_icon_line{
            flex: 1;
            position: relative;
            .iconfont{
              font-size: .7rem;
              color: #fff;
              float: right;
            }
            &:after{
              content: '';
              height: 1px;
              position: absolute;
              right: .7rem;
              left: 0;
              top: 50%;
              background: #fff;
            }
          }
          .funBtn{
            width: 3rem;
            display: flex;
            justify-content: flex-end;
            padding-right: .4rem;
            .iconfont{
              font-size: .8rem;
              color: @purple;
              margin-left: .7rem;
              &:hover{
                color: @red;
              }
            }
          }
        }
        .border{
          overflow: hidden;
        }
        .introduce{
          font-size: .5rem;
          color: #666;
          text-indent: 1.8rem;
        }
        .position, .introduce, .time{
          margin-bottom: .5rem;
        }
        .sub-content{
          font-size: .5rem;
          color: #666;
        }
      }
      .form-fade-enter-active, .form-fade-leave-active {
        transition: all .5s;
      }
      .form-fade-enter, .form-fade-leave-active {
        transform: translate3d(0, -90%, 0);
      }
    }
  }
</style>
