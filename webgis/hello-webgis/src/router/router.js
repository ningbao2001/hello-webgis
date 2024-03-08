import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../components/pages/HomePage.vue'
import RoadModel from '../components/pages/RoadModel.vue';


export default new VueRouter({
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/roadModel',
            component: RoadModel
        },
        
    ],
    mode: 'history'
})
