<template>
  <div id="app">
    <el-container class="app-out-pannel">
      <el-header class="sys-header">
        <HeaderLayout></HeaderLayout>
      </el-header>
      <el-container class="app-content-pannel">
        <el-main class="sys-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeaderLayout from './components/header/HeaderLayout.vue';

export default {
  name: 'App',
  components: {HeaderLayout},
};
</script>

<style>
  html,
  body,
  #app {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
  }
  .app-out-pannel,
  .app-content-pannel {
    height: 100%;
  }
  .sys-header {
    background-color: #303133;
    height: 200px;
  }
  
  .sys-content {
    padding: 0px;
  }
</style>

