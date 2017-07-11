<template>
    <div>
        <!--{{getNum}}
        <cal-test></cal-test>-->
    </div>
</template>
<script type="text/ecmascript-6">
    import calTest from './calTest.vue';
    export default {
        data(){
            return{
                getNum:'333333.333',
            }
        },
        components:{
            'calTest':calTest,
        },
        mounted(){
            this.getNum=Number(this.getNum).toFixed(2);
            this.getNum=parseFloat(this.getNum)
        },
        methods:{

        }
    }
</script>

