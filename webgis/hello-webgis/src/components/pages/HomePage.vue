<template>
    <div class="home-page">
      <FunctionMenu/>
      <div ref="map-container" id="map-container"></div>
      <LayerManage/>
      <ListWithButton/>
    </div>
  </template>
  
  <script>
  import { mapGetters ,mapActions,mapMutations} from 'vuex';
  import  FunctionMenu  from "../common/FunctionMenu.vue";
  import  ListWithButton  from "../common/ListWithButton.vue";
  import  LayerManage  from '../common/LayerManage.vue';
  import Vue from 'vue';;
  import MonitoInfoPopup from '../popups/MonitoInfoPopup.vue'
  export default {
    name: 'HomePage',
    data() {
      return {
        popupInstance: null,
        ComponentClass: Vue.extend(MonitoInfoPopup)
      }
    },
    components: {FunctionMenu,ListWithButton,LayerManage},
    computed: {
      ...mapGetters('MapView', ['mapView','handles'])
    },
    methods: {
      ...mapActions('MapView', ['setDefaultMapView','addLayer',]),
      ...mapMutations('MapView', ['clearLayers','clearAllHandle']),
      //加入首页图层
      async addNewLayer() {
        const layerInfo = [{
				  url: "https://localhost:6443/arcgis/rest/services/MyWebApp/index/MapServer/0",     
          id: "jiankongdian",
          outFields: ["*"] // 这将包含所有属性 
          
        },{
				  url: "https://localhost:6443/arcgis/rest/services/MyWebApp/index/MapServer/1",     
          id: "jiankongmian",
          outFields: ["*"] // 这将包含所有属性 当进行 `hitTest` 时，结果中的 `graphic.attributes` 应该会包含所有的属性。
          
          
        },{
				  url: "https://localhost:6443/arcgis/rest/services/MyWebApp/index/MapServer/2",     
          id: "daoluxian",
          outFields: ["*"] // 这将包含所有属性
        },];
        await this.addLayer(layerInfo);
      },
      //设置首页弹窗
      handleOrient(graphic) {
        
      },
      //设置首页点击事件
      setHomeClickEvent(){
        if (this.mapView) {
          this.mapView.on('click', (event) => {
            
            // 使用 hitTest 方法来确定用户点击的是哪个要素
            this.mapView.hitTest(event).then((response) => {
              // response.results 是一个数组，包含了所有被点击的要素
              // 遍历这个数组，找到属于 'dian' 图层的要素
              for (let result of response.results) {
                if (result.graphic.layer.id === 'jiankongdian') {
                  // 检查是否已经有一个Vue实例存在 
                  if (!this.popupInstance) {
                    // 如果不存在，创建一个新的Vue实例
                    this.popupInstance = new this.ComponentClass();
                  }
                  // 更新Vue实例的属性
                  this.popupInstance.$props.attributes = result.graphic.attributes;   
                  // 挂载Vue组件到一个新创建的元素上
                  const mountNode = document.createElement('div');
                  this.popupInstance.$mount(mountNode);                         
                  // 打开弹窗
                  this.mapView.popup.open({
                    title: "监控信息",
                    content: this.popupInstance.$el,
                    location:event.mapPoint,
                  });
                  // 移动视图到弹窗的位置
                  /* 这可能是由于地图的边界处理方式导致的。在地理坐标系统中，经度的值范围是-180到+180。当你点击地图右侧的要素时，如果该要素的经度值接近+180，`goTo()` 方法可能会将视图移动到该要素的"左侧"，因为这样的移动距离更短。。 */
                  let targetPoint = event.mapPoint.clone();
                  if (targetPoint.longitude - this.mapView.center.longitude > 180) {
                    targetPoint.longitude -= 360;
                  } else if (this.mapView.center.longitude - targetPoint.longitude > 180) {
                    targetPoint.longitude += 360;
                  }
                  this.mapView.goTo(targetPoint);
                }
              }
            });
          });
        }       
      }
    },
    async mounted() {
      await this.setDefaultMapView();
      this.mapView.container = this.$refs['map-container'];
      this.addNewLayer();
      this.setHomeClickEvent();
    },
    beforeDestroy() {
      this.clearLayers();
      this.clearAllHandle();
      this.mapView.container = null;
    }
    
  };
  </script>
  
  <style>
  .home-page {
    height: 100%;
    width: 100%;
    position: relative;
  }
  #map-container{
    position: relative;
    width: 100%;
    height: 95%;
  }
  </style>
  
  