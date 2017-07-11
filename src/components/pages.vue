<template>
    <div class="right pages" @click="pageFn($event)">
        <span class="firstPage">第一页</span>
        <span class="prevPage">上一页</span>
        <span>第</span><input type="text" class="goTo" v-model="curPage" @keyup.enter="pageFn2($event)" @blur="getPage"><span>页</span>
        <span>共{{conCount}}条记录</span>
        <span>共{{pageCount}}页</span>
        <span class="nextPage">下一页</span>
        <span class="lastPage">末页</span>
    </div>
</template>
<style scoped lang="less">
    .pages{
        padding:20px 0;
        height: 26px;
        input{
            float: left;
            margin-right: 8px;
            width: 40px;
            height: 24px;
            line-height: 24px;
            border: 1px #6387d9 solid;
            text-align: center;
            font-size: 12px;
            color: #999;
            background: #fff;
            border: 1px solid #6387D9;
        }
        span{
            float: left;
            margin-right: 8px;
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            color: #999;
            &.firstPage{
                width: 26px;
                background: url(../assets/images/firstPage.png);
                font-size: 0;
                cursor: pointer;
            }
            &.lastPage{
                .firstPage;
                background: url(../assets/images/lastPage.png);
            }
            &.prevPage{
                padding: 0 10px;
                height: 24px;
                line-height: 24px;
                background: #f3f7fe;
                border: 1px solid #749dde;
                cursor: pointer;
            }
            &.nextPage{
                .prevPage;
            }
        }
    }
</style>
<script type="text/ecmascript-6">

    export default{
        props:{
            conCount: {            // 数据总条数
                type: Number,
                default: 0
            },
            pageCount:{    //共多少页
                type:Number,
                default:0,
            },
            current: {            // 当前页码
                default: 1
            },
        },
        data(){
            return{
                curPage:1,
            }
        },
        created(){
            this.curPage=this.current;//当前页码
            this.$on('urlChange', ()=> {  //父组件查询条件改变或者重新查询
                this.curPage=1;
            });
        },
        methods:{
            //文本框跳转
            pageFn(event){
                var targ=event.target.innerHTML;
                if(targ=='上一页'||targ=='下一页'||targ=='第一页'||targ=='末页'){
                    if(targ=='上一页'){
                        if(this.curPage==1) return;
                        this.curPage--;
                    }else if(targ=='下一页'){
                        if(this.curPage>=this.pageCount) return;
                        this.curPage++;
                    }else if(targ=='第一页'){
                        if(this.curPage<=1) return;
                        this.curPage=1;
                    }else if(targ=='末页'){
                        if(this.curPage>=this.pageCount) return;
                        this.curPage=this.pageCount;
                    }
                    console.log(this.curPage)
                    this.$emit('changePage',this.curPage);
                }
            },
            //回车跳转
            pageFn2(event){
                if(isNaN(Number(this.curPage))){
                    this.curPage=this.current;
                    return;
                }
                if(this.curPage>this.pageCount||this.curPage<=0){
                    this.curPage=this.current;
                    return;
                }
                this.$emit('changePage',this.curPage);
            },
            //失去焦点  如果为非数字  则返回原页码
            getPage(){
                if(typeof this.curPage !='number'){
                    this.curPage=this.current;
                }
            }

        }
    }
</script>
