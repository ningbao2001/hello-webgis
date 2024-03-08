<template>
  <div id="mapview"></div>
</template>

<script>
//引入loadModules
import { loadModules } from 'esri-loader';
const options = {
  //引入ArcGIS API
  url: 'https://js.arcgis.com/4.18/init.js',
  css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
};

export default {
  name: 'MapView',
  components: {},
   //mounted 生命周期函数，在MapView组件创建完成之后就会执行里面的函数
  mounted: function () {
    this._createMapView();
  },
  methods: {
    //   创建地图视图
    //async await是成对出现的，意思是把那些模块加载完成之后才可以执行后面的代码
    async _createMapView() {
      const [Map, MapView,Basemap,TileLayer,MapImageLayer] = await loadModules(['esri/Map', 'esri/views/MapView','esri/Basemap','esri/layers/TileLayer','esri/layers/MapImageLayer'], options);
      const basemap = new Basemap({
        baseLayers: [new TileLayer({
          url: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer',
        })],           
      });
      const map = new Map({
        basemap: "hybrid",
        slider:false
      });
      const mapImageLayer = new MapImageLayer({
        url: "http://localhost:6080/arcgis/rest/services/MapServeTest/dianTest/MapServer",     
      });
      map.add(mapImageLayer)
      const Mapview = new MapView({
        map: map,
        container: 'mapview',      
        center: [119.337, 27.105],
        zoom: 16 ,
        ui: {
          components: ['zoom', 'compass', 'attribution'] // 移除 basemapToggle
        }   
      });
      Mapview.ui._removeComponents(["attribution"]);///移除底部ESRI logo
      this.$store.commit('MapView/_setDefaultMapView',Mapview);
      console.log(this.$store.state.MapView);
    },

  },
};
</script>

<style>
#mapview {
  position: relative;
  width: 100%;
  height: 95%;
}
</style>

