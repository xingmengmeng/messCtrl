<template>
    <div class="container">
        <left-menu></left-menu>
        <div class="rightSide clearfix">
            <router-view></router-view>
        </div>
    </div>
</template>
<style scoped lang="less">
.container{
    padding:0 10px;
    box-sizing: border-box;
    background:#FAFBFE url(../../assets/images/indexBg.png) center no-repeat;
}
</style>

<script type="text/ecmascript-6">
    import setLeftHeight from '../../assets/js/setLeftHeight';
    import leftMenu from '../../components/leftMenu.vue';
    export default {
        data(){
            return{

            }
        },
        components:{
            'left-menu':leftMenu,
        },
        mounted(){
            setLeftHeight.setLeftHeight.init();
        }
    }
</script>

