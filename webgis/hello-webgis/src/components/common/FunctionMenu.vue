<template>
  <div class="sys-funmenu">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-submenu index="1">
            <template slot="title">绘制区域</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>           
        </el-submenu>
        <el-menu-item index="2">清除绘制</el-menu-item>
        <el-menu-item index="3">测距</el-menu-item>
        <el-menu-item index="4">数据统计</el-menu-item>
        <el-menu-item index="5" disabled>结果导出</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>

.sys-funmenu .el-menu--horizontal>.el-menu-item {
    height: 40px;
    line-height: 40px;
}
.sys-funmenu .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 40px;
    line-height: 40px;
}

</style>