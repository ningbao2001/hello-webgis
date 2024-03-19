<template>
    <div class="roadModel-page">
        <FunctionMenu/>
        <div ref="map-container" id="map-container"></div>
    </div>
  </template>
  
  <script>
  import { mapGetters ,mapActions,} from 'vuex';
  import  FunctionMenu  from "../common/FunctionMenu.vue";
  
  export default {
    name: 'HomePage',
    components: {FunctionMenu},
    computed: {
      ...mapGetters('MapView', ['mapView'])
    },
    methods: {
      ...mapActions('MapView', ['setDefaultMapView','addLayer','clearLayers','addSomeLayers']),
      async AddSomeLayer() {
        const layerInfos = [{
				  url: "http://localhost:6080/arcgis/rest/services/MapServeTest/dianTest/MapServer", 
          layerId: 1         
		  	}];
        await this.addSomeLayers(layerInfos);
      }
    },
    async mounted() {
      await this.setDefaultMapView();
      this.mapView.container = this.$refs['map-container'];
      this.AddSomeLayer();
    },
    beforeDestroy() {
      this.clearLayers();
      this.mapView.container = null;
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
  
  