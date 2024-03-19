<template>
    <div class="right-container">
        <el-button type="info" icon="el-icon-d-arrow-left" class="button-el" :class="{ 'button-collapsed': isCollapsed }" @click="toggleCollapse"></el-button>
        <div class="specific-content" :class="{ 'collapsed': isCollapsed }">
            <MonitoringListVue/>
        </div>
    </div>
</template>

<script>
import MonitoringListVue from '../lists/MonitoringList.vue';
export default {
    name:'ListWithButton',
    data() {
        return {
            isCollapsed: false
        };
    },
    components: {
        MonitoringListVue
    },
    methods: {
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
        }
    }
}
</script>

<style>
    .right-container {
        position: absolute;
        right: 0px;
        top:50px;
        width: 25%;
        height: 88%;
       
    }
    .button-el {
        position: absolute;
        top: 43%;
        right: 80%;
        width: 18px;
        height: 60px;
        opacity: 0.8;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: right 0.3s; /* 添加过渡效果 */
    }
    .specific-content{
        position: absolute;
        right: 0px;
        height: 100%;
        width: 80%;
        transition: width 0.3s, right 0.3s; /* 添加过渡效果 */
        background-color: aliceblue;
        opacity: 0.8;
    }
    .specific-content.collapsed {
        width: 0; /* 当抽屉收起时，将宽度设置为 0 */
    }
    .button-el.button-collapsed {
        right: 0; /* 当抽屉收起时，将按钮移动到最右边 */
    }
    
    
</style>