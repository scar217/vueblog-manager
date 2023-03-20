<template>
  <div>
    <!--顶部-->
    <div class="header">
      <div class="open">
        <span v-if="!isCollapse" class="iconfont el-icon-s-fold" @click="changeMenu"></span>
        <span v-if="isCollapse" class="iconfont el-icon-s-unfold" @click="changeMenu"></span>
        <el-link @click="logout" type="danger" class="logout" icon="el-icon-switch-button">退出登录</el-link>
      </div>
    </div>
    <!--内容-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Index",
  props:['isCollapse'],
  methods:{
    changeMenu(){
      this.$emit('changeShow')
    },
    logout(){
      const _this = this
      _this.$axios.get("/logout",{
        headers:{
          "Authorization":localStorage.getItem("token")
        }
      }).then(res=>{
        _this.$store.commit("REMOVE_INFO")

        _this.$router.push("/login")
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .header{
    height: 50px;
    background: #1e78bf;
    color: #fff;
    line-height: 50px;
    .open{
      .iconfont{
        font-size: 22px;
      }
      .logout{
        margin-left: 1220px;
      }
    }
  }
</style>
