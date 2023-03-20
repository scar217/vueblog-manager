<template>
  <div>
    <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
      <el-table-column
          label="发表时间"
          prop="created">
      </el-table-column>
      <el-table-column
          label="博客标题"
          prop="title">
      </el-table-column>
      <el-table-column
          label="作者ID"
          prop="userId">
      </el-table-column>
      <el-table-column
          label="博客摘要"
          prop="description">
      </el-table-column>
      <el-table-column label="操 作"
          >
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)" :disabled="false">编 辑</el-button> |
          <el-popconfirm
              confirm-button-text='好的'
              cancel-button-text='不用了'
              icon="el-icon-info"
              icon-color="red"
              title="确定要删除当前博客吗？"
              @confirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button slot="reference" size="mini" type="danger">删 除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="mpage"
                   background
                   layout="prev, pager, next"
                   :current-page="currentPage"
                   :page-size="pageSize"
                   :total="total"
                   @current-change=page
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "blogs",
  data() {
    return {
      tableData: [],
      search:'',
      currentPage:1,
      total:0,
      pageSize:5
    }
  },
  methods:{
    page(currentPage){
      const _this = this;
      _this.$axios.get("/manage/blogs?currentPage="+currentPage).then(res=>{
        _this.tableData = res.data.data.records
        _this.currentPage = res.data.data.current
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
      })
    },
    handleEdit(index,row){
      console.log(index,row);
      this.$message.error('占时还未有权限编辑他人博客');
    },
    handleDelete(index,blog){
      this.$axios.get("/manage/blogDel?id="+blog.id).then(res=>{
        this.$message({
          type: 'success',
          message: res.data.msg
        });
        this.page(1);
      }).catch(error=>{
        this.$message({
          type: 'error',
          message: error,
        })
      })
    }
  },
  mounted() {
    this.page(1)
  }
}
</script>

<style scoped>
  .mpage{
    text-align: center;
  }
</style>
