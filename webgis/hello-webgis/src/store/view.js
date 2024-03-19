//引入loadModules
import { loadModules } from 'esri-loader';
export default {
	namespaced:true,
    state:{
        _defaultMapView: null,    //默认地图view
		monitorLayer:null, //监控点图层
		handles : [], //事件监听器
	},
	actions:{
		//设置默认地图视图
		async setDefaultMapView(store,value) {
			const options = {
				//引入ArcGIS API
				url: 'https://js.arcgis.com/4.18/init.js',
				css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
			  };
			// 创建地图视图
			const [Map, MapView,Basemap,TileLayer,MapImageLayer] = await loadModules(['esri/Map', 'esri/views/MapView','esri/Basemap','esri/layers/TileLayer','esri/layers/MapImageLayer'], options);
			
			const map = new Map({
				basemap: "hybrid",
				slider:false
			});			
			const mapView = new MapView({
				map: map,
				container: 'mapview',      
				center: [119.337, 27.105],
				zoom: 16 ,
				ui: {
				components: ['zoom', 'compass', 'attribution'] // 移除 basemapToggle
				},
				popup: {
					autoOpenEnabled : false, // 鼠标的三个键都可以触发点击事件，没有任何设置，只有滚轮和右键会触发点击事件。
					dockOptions: {
					  buttonEnabled: false //禁用停靠
					},
					collapseEnabled : false, // 移除title点击折叠功能                
					actions: [] // 清空事件按钮 （缩放至、...）   
				},
			});
			
			mapView.ui._removeComponents(["attribution"]);///移除底部ESRI logo
			store.commit('_modifyDefaultMapView', mapView);
		},
		//首页图层
		async addLayer({ state }, layerInfo) {
			const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer']);
			const featureLayers = layerInfo.map(info => new FeatureLayer(info));
			featureLayers.forEach(layer => {
				if (layer.id === 'jiankongdian') {
					state.monitorLayer = layer;
				}
				if (layer.id === 'jiankongmian') {
					 layer.visible = false;
				}
				state._defaultMapView.map.add(layer);
			});
		},
		//添加某些地图图层
		async addSomeLayers({ state }, layerInfos) {
			const [FeatureLayer, Sublayer] = await loadModules(['esri/layers/FeatureLayer', 'esri/layers/support/Sublayer']);
			const sublayers = layerInfos.map(layerInfo => new Sublayer({ id: layerInfo.layerId }));
			const layer = new FeatureLayer({
				url: layerInfos[0].url,
				sublayers
			});
			state._defaultMapView.map.add(layer);
		},
		
	},
	mutations:{
		// 清除地图图层
		clearLayers({ state }) {
			state._defaultMapView.map.removeAll();
		},
		// 清除地图所有监听事件
		clearAllHandle({ state }) {
			state.handles.forEach(handle => handle.remove());
		},
		//修改地图view
		_modifyDefaultMapView(state, value) { 
            state._defaultMapView = value
        },
		//设置监控面积图层可见性
		_setMonitorLayerVisible(state, value) {
			state._defaultMapView.map.findLayerById("jiankongmian").visible = value;
		}, 
	},
	
	getters:{
		//返回默认地图视图
		mapView: state => state._defaultMapView,
		//返回地图所有监听事件
		handles: state => state.handles,
	},
}