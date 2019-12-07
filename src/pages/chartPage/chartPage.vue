<template>
  <div name='chartPage' class='fillcontain'>
    <section class='chartPick'></section>
    <section class='chartView'>
      <el-form>
        <el-form-item label='Data Source' label-width='120px'>
          <el-upload
            class='upload-demo'
            ref='upload'
            action=''
            :on-remove = 'handleRemove'
            :on-change = 'changeFile'
            :before-upload = 'beforeUpload'
            :file-list='fileList'
            :auto-upload='false'>
            <el-button slot='trigger' size='small' type='' :disabled='!!fileList.length'><i class="iconfont iconUpLoad"></i> click to upload data source</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </section>
    <section class='chartChange'></section>
  </div>
</template>

<script type='text/babel'>
  import XLSX from 'xlsx';
  export default {
    name: 'chartPage',
    data () {
      return {
        fileList: [],
        dataList: []
      };
    },
    created () {
    },
    mounted () {},
    computed: {},
    watch: {},
    methods: {
      beforeUpload () {
        return false;
      },
      handleRemove () {
        this.fileList.splice(0, 1);
      },
      changeFile (file) {
        const types = file.name.split('.')[1];
        const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(
          item => item === types
        );
        if (!fileType) {
          return this.$message.error('格式错误！请重新选择');
        }
        this.fileList.push(file);
        this.file2Xce(file).then(tabJson => {
          if (tabJson && tabJson.length > 0) {
            this.dataList = [...tabJson[0].sheet];
          }
        });
      },
      file2Xce (file) {
        return new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = e => {
            const data = e.target.result;
            let wb = XLSX.read(data, {
              type: 'binary'
            });
            const result = [];
            wb.SheetNames.forEach((sheetName) => {
              result.push({
                sheetName: sheetName,
                sheet: XLSX.utils.sheet_to_json(wb.Sheets[sheetName])
              });
            });
            resolve(result);
          };
          reader.readAsBinaryString(file.raw);
        });
      }
    },
    components: {}
  };
</script>
<style lang='less'>
  [name = 'chartPage']{
    display: flex;
    position: relative;
    overflow: auto;
    font-size: .1rem;
    .chartPick{
      flex: 3.9rem 0 0;
      background: #f0f3f5;
    }
    .chartView{
      flex: 1;
      padding: 1rem .5rem;
      .upload-demo{
        display: flex;
        .el-upload-list{
          flex: 1;
        }
      }
    }
    .chartChange{
      flex: 4.4rem 0 0;
      border-left: 1px solid #f7f7f7;
    }
  }
</style>
