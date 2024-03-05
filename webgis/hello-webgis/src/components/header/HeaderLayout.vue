<template>
  <div class="system-header">
    <div class="system-name">警务资源空间优化系统</div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="transparent"
      text-color="#fff"
      :router="true"
      active-text-color="#ffd04b">
      <el-menu-item index="/"><i class="el-icon-house"></i>首页</el-menu-item>
      <el-menu-item index="/roadModel"><i class="el-icon-rank"></i>路段模型</el-menu-item>
      <el-menu-item index="3"><i class="el-icon-guide"></i>路口模型</el-menu-item>
      <el-menu-item index="4"><i class="el-icon-shopping-cart-full"></i>商业聚集区模型</el-menu-item>
      <el-menu-item index="5"><i class="el-icon-office-building"></i>重点单位模型</el-menu-item>
      <el-menu-item index="6"><i class="el-icon-s-grid"></i>知识图谱</el-menu-item>
    </el-menu>
    <div class="sys-out">
      <i class="el-icon-switch-button" style="color: white"></i>
    </div>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          activeIndex: '1',
        };
      },
      methods: {
        handleSelect(key) {
            this.$router.push('${key}').catch(err => {err});         
        }
      },
      watch: {
          $route: {
            immediate: true,
            handler(to) {
              console.log(to.fullPath);
              this.activeIndex = to.fullPath
            }
          }
      }
    }
</script>

<style scoped>
.system-header{
  width: 100%; /* 设置父 div 的宽度 */
  overflow: hidden; /* 清除浮动 */
  font-style:Helvetica;
}
.system-name{
  float: left;
  width: 580px;
  height: 60px;
  font-size: 35px;
  line-height: 60px;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  font-weight: normal;
  text-align: CENTER;
  color: #ffffff;
}
.el-menu-demo{
  float: left;
  width: 900px;
  margin-left: 50px;
}
.el-dropdown-menu__item, .el-menu-item{
  font-size: 16px;
}
.sys-out{
  float: right;
  text-align: center;
  font-size: 30px;
  width: 40px;
  height: 40px;
  line-height: 50px;
  margin-top: 5px;
}

</style>