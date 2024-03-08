export default {
	namespaced:true,
    state:{
        _defaultMapView: null,       //默认地图view 
	},
	actions:{
		
	},
	mutations:{
		_setDefaultMapView(state, value) { //修改地图view
            state._defaultMapView = value
        }
	},
	
	getters:{
		
	},
}