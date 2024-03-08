<template>
    <div class="home-page">
      <FunctionMenu/>
      <MapView/>
    </div>
  </template>
  
  <script>
  import MapView from '../common/MapView.vue';
  import  FunctionMenu  from "../common/FunctionMenu.vue";
  
  export default {
    name: 'HomePage',
    components: {FunctionMenu,MapView},
    
  };
  </script>
  
  <style>
  .home-page {
    height: 100%;
    width: 100%;
  }
  #map-container{
    position: relative;
    width: 100%;
    height: 95%;
  }
  </style>
  
  