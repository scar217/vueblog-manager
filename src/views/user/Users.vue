<template>
  <div>
    <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
      <el-table-column
          label="注册时间"
          prop="created">
      </el-table-column>
      <el-table-column
          label="用户ID"
          prop="id">
      </el-table-column>
      <el-table-column
          label="用户名"
          prop="username">
      </el-table-column>
      <el-table-column
          label="邮箱"
          prop="email">
      </el-table-column>
      <el-table-column
          align="right" label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编 辑</el-button> |
          <el-popconfirm
              confirm-button-text='好的'
              cancel-button-text='不用了'
              icon="el-icon-info"
              icon-color="red"
              title="确定要删除当前用户吗？"
              @confirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button slot="reference" size="mini" type="danger">删 除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align: center;"
                   layout="prev, pager, next"
                   :total="total" :page-size="pageSize"
                   background small
                   @current-change="findPage"
    >
    </el-pagination>
    <el-dialog title="修改用户信息" :visible.sync="isShow">
      <el-form ref="form" :model="form" label-suffix=":" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.username" placeholder="输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="form.email" placeholder="输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="头像地址" prop="avatar">
          <el-input v-model="form.avatar" placeholder="输入头像地址"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="form.password" :disabled="true" placeholder="修改用户登录密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      tableData: [],
      search:'',
      isShow:false,
      form:{
        avatar:'',
        email:'',
        password:'',
        status:'',
        username:''
      },
      currentPage:1, //当前页
      total:0,  //总页数
      pageSize:5, //一页内容数
    }
  },
  methods: {
    findPage(currentPage){
      const _this = this;
      _this.$axios.get("/manage/findAll?currentPage="+currentPage).then(res=>{
        _this.tableData = res.data.data.records
        _this.currentPage = res.data.data.current
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.isShow = true;
      this.form = {"id":row.id,"username":row.username,"password":row.password,"avatar":row.avatar,"email":row.email,"status":row.status};
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$axios.get("/manage/deleteOne?id="+row.id).then(res=>{
        if(res.data.code === 200){
          this.$message({
            message: res.data.msg,
            type:"success"
          });
          //重新刷新列表展示
          this.findPage(1);
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch(error=>{
        this.$message.error(error.data)
      })
    },
    onSubmit(){
      this.$axios.post("/user/save",this.form).then(res=>{
        if(res.data.code === 200){
          this.$message({
            message: res.data.msg,
            type:"success"
          });
          this.form = {};
          this.isShow = false;
          this.findPage(1);
        }else{
          this.$message.error(res.data.msg);
        }
      }).catch(error=>{
        this.$message.error(error.data);
        return false;
      });
    }
  },
  created() {
    this.findPage(1);
  }
}
</script>

<style scoped>

</style>
