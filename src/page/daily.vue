<template>
  <div class="edit">
    <el-container style="height: 45rem;">
      <el-aside width="200px" >
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/daily/save"
          list-type="picture"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          name="titleImg"
          :on-error="errorHandle"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div style="width: 90%;text-align: center">封面圖片</div>
      </el-aside>
      <el-container>
        <el-form ref="form" style="width: 100%">
          <el-input class="editTitle" v-model="title" placeholder="輸入標題"></el-input>
          <quill-editor v-model="body"
                        ref="myQuillEditor"
                        :options="editorOption">
          </quill-editor>
          <el-form-item  style="text-align: right;width: 100%;margin-top: 45px;margin-bottom: 0px;">
            <el-button size="medium" type="primary"  @click="addNews('form')">發  布</el-button>
          </el-form-item>
        </el-form>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
  export default {
    data () {
      return {
        body: '<h2>I am Example</h2>',
        imageUrl:'',
        filename:'',
        editorOption: {
        },
        title:''
      }
    },
    methods: {
      addNews(form){
        this.api.saveDaily({body:this.body,fliename:this.filename,title:this.title})
        this.$message({
          type: 'success',
          message: '保存成功'
        });
        setTimeout(function () {
          window.location.reload()
        },200)
      },
      handleAvatarSuccess(res, file) {
        this.filename=file.name;
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      errorHandle(err, file, fileList){
        console.log(file.raw)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上傳文件圖片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上傳文件大小不能超過 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor
      }
    },
    components:{
      quillEditor
    },
    mounted() {
      console.log('this is my editor', this.editor)
    }
  }
</script>
<style>
  .quill-editor{
    width: 100%;
    height: 45rem;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .editTitle{
    border-bottom: none;
    border-color: #ccc;
  }
</style>
