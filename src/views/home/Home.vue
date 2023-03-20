<template>
  <div>
    <br/>
    <el-row :gutter="20">
      <el-col :span="6">
        <div>
          <el-statistic group-separator="," :value="total" title="博客注册人数"></el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic title="博客量">
            <template slot="formatter">{{blogs}}</template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic group-separator="," :value="register_now" title="今日注册人数">
            <template slot="prefix">
              <i class="el-icon-s-flag" style="color: red"></i>
            </template>
            <template slot="suffix">
              <i class="el-icon-s-flag" style="color: blue"></i>
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic title="博客访问量">
            <template slot="formatter">{{visitorNum}}</template>
          </el-statistic>
        </div>
      </el-col>
    </el-row>
    <div
        class="echart"
        id="mychart"
        :style="{ float: 'left', width: '100%', height: '550px', margin:'30px 0px'}"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Home",
  mounted() {
    this.initEcharts();
    this.Initial();
  },
  data() {
    return {
      total: '',
      register: '',
      register_now: '',
      visitorNum: '',
      blogs:'',
    };
  },
  methods:{
    Initial(){
      const _this = this;
      this.$axios.get('/manage/home/initial').then(res=>{
        const nums = res.data.data;
        _this.total = nums.register;
        _this.blogs = nums.blogsNum;
        _this.register_now = nums.register_now;
        _this.visitorNum = nums.visitorNum;

      }).catch(error=>{
        this.$message.error(error.data);
      })
    },
    initEcharts() {
      this.$axios.get('/manage/home/statistic').then(function (res) {
        const option = {
          title: {
            text: '注册用户性别统计',
            subtext: '用户性别人数 单位:人',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: '用户性别比例',
              type: 'pie',
              radius: '60%',
              data: res.data.data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        const myChart = echarts.init(document.getElementById("mychart"));// 图标初始化
        myChart.setOption(option);// 渲染页面
        //随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      })
    }
  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
</style>
