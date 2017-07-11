<template>
    <div class="rightSide clearfix">
        <router-view></router-view>
    </div>
</template>
<script type="text/ecmascript-6">
    import setLeftHeight from '../../assets/js/setLeftHeight';
    export default {
        data(){
            return{

            }
        },
        components:{

        },
        mounted(){
            setLeftHeight.setLeftHeight.init();
        }
    }
</script>

