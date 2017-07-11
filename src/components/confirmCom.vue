<template>
    <div>
        <div class="overlay" @click="hideOneLine"></div>
        <div class="markWrap">
            <ul>
                <li>是否确认退标</li>
                <li class="clearfix">
                    <input type="button" value="取消" @click="hideOneLine" class="btnGray">
                    <input type="button" value="确认" @click="subPushFn" class="btnBlue">
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
        padding: 44px 75px 0 75px;
        top:50%;
        left: 50%;
        margin:-75px 0 0 -190px;
        width: 380px;
        height: 150px;
        box-sizing: border-box;
        color:#333;

        li{
            margin-bottom:25px;
            text-align: center;
        }
    }
</style>
<script type="text/ecmascript-6">

    export default{
        methods:{
            hideOneLine(){
                this.$emit('hidePushFn');
            },
            //点击
            subPushFn(){
                this.$emit('confirmTrue');
            }
        }
    }
</script>
