<template>
    <div>
        <div class="overlay" @click="hideOneLine"></div>
        <div class="markWrap">
            <ul>
                <li>查询SQL</li>
                <li class="errorLi clearfix">
                    <label>SQL名称：</label>
                    <input type="text" class="txt" v-model="sqlName"> 
                </li>
                <li class="errorLi clearfix"><span class="errorSpan">{{error}}</span></li>
                <li class="clearfix">
                    <input type="button" value="取消" @click="hideOneLine" class="btnGray">
                    <input type="button" value="保存" @click="subPushFn" class="btnBlue">
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
        padding: 24px 40px 0 40px;
        top:50%;
        left: 50%;
        margin:-85px 0 0 -200px;
        width: 400px;
        height: 170px;
        box-sizing: border-box;
        color: #333;
        .txt{
            padding:5px 2px;
            width: 242px;
        }
        .btnBlue{
            color:#fff;
        }

        li{
            margin-bottom:15px;
            &.errorLi{
                margin-bottom: 0;
            }
        }

        label{
            float: left;
            width:70px;
            height: 30px;
            line-height: 30px;
            text-align:right;
        }
        span{
            float: left;
            height: 30px;
            line-height: 30px;
            text-align:left;
            &.errorSpan{
                font-size: 12px;
                color:#b40606;
            }
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
    export default {
        data(){
            return{
                sqlName:'',
                error:'',
            }
        },
        components:{
            
        },
        mounted(){
            this.$on('emputyName',()=>{
                this.sqlName=this.error='';
            })
            this.$on('addError',(error)=> {
                if(error){
                    this.error=error;
                }
            })
            this.sqlName='';
        },
        methods:{
            hideOneLine(){
                this.$emit('hidePushFn');
            },
            //提交按钮
            subPushFn(){
                if(this.sqlName==''){
                    this.error='名称不能为空';
                    return;
                }
                this.$emit('saveSqlName',this.sqlName);
            }
        }
    }
</script>
