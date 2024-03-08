<template>
    <div class="roadModel-page">
        <FunctionMenu/>
       <!--  <div id="map-container"></div> -->
       <MapView/>
    </div>
  </template>
  
  <script>
  import MapView from '../common/MapView.vue';
  import  FunctionMenu  from "../common/FunctionMenu.vue";
  
  import { mapState } from 'vuex';

  export default {
    name: 'RoadModel',
    components: {FunctionMenu,MapView},
    computed: {
     /*  ...mapState({
        mapView: state => state.MapView._defaultMapView // MapView 是你在 Vuex 中定义的模块名
      }) */
    },
    mounted() {
     /*  // 在组件挂载完成后，检查是否有地图视图对象，如果有，则加载地图
      if (this.mapView) {
        this.loadMap();
      } */
    },
    methods: {
     /*  loadMap() {
        // 在这里使用地图视图对象加载地图
        this.mapView.container = "map-container"
      } */
    }
  };
  </script>
  
  <style lang="less" >
  .el-menu.el-menu--horizontal {
    border-bottom: solid 0px #e6e6e6;
    height: 40px;
    line-height: 40px;
  }
  .roadModel-page {
    height: 100%;
    width: 100%;
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title {
      height: 40px;
      line-height: 40px;
      //设置小图标
      i{
        font-size: 10px;
      }
  }

</style>
  
  