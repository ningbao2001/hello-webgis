<template>
    <div class="layersManage">
        <el-button round @click="toggleLayerList"><i class="el-icon-set-up"></i>&nbsp;&nbsp;&nbsp;图层</el-button>
        <div class="layerList" v-show="isLayerListVisible">
            <div style="height: 10%; position: relative; padding: 0 20px; line-height: 10%; background: transparent;border-radius: 20px; display: flex; justify-content: space-between; align-items: center;">
                 <span style="font-size: large;">图层</span>
                 <i style="font-size:30px;" class="el-icon-circle-close" @click="toggleLayerList"></i>
            </div>
            <el-table
                :data="tableData1"
                style="width: 100%;" :header-cell-style="{'text-align':'center'}">
                <el-table-column 
                 label="底图" align="center"
                >
                <template slot-scope="scope">                   
                    <span style="margin-left: 10px">{{ scope.row.data }}</span>
                </template>
                </el-table-column>
                
                <el-table-column label=""  align="center">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.switch"  @click="handleLayerEdit(scope.$index, scope.row)">
                    </el-switch>                                    
                </template>
                </el-table-column>
            </el-table>
            <el-table
                :data="tableData2"
                style="width: 100%;" :header-cell-style="{'text-align':'center'}">
                <el-table-column 
                 label="类图" align="center"
                >
                <template slot-scope="scope">                   
                    <span style="margin-left: 10px">{{ scope.row.data }}</span>
                </template>
                </el-table-column>
                
                <el-table-column label=""  align="center">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.switch"  @change="handleClassDiagram(scope.$index, scope.row)">
                    </el-switch>                                    
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { mapMutations} from 'vuex';
export default {
    name:'LayerManage',
    computed: {
    },
    data() {
        return {
            isLayerListVisible: false,
            tableData1: [{
                data: '默认底图',
                switch:true
            },],
            tableData2: [{
                data: '监控范围',
                switch:false
            },],
        };
    },
    methods: {
        ...mapMutations('MapView', ['_modifyDefaultMapView','_setMonitorLayerVisible']),
        toggleLayerList() {
            this.isLayerListVisible = !this.isLayerListVisible;
        },
        handleLayerEdit(index, row) {
            console.log(index, row);
        },
        handleClassDiagram(index, row) {
            this._setMonitorLayerVisible(row.switch)
        },
    },
}
</script>

<style scoped>
.layersManage {
    position: absolute;
    bottom: 30px;
    left: 25px;
    width: 200px;
    height: 400px;
    box-shadow: -2px 0 2px 0 rgba(0, 0, 0, 0.1);
}
.el-button {
    position: absolute; 
    bottom: 0px;
    width: 130px;
    height: 55px;
    opacity: 0.46;
    background: #ffffff;
    border: 1px solid #797979;
    border-radius: 41px;
    font-size: 18px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight:bold;
    color: #333333;
    line-height: 20px;
}
.layerList{
    position: absolute; 
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 20px;
}
.el-table .el-table__cell{
    text-align: center;
}
</style>