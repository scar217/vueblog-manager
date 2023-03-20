<template>
  <div>
    <br/><br/><br/>
    <div class="m-content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="ruleForm.content"></mavon-editor>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">发布公告</el-button>
          <el-button @click="resetForm('ruleForm')">重 置</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notice",
  data() {
    return {
      ruleForm: {
        id: '',
        created: '',
        title: '',
        content: '',
      },
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    submitForm(formName){
      this.$refs[formName].validate((valid) =>
      {
        if (valid) {
          const _this = this
          _this.$axios.post('/notice/save',this.ruleForm).then(res=>{
              this.$message({
                type: 'success',
                message: '公告发布成功!'
              });
            }).catch(error=>{
            this.$message({
              type: 'warning',
              message: error
            });
          })
        } else {
          this.$message({
            type: 'error',
            message: '操作失败,请检查输入要求!'
          });
          return false;
        }
      });
      this.ruleForm = {};
    },
    resetForm(formName){
      this.$message({
        type: 'warning',
        message: '已重置!'
      });
      this.$refs[formName].resetFields();
    }
  }

}
</script>

<style scoped>
  .m-content{
    text-align: center;
  }
</style>
