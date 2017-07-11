<template>
    <div>
        <div class="overlay" @click="hideOneLine"></div>
        <div class="markWrap">
            <ul>
                <li class="clearfix">
                    <label>资产转让日期：</label>
                    <div class="inputDiv">
                        <data-picker v-model='startTime' :min="minTime" :max="maxTime"></data-picker>
                    </div>
                </li>
                <li class="clearfix">
                    <label>序号：</label>
                    <span>{{mesNum}}</span>
                </li>
                <li class="clearfix">
                    <input type="button" value="取消" @click="hideOneLine" class="btnGray">
                    <input type="button" value="提交" @click="subPushFn" class="btnBlue">
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped lang="less">
    .markWrap{
        position: fixed;
        z-index: 10003;
        background: #fff;
        padding: 44px 120px 0 120px;
        top:50%;
        left: 50%;
        margin:-115px 0 0 -255px;
        width: 510px;
        height: 230px;
        box-sizing: border-box;
        color: #333;
        .btnBlue{
            color:#fff;
        }

        li{
            margin-bottom:25px;
        }

        label{
            float: left;
            width:106px;
            height: 30px;
            line-height: 30px;
            text-align:right;
        }
        span{
            float: left;
            height: 30px;
            line-height: 30px;
            text-align:left;
        }
        .inputDiv{
            position: relative;
            float: left;
            width: 99px;
            height: 28px;
            line-height: 28px;
            font-size: 12px;
            border: 1px solid #ECECEC;
            border-radius: 1.4px;
            input{
                color:#999;
            }
        }

    }
    input{
        color: #999;
    }
</style>
<script type="text/ecmascript-6">
    import datePicker from '../components/Datepicker.vue';
    export default {
        data(){
            return{
                mesNum:0,//序号
                startTime:'',
                queryCondition:{},
                minTime:'',
                maxTime:'',
            }
        },
        components:{
            'data-picker':datePicker,
        },
        mounted(){
            this.$on('getMarkMes', (str,obj,time,minTime,maxTime) =>{
                this.mesNum=str;
                this.queryCondition=obj;
                this.startTime=time;
                this.minTime=minTime;
                this.maxTime=maxTime;
            })
        },
        methods:{
            hideOneLine(){
                this.$emit('hidePushFn');
            },
            //提交按钮
            subPushFn(){
                var queryObj=JSON.stringify(this.queryCondition);
                this.$emit('hidePushFn');
                this.$http.post('biPc/debtChange/addAssetPack.gm',{'serialnum':this.mesNum,'queryCondition':queryObj,'pushtipsdateStr':this.startTime},{emulateJSON:true}).then(function (res) {
                    if(res.data.code==200){
                        //alert(res.data.data.dataInfo);
                        //this.$emit('showPushMsg',res.data.data.dataInfo);
                        this.$emit('changePushList','newSelect',res.data.data.dataInfo);
                    }
                })
            }
        }
    }
</script>
