<template>
  <div name='collect'>
    <section class="btn_group">
      <div class="btn" @click="addCollectionToggle = true">
        <img class="icon" src="@IMG/collect_icon.png" alt="">
        添加收藏
      </div>
    </section>
    <el-dialog
      title="添加收藏"
      :visible.sync="addCollectionToggle"
      width="70%"
      center>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="收藏名称">
          <el-input v-model="form.name" placeholder="请输入收藏名称"></el-input>
        </el-form-item>
        <el-form-item label="收藏分类">
          <el-select v-model="form.classify" placeholder="请选择收藏分类" ref="classifySelect">
            <el-option :label="item.value" :value="item.value" v-for="(item, index) in form.classifyList" :key="index">
              <span style="float: left">{{ item.value }}</span>
              <span
                @click.stop="deleteClassify(item, index)"
                style="float: right; color: #8492a6; font-size: .6rem; width: 1rem; text-align: center">
                <i class="el-icon-circle-close"></i>
              </span>
            </el-option>
          </el-select>
          <el-button type="primary" @click="addClassifyToggle = true">添加新分类</el-button>
        </el-form-item>
        <el-form-item label="分类名称" v-show="addClassifyToggle">
          <el-input style="width: 60%" v-model="newClassify" placeholder="请输入新的分类名称"></el-input>
          <el-button type="primary" @click="sureAddClassify">确认</el-button>
        </el-form-item>
        <el-form-item label="收藏时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.time" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="收藏说明">
          <el-input type="textarea" v-model="form.desc" placeholder="请输入收藏说明"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认添加</el-button>
          <el-button @click="addCollectionToggle = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type='text/babel'>
  import format from '@/tools/format';
  import { getClassifyList, addClassify, deleteClassify } from '@/api/collect';
  export default {
    name: 'collect',
    data () {
      return {
        addCollectionToggle: false,
        addClassifyToggle: false,
        newClassify: '',
        form: {
          name: '',
          classify: '',
          classifyList: [],
          time: '',
          desc: ''
        },
        form2: {
          name: ''
        }
      };
    },
    created () {
      this.pageInit();
    },
    methods: {
      pageInit () {
        const time = format(new Date(), 'YYYY-MM-DD');
        this.form.time = time;
        this.getClassifyList();
      },
      getClassifyList () {
        getClassifyList().then(res => {
          let data = res.data;
          if (data.code == 0) {
            let reData = data.data;
            this.form.classifyList = [...reData];
          } else {
            this.$message.error('获取分类列表失败');
          }
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      deleteClassify (item, index) {
        this.$confirm('是否确认删除当前分类', '确认信息').then(() => {
          this.form.classifyList.splice(index, 1);
          deleteClassify({id: item._id}).then(res => {
            let data = res.data;
            if (data.code == 0) {
              this.$message.success(data.msg);
            } else {
              this.$message.error(data.msg);
            }
          }).catch((err) => {
            this.$message.error(err);
          });
          this.$refs.classifySelect.toggleMenu(); // 打开下拉框
        }).catch(() => {
          this.$refs.classifySelect.toggleMenu();
        });
      },
      sureAddClassify () {
        addClassify({value: this.newClassify}).then(res => {
          let data = res.data;
          if (data.code == 0) {
            this.getClassifyList();
            this.form.classify = this.newClassify;
            this.newClassify = '';
            this.addClassifyToggle = false;
            this.$message.success(data.msg);
          } else {
            this.$message.error(data.msg);
          }
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      onSubmit () {
        console.log('submit!');
        this.addCollectionToggle = false;
      }
    }
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'collect']{
    position: relative;
    .wh(100%, 100%);
    overflow: auto;
    .btn_group{
      position: absolute;
      right: 0;
      top: 0;
      width: 10rem;
      height: 1.2rem;
      font-size: .6rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn{
        flex: 4.2rem 0 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999;
        font-size: .6rem;
        border-radius: .4rem;
        background: rgba(0, 0, 0, 0.2);
        &:hover{
          text-decoration: underline;
          color: #fff!important;
          .icon{
            transform: scale(1.2, 1.2);
          }
        }
        .icon{
          .wh(.7rem, .7rem);
          margin-right: .2rem;
        }
      }
    }
  }
</style>
