<template>
    <div>
        <left-menu></left-menu>
        <div class="rightSide clearfix">
            <router-view></router-view>
        </div>
    </div>
</template>
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

