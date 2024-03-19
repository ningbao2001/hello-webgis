<template>
    <div id="formContainer">
        <!-- Properties Tab -->
        <div id="propertiesTab">
            <table>
                <tr>
                    <th>高度:</th>
                    <td><input ref="HeightInput" disabled id="Height" v-bind:value="attributes.Height"></td>
                </tr>    
                <tr>
                    <th>方位角起始角度:</th>
                    <td><input ref="AbeginInput"   disabled id="Abegin" v-bind:value="attributes.ABegin"></td>
                </tr>
                <tr>
                    <th>方位角结束角度:</th>
                    <td><input ref="AendInput" disabled id="Aend"  v-bind:value="attributes.AEnd"></td>
                </tr>
                <tr>
                    <th>俯仰角起始角度:</th>
                    <td><input ref="EbeginInput" disabled id="Ebegin" v-bind:value="attributes.EBegin"></td>
                </tr>
                <tr>
                    <th>俯仰角结束角度:</th>
                    <td><input ref="EendInput"  disabled id="Eend" v-bind:value="attributes.EEnd"></td>
                </tr>
                <tr>
                    <th>水平视场角:</th>
                    <td><input ref="aerfaInput"  disabled id="aerfa" v-bind:value="attributes.aerfa"></td>
                </tr>
                <tr>
                    <th>垂直视场角:</th>
                    <td><input ref="beitaInput"  disabled id="beita" v-bind:value="attributes.beita"></td>
                </tr>
            </table>
        </div>

        <!-- Info Tab -->
        <div id="infoTab">
            <table class="infoTable">
            <tr>
                <td>地址:</td>
                <td>{{attributes.Z}}</td>
            </tr>
            <tr>
                <td>Longitude:</td>
                <td>{{attributes.X}}</td>
            </tr>
            <tr>
                <td>Latitude:</td>
                <td>{{attributes.Y}}</td>
            </tr>
           
            </table>
        </div>

        <!-- Buttons -->
        <div class="tabButtons">
            <label class="labelpro" @click="showTab('propertiesTab')">Properties</label>
            <label class="labelinfo" @click="showTab('infoTab')">Info</label>
        </div>
        
    </div> 
</template>

<script>
    export default {
        name:'MonitoInfoPopup',
        props: {
            attributes: {
            type: Object,
            required: true
            }
        },
        data() {
            return {
               
            };
        },
        mounted(){
       
        },
        methods:{
            showTab(tabName) {
                if (tabName === 'propertiesTab') {
                document.getElementById('propertiesTab').style.display = 'block';
                document.getElementById('infoTab').style.display = 'none';
                } else if (tabName === 'infoTab') {
                document.getElementById('propertiesTab').style.display = 'none';
                document.getElementById('infoTab').style.display = 'block';
                }
            },
        }
        
    }
</script>

<style>
   #formContainer {
      margin: auto;
      width: 200px;
      background: #fff;
      border: 1px solid gray;
      border-radius: 3px;
      overflow:hidden;
    }

    .tabButtons {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #ccc;
    }
    #propertiesTab th{
        width: 33.3333%;
        white-space: nowrap;
    }
    #propertiesTab input{
        text-align: left;
        padding: 5px;
        width: 90%;
        border: 1px solid #ccc;
        background: transparent;
    }
    .tabButtons{
        float: left;
        margin-top: 10px;
    }
    .tabButtons label{
        display: block;
        background: #eee;
        border-top-width: 0;
        border: 1px solid #ccc;
        bottom: 0;
        right: 0;
        z-index: 2;
        width: 100px;
        text-align: center;
    }
    
   
    .funButtons{
        float: left;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    #infoTab {
      display: none;
    }

    .infoTable {
      width: 100%;
    }

    .deleteButton {
      color: white;
      background-color: red;
      margin-left: 20px;
    }
</style>