<template>
    <div class="table-container">
      <div style=" height: 40px;text-align: center; line-height:40px; font-size: 18px; font-weight: bold;">监控列表</div>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%" ><!-- highlight-current-row="true" -->
        <el-table-column type="expand">
          <template slot-scope="props">
              <el-form   inline class="demo-table-expand"  size="mini"> 
              <el-form-item  label="监控名称">
                  <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="监控 ID">
                  <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="经度">
                  <span>{{ props.row.longitude }}</span>
              </el-form-item>
              <el-form-item label="纬度">
                  <span>{{ props.row.latitude }}</span>
              </el-form-item>            
              <el-form-item label="监控地址">
                  <span>{{ props.row.address }}</span>
              </el-form-item>
              </el-form>
          </template>
        </el-table-column>
        <el-table-column
          :label="'ID (' + tableData.length + ')'"
          prop="id">
        </el-table-column>
        <el-table-column
          label="Name"
          prop="name">
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
            type="primary" plain
              size="mini"
              @click="handleOrient(scope.$index, scope.row)">定位</el-button>
          
          </template>
        </el-table-column>
      </el-table>
    </div>
   
  </template>
  
  <script>
  
  import { loadModules } from 'esri-loader';
  import { mapState, mapGetters } from 'vuex'
  import Vue from 'vue';;
  import MonitoInfoPopup from '../popups/MonitoInfoPopup.vue'
  export default {         
    data() {
        return {
          featureLayer: null,
          tableData: [],
          search: '',
          popupInstance: null,
          ComponentClass: Vue.extend(MonitoInfoPopup)
        }
    },
    computed: {
        ...mapGetters('MapView',['mapView']),
        ...mapState('MapView', ['monitorLayer']),
    },
   
    methods: {
        //定位要素
        handleOrient(index, row) {
          this.mapView.goTo({
            target:[119.337, 27.105],
            zoom: 16
          },{duration:500}).then(() => {
              this.mapView.goTo({target: [row.longitude, row.latitude],zoom:20},{duration:2000}).then( async () => {
                // 查询FeatureLayer的要素
                const query = this.featureLayer.createQuery();
                query.where = `FID = ${row.id}`;
                const results = await this.featureLayer.queryFeatures(query);
                // 检查是否已经有一个Vue实例存在
                if (!this.popupInstance) {
                  // 如果不存在，创建一个新的Vue实例
                  this.popupInstance = new this.ComponentClass();
                }
                // 更新Vue实例的属性
                this.popupInstance.$props.attributes = results.features[0].attributes;
                // 挂载Vue组件到一个新创建的元素上
                const mountNode = document.createElement('div');
                this.popupInstance.$mount(mountNode);
                // 将这个元素设置为popup的内容
                this.mapView.popup.open({
                  title: "监控信息",
                  content: this.popupInstance.$el,
                  location: {latitude:row.latitude, longitude: row.longitude},
                });
              })  
          });         
        }, 
        //获取点图层要素
        async getFeatureAttributes(sublayer){
          if (sublayer) {
            const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer'])
            const query = sublayer.createQuery();
            //差选全部的监控要素
            query.where = "1= 1";
            sublayer.queryFeatures(query).then((results)=>{
              // 将查询到的要素添加到表格数据中
              results.features.forEach(feature => {
                this.tableData.push({
                  id: feature.attributes.FID,
                  name: feature.attributes.Name,
                  address: feature.attributes.Z,
                  latitude: feature.attributes.Y,
                  longitude: feature.attributes.X
                });
              });             
            });
          }
        }        
    },
    watch: {
      'monitorLayer': {
        async handler(monitorLayer) {
          /* 注意，`Sublayer`可能需要一些时间来加载，因为它需要从服务器获取数据。当你创建一个MapImageLayer时，它会立即开始从服务器获取数据，但这个过程是异步的，也就是说它不会立即完成。
          Sublayer是MapImageLayer的一部分，所以它也需要等待MapImageLayer从服务器获取数据。
          所以你可能需要等待`MapImageLayer`加载完成后再获取`Sublayer`。
          你可以使用`watchUtils`来观察`MapImageLayer`的加载状态，当它加载完成后再获取`Sublayer` */
			    const [WatchUtils] = await loadModules(['esri/core/watchUtils'])
            // 使用watchUtils
            WatchUtils.whenTrue(monitorLayer, "loaded", ()=> {
              this.featureLayer = monitorLayer;
              // 查询要素
              this.getFeatureAttributes(monitorLayer);                 
            });
         ;
        },
      },
    },
    
    
  }
  </script>

<style scoped>
  .demo-table-expand {
    margin-left: 10%;
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 10px;
    margin-bottom: 0;
    width: 100%;
  }
  .table-container {
    height: 100%;  /* 你可以根据需要设置高度 */
    overflow: auto;
  }
  .demo-table-expand .el-form-item{
    color: red;
  }
  .demo-table-expand,.el-form-item__label {
    font-weight: bold; /* 设置文字加粗 */
  }

  


  
</style>