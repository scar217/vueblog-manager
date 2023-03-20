<template>
  <div class="layout">
    <!--左侧导航-->
    <div class="menu">
      <Menu :isCollapse="isCollapse"></Menu>
    </div>
    <!--右侧内容-->
    <div class="content" :class="{small:isCollapse}">
      <Content @changeShow="changeShow" :isCollapse="isCollapse"></Content>
    </div>
  </div>
</template>

<script>
import Menu from "./menu/Index"
import Content from "./content/Index"
export default {
  name: "Index.vue",
  components:{
    Menu,
    Content
  },
  data(){
    return{
      isCollapse:false
    }
  },
  methods:{
    changeShow(){
      this.isCollapse = !this.isCollapse;
    }
  }
}
</script>

<style lang="less" scoped>
  .layout{
    display: flex;
    .menu{
      //width: 200px;
      background: #112f50;
      position: fixed;
      left: 0;
      top: -20px;
      bottom: 0;
    }
    .content{
      flex: 1;
      padding-left: 192px;
      margin-top: -10px;
    }
    .small{
      padding-left: 56px;

    }
  }
</style>
