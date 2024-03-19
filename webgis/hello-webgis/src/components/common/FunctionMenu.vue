<template>
  <div class="sys-funmenu">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-submenu index="1">
            <template slot="title">绘制区域</template>
            <el-menu-item index="activateDraw('polyline')">绘制线</el-menu-item>
            <el-menu-item index="activateDraw('rectangle')">绘制矩形</el-menu-item>
            <el-menu-item index="activateDraw('polygon')">绘制多边形</el-menu-item>           
        </el-submenu>
        <el-menu-item index="2">清除绘制</el-menu-item>
        <el-menu-item index="3">测距</el-menu-item>
        <el-menu-item index="4">数据统计</el-menu-item>
        <el-menu-item index="5" disabled>结果导出</el-menu-item>
        <div class="locationIcon" @click="locateto"><i class="el-icon-map-location" ></i><span>周宁</span></div>       
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    mounted() {
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(typeof key, keyPath);
      },
      locateto(){
        this.mapView.goTo({
            target:[119.337, 27.105],
            zoom: 16
        },{duration:500})
      }
    },
    computed: {
      ...mapGetters('MapView',['mapView']),  
    },
  }
</script>

<style scoped>
.sys-funmenu{
  width: 100%;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* 水平偏移量 垂直偏移量 模糊半径 阴影颜色 */
}
.sys-funmenu .el-menu--horizontal>.el-menu-item {
    height: 40px;
    line-height: 40px;
}
.sys-funmenu .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 40px;
    line-height: 40px;
}
.el-menu-demo{
  margin-left: 150px;
}
.locationIcon{
  float: left;
  margin-left: 150px;
}
.el-menu--horizontal > .el-menu-item {
  border-bottom: none;
  text-decoration: none;
}


</style>