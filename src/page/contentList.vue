<template>
  <div class="fillcontain">
    <div class="table_container">
      <el-table  :data="tableData" border highlight-current-row style="width: 100%;margin-top: 10px;"   :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column fixed sortable property="title" label="文章標題"></el-table-column>
        <el-table-column fixed sortable property="category" label="文章分類"></el-table-column>
        <el-table-column label="編輯或刪除">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="removeUser(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: right;margin-top: 10px;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        tableData: [],
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form: {
          title: '',
          category:''
        },
        rules:{
          date:{required: true,message:' ',trigger: 'blur' }
        },
      }
    },
    created(){
      this.findUser();
    },
    methods:{
      findUser(){
        this.api.findUser({},(d)=>{
          this.tableData=d;
        })
      },
      addUser(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.api.saveUser(this.form)
            this.findUser();
            this.dialogFormVisible = false;
          } else {
            return false;
          }
        });
      },
      removeUser(index,row){
        this.api.removeUser({id:row._id})
        this.findUser();
      }
    }
  }
</script>

<style>
  .table_container{
    padding: 10px 20px;
  }
  .el-table td{
    padding: 9px 0px;
  }
</style>
