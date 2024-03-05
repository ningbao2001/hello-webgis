<template>
    <div class="roadModel-page">
      <div class="fun-menu">
        <FunctionMenu/>
      </div>
    </div>
  </template>
  
  <script>
  import  FunctionMenu  from "../common/FunctionMenu.vue";
  export default {
    name: 'RoadModel',
    components: {FunctionMenu},
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
    background-color:aquamarine;
  }
  .fun-menu{
    width: 100%;
    height: 40px;
    background-color: white;
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
  
  