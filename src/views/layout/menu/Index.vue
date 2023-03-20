<template>
  <div>
    <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#112f50"
        text-color="#fff"
        active-text-color="#ffd04b" router :collapse="isCollapse">
      <br/>
      <el-menu-item>
        <span slot="title">博 客 后 台 管 理 系 统</span>
      </el-menu-item>

      <el-menu-item index="/index/home">
        <i class="el-icon-s-data"></i>
        <span slot="title">首 页</span>
      </el-menu-item>

      <el-menu-item index="/index/users">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>

      <el-menu-item index="/index/blogs">
        <i class="el-icon-document"></i>
        <span slot="title">博客管理</span>
      </el-menu-item>

      <el-menu-item index="/index/notices">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">发布公告</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Index",
  props:['isCollapse'],
  data(){
    return{

    }
  }
}
</script>

<style lang="less" scoped>
  .el-menu{
    border-right: 0;
    /deep/ .is-active{
      background: #1e78bf !important;
      color: #fff !important;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
