<template>
  <div name='collect'>
    <section class="content_area">
      <section class="collection" ref="collection">
        <div class="wrapper">
          <div class="collection_classify" v-for="item in collection" :key="item.key">
            <div class="collection_classify_name" :ref="`classify_${item.key}`" @click="scrollTo(item.key)">{{item.title}}</div>
            <div class="collection_list">
              <div class="collection_item" :class="{'collection_openDetail_item': child.detailOpen}" v-for="(child, index) in item.list" :key="index">
                <div class="collection_item_name" @mouseenter="handlerDetailBtn(child, true)" @mouseleave="handlerDetailBtn(child, false)">
                  <span class="name" :class="{'active_name': child.showDetailBtn}" @click="openCollection(child.address)">{{child.name}}</span>
                  <span class="checkDetail" @click="handlerDetailOpen(child)" v-show="child.showDetailBtn || child.detailOpen">{{child.detailOpen ? '收起' : '详情'}}</span>
                  <span v-if="isManager" class="checkDetail" @click="editCollection(child)" v-show="child.detailOpen">编辑</span>
                </div>
                <div class="collection_item_detail" v-show="child.detailOpen">
                  <div class="time">收藏时间：{{child.time}}</div>
                  <div class="desc">收藏说明：{{child.desc}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
    <section class="fun_area">
      <section class="btn_group">
        <div v-if="isManager" class="btn" @click="createCollection">
          <img class="icon" src="@IMG/collect_icon.png" alt="">
          添加收藏
        </div>
        <div class="btn" @click="searchToggle = !searchToggle">
          <img class="icon" src="@IMG/seach_icon.png" alt="">
          {{searchToggle ? '收起索引' : '打开索引'}}
        </div>
      </section>
      <div class="searchWrapper">
        <transition name="form-fade" mode="in-out">
          <div v-show="searchToggle">
            <div class="search_input">
              <div class="input_wrapper">
                <input v-model="keyWord" placeholder="输入筛选" type="text" class="input">
                <div class="closeBtn" @click="keyWord = ''">
                  <i class="el-icon-circle-close" v-show="keyWord !== ''"></i>
                  <i class="el-icon-search" v-show="keyWord === ''"></i>
                </div>
              </div>
            </div>
            <section class="search" v-show="collection.length">
              <div class="search_item"  v-for="item in collection" :key="item.key" @click="scrollTo(item.key)">
                <span class="text">{{item.title}}</span>
              </div>
            </section>
          </div>
        </transition>
      </div>
    </section>
    <el-dialog
      title="添加收藏"
      :visible.sync="collectionToggle"
      width="70%"
      center>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="收藏名称">
          <el-input v-model="form.name" placeholder="请输入收藏名称"></el-input>
        </el-form-item>
        <el-form-item label="收藏地址">
          <el-input v-model="form.address" placeholder="请输入收藏地址"></el-input>
        </el-form-item>
        <el-form-item label="收藏分类">
          <el-select v-model="form.classifyType" placeholder="请选择收藏分类" ref="classifySelect" @change="handlerClassify">
            <el-option :label="item.value" :value="item.key" v-for="(item, index) in classifyList" :key="item.key">
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
          <el-input style="width: 30%" v-model="newClassifyName" placeholder="请输入新的分类名称"></el-input>
          <el-input style="width: 30%" v-model="newClassifyKey" placeholder="请输入新的分类key值"></el-input>
          <el-button type="primary" @click="sureAddClassify">确认</el-button>
          <el-button @click="addClassifyToggle = false">取消</el-button>
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
          <el-button type="primary" @click="onSubmit">确认{{isAddCollection ? '添加' : '修改'}}</el-button>
          <el-button @click="collectionToggle = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type='text/babel'>
  import format from '@/tools/format';
  import timeLimit from '@/tools/timeLimit';
  import { getClassifyList, addClassify, deleteClassify, addCollection, getCollectionList, editCollection } from '@/api/collect';
  import { getServiceTime } from '@/api/common';
  import BScroll from 'better-scroll';
  import _ from '@/plugins/lodash';
  export default {
    name: 'collect',
    data () {
      return {
        keyWord: '',
        searchToggle: true,
        collectionToggle: false,
        addClassifyToggle: false,
        isAddCollection: true,
        newClassifyName: '',
        newClassifyKey: '',
        classifyList: [],
        collection: [],
        scroll: '',
        form: {
          name: '',
          address: '',
          classify: '',
          classifyType: '',
          time: '',
          desc: ''
        },
        changeKeyWord: _.debounce(this.getCollectionList, 500)
      };
    },
    created () {
      this.pageInit();
    },
    watch: {
      keyWord () {
        this.changeKeyWord();
      },
      isAddCollection (val) { // 从编辑改到添加时清空form
        if (val) {
          this.resetFrom();
        }
      }
    },
    computed: {
      isManager () {
        return (this.$store.getters.userLevel === '1');
      }
    },
    methods: {
      resetFrom () {
        this.form.name = '';
        this.form.address = '';
        this.form.classify = '';
        this.form.classifyType = '';
        this.form.time = '';
        this.form.desc = '';
      },
      async pageInit () {
        const time = await this.getServiceTime();
        this.form.time = format(new Date(time), 'YYYY-MM-DD');
        this.getClassifyList();
        this.getCollectionList();
      },
      getServiceTime () {
        return getServiceTime().then(res => {
          let data = res.data;
          if (data.code == 0) {
            let reData = data.data;
            return Promise.resolve(reData);
          } else {
            this.$message.error(data.msg);
          }
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      handlerClassify (key) {
        this.classifyList.forEach(item => {
          item.key == key && (this.form.classify = item.value);
        });
      },
      groupCollection (data) { // 分类组装数据
        let dataCatch = {};
        let result = [];
        data.forEach(item => {
          if (dataCatch[item.classifyType]) {
            dataCatch[item.classifyType].list.push(item);
          } else {
            dataCatch[item.classifyType] = {
              title: item.classify,
              key: item.classifyType,
              list: [item]
            };
          }
        });
        const keys = Object.keys(dataCatch);
        for (let i in keys) {
          result.push(dataCatch[keys[i]]);
        }
        this.collection = [...result];
        this.$nextTick(() => {
          this.initScroll();
        });
      },
      scrollTo (key) {
        let ref = 'classify_' + key;
        this.scroll.stop();
        this.scroll && this.scroll.scrollToElement(this.$refs[ref][0], 400);
      },
      initScroll () {
        if (this.scroll) {
          this.scroll.refresh();
        } else {
          this.scroll = new BScroll(this.$refs.collection, {
            probeType: 3,
            click: true,
            mouseWheel: true
          });
          this.scroll.scrollTo(0, 200);
        }
      },
      getCollectionList () {
        getCollectionList({params: {keyWord: this.keyWord}}).then(res => {
          let data = res.data;
          if (data.code == 0) {
            let reData = data.data;
            this.groupCollection(reData);
          } else {
            this.$message.error(data.msg);
          }
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      getClassifyList () {
        getClassifyList().then(res => {
          let data = res.data;
          if (data.code == 0) {
            let reData = data.data;
            this.classifyList = [...reData];
          } else {
            this.$message.error('获取分类列表失败');
          }
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      deleteClassify (item, index) {
        this.$confirm('是否确认删除当前分类', '确认信息').then(() => {
          if (item.key === this.form.classifyType) {
            this.form.classifyType = '';
            this.form.classify = '';
          }
          this.classifyList.splice(index, 1);
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
        if (this.newClassifyName === '' || this.newClassifyName === '') {
          return timeLimit(() => {
            this.$message.error('类型及其key不能为空');
          }, 2000);
        } else {
          addClassify({value: this.newClassifyName, key: this.newClassifyKey}).then(res => {
            let data = res.data;
            if (data.code == 0) {
              this.getClassifyList();
              this.form.classify = this.newClassifyName;
              this.form.classifyType = this.newClassifyKey;
              this.newClassifyName = '';
              this.newClassifyKey = '';
              this.addClassifyToggle = false;
              this.$message.success(data.msg);
            } else {
              this.$message.error(data.msg);
            }
          }).catch((err) => {
            this.$message.error(err);
          });
        }
      },
      onSubmit () {
        let changeFun;
        if (this.isAddCollection) {
          changeFun = addCollection;
        } else {
          changeFun = editCollection;
        }
        changeFun(this.form).then(res => {
          let data = res.data;
          if (data.code == 0) {
            this.collectionToggle = false;
            Object.assign(this.form, {
              name: '',
              address: '',
              classify: '',
              classifyType: '',
              desc: ''
            });
            this.$message.success(data.msg);
            this.getCollectionList();
          } else {
            this.$message.error(data.msg);
          }
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      createCollection () {
        this.collectionToggle = true;
        this.isAddCollection = true;
      },
      editCollection (item) {
        this.collectionToggle = true;
        this.isAddCollection = false;
        let keys = Object.keys(this.form);
        for (let i in keys) {
          this.form[keys[i]] = item[keys[i]];
        }
        this.form._id = item._id;
      },
      handlerDetailBtn (child, val) {
        this.$set(child, 'showDetailBtn', val);
      },
      handlerDetailOpen (child) {
        this.$set(child, 'detailOpen', !child.detailOpen);
      },
      openCollection (address) {
        if (address.indexOf('https://') || address.indexOf('http://')) {
          window.open(address);
        }
      }
    }
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'collect']{
    position: relative;
    .wh(100%, 100%);
    overflow: hidden;
    display: flex;
    .content_area{
      flex: 1;
      height: 100%;
      .collection{
        .wh(100%, 100%);
        overflow: hidden;
        .collection_classify{
          font-size: .9rem;
          color: #111;
          padding: .2rem .4rem;
          margin-bottom: .4rem;
          .collection_classify_name{
            display: inline-block;
            cursor: pointer;
          }
          .collection_list{
            padding: .2rem 1.6rem .2rem .6rem;
            .collection_openDetail_item{
              background: rgba(0, 0, 0, 0.2);
              border-radius: .2rem;
              color: #fff!important;
              padding: .4rem!important;
            }
            .collection_item{
              font-size: .6rem;
              color: #444;
              margin-bottom: .1rem;
              .collection_item_name{
                .name{
                  cursor: pointer;
                  margin-right: .5rem;
                  &:hover{
                    color: @blue;
                    text-decoration: underline;
                  }
                }
                .active_name{
                  color: #fff;
                }
                .checkDetail{
                  cursor: pointer;
                  font-size: .5rem;
                  background: rgba(255, 255, 255, 0.2);
                  padding: .1rem .2rem;
                  border-radius: .2rem;
                  &:hover{
                    color: @blue;
                    text-decoration: underline;
                  }
                }
              }
              .collection_item_detail{
                margin-top: .3rem;
                border-top: 1px solid #fff;
                .time, .desc{
                  margin-top: .2rem;
                }
              }
            }
          }
        }
      }
    }
    .fun_area{
      flex: 4.2rem 0 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding-top: .5rem;
      .btn_group{
        width: 100%;
        font-size: .6rem;
        .btn{
          margin-top: .3rem;
          height: 1.2rem;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #999;
          font-size: .6rem;
          border-radius: .4rem;
          background: rgba(0, 0, 0, 0.2);
          cursor: pointer;
          &:first-child{
            margin-top: 0;
          }
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
      .searchWrapper{
        width: 3.8rem;
        overflow: hidden;
        .search_input{
          margin-top: .3rem;
          width: 100%;
          height: 1.2rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 0.2rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .input_wrapper{
            flex: 1;
            height: 100%;
            padding: .1rem .9rem .1rem .2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            position: relative;
            .closeBtn{
              position: absolute;
              right: .2rem;
              width: .5rem;
              height: .5rem;
              color: #fff;
              font-size: .5rem;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .input{
              width: 100%;
              height: 1rem;
              line-height: 1rem;
              font-size: .6rem;
              background: transparent;
              color: #fff;
              &::placeholder{
                color: #fff;
              }
            }
          }
        }
        .search{
          .wh(100%, 100%);
          margin-top: .3rem;
          max-height: 11rem;
          padding: 0.1rem .2rem;
          box-sizing: border-box;
          background: rgba(0, 0, 0, 0.2);
          color: #fff;
          border-radius: 0.2rem;
          font-size: .5rem;
          overflow: auto;
          .search_item{
            position: relative;
            padding: .1rem 0;
            width: 100%;
            height: 1rem;
            transition: all 300ms;
            cursor: pointer;
            &:after{
              content: '';
              position: absolute;
              width: 100%;
              left: 0;
              height: 0;
              top: 100%;
              border-right: 2px solid transparent;
              transition: all 300ms;
            }
            &:active {
              background-color: @blue;
              .text{
                background-color: transparent;
              }
            }
            &:hover{
              &:after{
                top: 0;
                right: 0;
                height: 100%;
                border-right-color: @blue;
                transition-delay: 100ms;
              }
              & + .search_item:after{
                top: 0;
              }
            }
            .text{
              display: inline-block;
              width: 100%;
              line-height: 1rem;
              text-align: center;
              background: rgba(0, 0, 0, 0.2);
              border-radius: 0.2rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              cursor: pointer;
            }
          }
        }
      }
    }
    .form-fade-enter-active, .form-fade-leave-active {
      transition: all .5s;
    }
    .form-fade-enter, .form-fade-leave-active {
      transform: translate3d(0, -90%, 0);
    }
  }
</style>
