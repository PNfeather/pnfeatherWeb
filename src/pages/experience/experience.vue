<template>
  <div name='experience' class="fillcontain">
    <div class="top_title">
      <div class="title">时间线<i @click="openAddModal" class="iconfont iconAdd"></i></div>
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
            <span class="border" v-show="activeItem === index">
              <i class="iconfont iconEdit" @click.stop="editItem(item)"></i>
              <i class="iconfont iconDelete" @click.stop="deleteItem(item)"></i>
            </span>
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
    <el-dialog
      title="新赠时间线"
      :visible.sync="experienceToggle"
      width="70%"
      center>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="时间定位">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="开始时间" v-model="form.startTime" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col :span="2" style="text-align: center">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="结束时间" v-model="form.endTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="单位名称">
          <el-input v-model="form.company" placeholder="请输入单位名称"></el-input>
        </el-form-item>
        <el-form-item label="单位涉及">
          <el-input v-model="form.companyContent" placeholder="请输入单位涉及"></el-input>
        </el-form-item>
        <el-form-item label="人员配置">
          <el-input v-model="form.companyPersons" placeholder="请输入人员配置"></el-input>
        </el-form-item>
        <el-form-item label="单位性质">
          <el-input v-model="form.companyNature" placeholder="请输入单位性质"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input v-model="form.department" placeholder="请输入所属部门"></el-input>
        </el-form-item>
        <el-form-item label="职位名称">
          <el-input v-model="form.position" placeholder="请输入职位名称"></el-input>
        </el-form-item>
        <el-form-item label="工作描述">
          <el-input type="textarea" v-model="form.desc" placeholder="请输入工作描述"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认{{isAddExperience ? '添加' : '修改'}}</el-button>
          <el-button @click="experienceToggle = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type='text/babel'>
  export default {
    name: 'experience',
    data () {
      return {
        experienceToggle: false,
        isAddExperience: true,
        form: {
          startTime: '',
          endTime: '',
          company: '',
          companyContent: '',
          companyPersons: '',
          companyNature: '',
          department: '',
          position: '',
          desc: ''
        },
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
      openAddModal () {
        this.experienceToggle = true;
      },
      editItem (item) {
        console.log('编辑');
      },
      deleteItem (item) {
        console.log('删除');
      },
      onSubmit () {
        console.log('提交');
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
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .iconfont{
          font-size: 1rem;
          position: absolute;
          right: 1rem;
          color: @purple;
          &:hover{
            color: @red;
          }
        }
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
            .border{
              width: 100%;
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
