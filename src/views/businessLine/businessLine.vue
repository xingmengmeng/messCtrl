<template>
    <div class="container clearfix">
        <left-menu></left-menu>
        <div class="rightSide clearfix">
            <router-view></router-view>
        </div>
    </div>
</template>
<style scoped lang="less">
.container{
    border:1px #FAFBFE solid;
    padding:0 10px;
    box-sizing: border-box;
    background:#FAFBFE url(../../assets/images/indexBg.png) center no-repeat;
    box-sizing: border-box;
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
            this.setMenuName();
        },
        methods:{
            setMenuName(){
                if(this.$route.query.name){
                    this.urlName= this.$route.query.name;
                    localStorage.setItem('urlName',this.urlName);
                }
            }
        }
    }
</script>

