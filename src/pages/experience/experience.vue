<template>
  <div name='experience' class="fillcontain">
    <div class="top_title">
      <div class="title">时间线<i @click="openAddModal" v-show="isManager" class="iconfont iconAdd"></i></div>
      <div class="download">
        <span>下载</span>
        <a href="static/files/aboutMe.doc" download="个人简历">word版</a>
        <span>最后更新：2019.10.9</span>
      </div>
    </div>
    <div class="down_content">
      <section class="experience-item" :class="{'activeItem': activeItem === index}" @mouseenter="changeActiveItem(index)" @mouseover="changeActiveItem(index)" @mouseleave="changeActiveItem(-1)" v-for="(item, index) in experienceList" :key="index">
        <div class="time" @click="changeShow(item)">
          <span class="time_time">{{item.startTime | changeTime}}-{{item.endTime | changeTime}}</span>
          <span class="time_icon_line">
            <i v-show="item.showDetail" class="iconfont iconUp"></i>
            <i v-show="!item.showDetail" class="iconfont iconDown"></i>
          </span>
          <span class="funBtn" @click.stop>
            <span class="border" v-show="activeItem === index && isManager">
              <i class="iconfont iconEdit" @click.stop="editItem(item)"></i>
              <i class="iconfont iconDelete" @click.stop="deleteItem(item, index)"></i>
            </span>
          </span>
        </div>
        <div class="border">
          <transition name="form-fade" mode="in-out">
            <div class="detail" v-show="item.showDetail">
              <div class="company">单位：{{item.company}}</div>
              <div class="introduce">{{item.companyContent}} | {{item.companyPersons}} | {{item.companyNature}} | {{item.department}}</div>
              <div class="position">职位：{{item.position}}</div>
              <div class="sub-title">工作描述:</div>
              <div class="sub-content" v-html="item.desc"></div>
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
          <el-col :span="11" v-if="form.endTime !== '至今'">
            <el-date-picker type="date" placeholder="结束时间" v-model="form.endTime" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col :span="11" v-if="form.endTime === '至今'">
            <el-input v-model="form.endTime" clearable></el-input>
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
  import { addExperience, editExperience, getExperienceList, deleteExperience } from '@/api/experience';
  import format from '@/tools/format';
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
        experienceList: []
      };
    },
    created () {
      this.getExperienceList();
    },
    mounted () {},
    computed: {
      isManager () {
        return (this.$store.getters.userLevel === '1');
      }
    },
    watch: {
      'form.endTime' (val) {
        const pickTime = new Date(val);
        const nowTime = new Date();
        if (format(pickTime, 'YYYY-MM-DD') === format(nowTime, 'YYYY-MM-DD') || pickTime.getTime() > nowTime.getTime()) {
          this.form.endTime = '至今';
        }
      }
    },
    filters: {
      changeTime (val) {
        if (val !== '至今') {
          return format(new Date(val), 'YYYY/MM');
        } else {
          return val;
        }
      }
    },
    methods: {
      changeShow (item) {
        this.$set(item, 'showDetail', !item.showDetail);
      },
      changeActiveItem (index) {
        this.activeItem = index;
      },
      openAddModal () {
        this.isAddExperience = true;
        this.experienceToggle = true;
      },
      getExperienceList () {
        getExperienceList().then(res => {
          let data = res.data;
          if (data.code == 0) {
            let reData = data.data;
            this.experienceList = [...reData.map(item => {
              item.showDetail === undefined && (item.showDetail = true);
              return item;
            })] || [];
          } else {
            this.$message.error(data.msg);
          }
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      resetForm () {
        Object.assign(this.form, {
          startTime: '',
          endTime: '',
          company: '',
          companyContent: '',
          companyPersons: '',
          companyNature: '',
          department: '',
          position: '',
          desc: ''
        });
      },
      editItem (item) {
        this.isAddExperience = false;
        this.experienceToggle = true;
        let keys = Object.keys(this.form);
        for (let i in keys) {
          this.form[keys[i]] = item[keys[i]];
        }
        this.form._id = item._id;
      },
      deleteItem (item, index) {
        this.$confirm('是否确认本条经历', '确认信息').then(() => {
          this.experienceList.splice(index, 1);
          deleteExperience({id: item._id}).then(res => {
            let data = res.data;
            if (data.code == 0) {
              this.$message.success(data.msg);
            } else {
              this.$message.error(data.msg);
            }
          }).catch((err) => {
            this.$message.error(err);
          });
        });
      },
      onSubmit () {
        let changeFun;
        if (this.isAddExperience) {
          changeFun = addExperience;
        } else {
          changeFun = editExperience;
        }
        changeFun(this.form).then(res => {
          let data = res.data;
          if (data.code == 0) {
            this.experienceToggle = false;
            this.resetForm();
            this.$message.success(data.msg);
            this.getExperienceList();
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
          cursor: pointer;
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
          padding-left: 1.8rem;
          white-space: pre-line;
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
