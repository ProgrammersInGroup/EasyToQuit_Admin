<template>
  <div class="fillcontain">
    <div class="table_container">
      <el-button type="primary" @click="dialogFormVisible = true">&nbsp; 新增 &nbsp;</el-button>
      <el-table  :data="tableData" border highlight-current-row style="width: 100%;margin-top: 10px;"   :default-sort = "{prop: 'status', order: 'descending'}">
        <el-table-column fixed sortable property="name" width="140px" label="病患姓名"></el-table-column>
        <el-table-column fixed sortable property="gender" width="100px" label="性別"></el-table-column>
        <el-table-column fixed sortable property="birth" width="150px" label="出生日期"></el-table-column>
        <el-table-column fixed sortable property="phone" width="150px" label="聯絡電話"></el-table-column>
	      <el-table-column fixed sortable property="status" width="200px" label="距離上次看診已過天數"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">編輯</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="removeUser(scope.$index, scope.row)">刪除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: right;margin-top: 10px;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="100">
        </el-pagination>
      </div>
      <el-dialog  width="35%" title="新增病患資料" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form" >
          <el-form-item label="病患姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
     	  <el-form-item label="性別" :label-width="formLabelWidth">
            
            <el-input v-model="form.gender" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" :label-width="formLabelWidth"  prop="birth">
            <el-date-picker
              v-model="form.birth"
              type="date"
              style="width: 100%;"
              placeholder="選擇日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="聯絡電話" :label-width="formLabelWidth">
            <el-input v-model="form.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="距離上次看診已過天數" :label-width="formLabelWidth">
            <el-input v-model="form.status" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary"  @click="addUser('form')">確 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        tableData: [
          {
            name: '陳柏林',
          gender: '男',
          birth: '1942/10/15',
          phone: '0922221529',
          status: '12 天'
          },
          {
            name: '李小美',
          gender: '女',
          birth: '1933/02/14',
          phone: '0912345678',
          status: '93 天'
          },
          {
            name: '王東',
          gender: '男',
          birth: '1962/12/11',
          phone: '0999023313',
          status: '35 天'
          }
        ],
        dialogFormVisible: false,
        formLabelWidth: '160px',
        form: {
          name: '',
          gender: '',
          birth: '',
          phone: '',
          status: ''
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
