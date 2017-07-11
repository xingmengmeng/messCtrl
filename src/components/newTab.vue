<template>
    <div>
        <div class="overlay"></div>
        <div class="tableWrapDiv" @click="hideOneLine($event)">
            
            <div class="tableWrap">
                <div class="close" @click="hideWrap"></div>
                <div class="loadingDiv" v-show="showLoading==1">{{loadOrMsg}}</div>
                <div class="tableDiv" v-show="showLoading==0">
                    <table width="100%">
                        <thead>
                            <tr>
                                <!--<th><input type="checkbox"></th>
                                <th>导出选项</th>
                                <th>资产转让日期</th>
                                <th>序号</th>
                                <th>资产包金额（万元）</th>
                                <th>操作</th>-->
                                <th v-for="item in resData.head" :key="item">{{item}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in resData.data" :key="item">
                                <!--<td>
                                    <input type="checkbox" name="outCheck">
                                </td>
                                <td> 2015-09-19   10 : 09 : 34</td>
                                <td>登录人数</td>
                                <td>aa</td>
                                <td>select name,sum(score) from score where class = '一班' group by name .....</td>
                                <td>
                                    <a>执行</a>
                                    <a>删除</a>
                                </td>-->
                                <td v-for="curTd in item" :key="curTd">{{curTd}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="right pages" @click="pageFn($event)">
                    <span :class="page=='1'?'noPrevPage':'prevPage'">上一页</span>
                    <span>第{{page}}页</span>
                    <span :class="nextFlag=='1'?'nextPage':'noNextPage'">下一页</span>
                </div>
            </div>
        </div>
        
    </div>
</template>
<style scoped lang="less">
.tableWrapDiv{
    position: fixed;
    top:0;
    left:0;
    z-index: 10003;
    padding:50px;
    width: 100%;
    height: 100%;
    border-top: 0;
    border-radius: 5px;
    box-sizing: border-box;
}
.loadingDiv{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color:#bbb;
}
.tableWrap{
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    .tableDiv{
        width: 100%;
        flex: 1;
        overflow: scroll;
        border: 1px #d0e6ff solid;
        box-sizing: border-box
    }
    border-radius: 5px;
    box-sizing: border-box;
    background: #fff;

  &.scrollWrap{
    overflow-x: scroll;
  }
  th,td{
    padding: 8px 10px;
    &:first-of-type{
      border-left: 0;
    }
    &:last-of-type{
      border-right: 0;
    }
  }
  th{
    border: 1px solid #d0e6ff;
    background: #EFF5FF;
    box-sizing: border-box;
    font-size: 14px;
  }
  td{
    border-left: 1px #d0e6ff solid;
    border-right: 1px #d0e6ff solid;
    text-align: center;
    font-size: 12px;
    color:#333;
    a{
      color: #578DED;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  tr:nth-of-type(2n){
    background: #F7FAFE;
  }
}
.pages{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding:20px 0;
    height: 26px;
    span{
        float: left;
        margin-right: 8px;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        color: #999;
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
        &.noNextPage{
            .prevPage;
            background: #fafafa;
            border: 1px solid #ddd;
            cursor: default;
        }
        &.noPrevPage{
            .prevPage;
            background: #fafafa;
            border: 1px solid #ddd;
            cursor: default;
        }
    }
}
.close{
    position: absolute;
    z-index: 110000;
    top:10px;
    right:10px;
    width: 17px;
    height: 17px;
    background: url(../assets/images/closeIcon.png);
    cursor: pointer;
}
</style>
<script type="text/ecmascript-6">
export default{
    data () {
        return {
            id:'',
            resData:[],
            page:1,
            nextFlag:'1',
            showLoading:0,
            loadOrMsg:'Loading...',
        }
    },
    mounted(){
        this.$on('getTabData',(id)=>{
            this.page=1;
            this.id=id;
            this.getDate();
        })

        document.querySelector('.tableDiv').addEventListener('scroll', function(e) {
            this.querySelector('thead').style.transform = 'translate(0, '+this.scrollTop+'px)';
        });
    },
    methods:{
        getDate(){
            this.showLoading=1;
            document.body.style.overflow='hidden';
            /*document.body.onScroll=function(e){
                e.preventDefault && e.preventDefault();
                e.returnValue=false;
                e.stopPropagation && e.stopPropagation();
                return false;
            }*/
            this.loadOrMsg='Loading...';
            this.$http.get('biPc/selfAnaPlatform/listTableMx.gm?ocMenubm='+this.id+'&page='+this.page+'&rows=100').then(function(res){
                if(res.data.code==220){
                    this.loadOrMsg=res.data.msg;
                    this.showLoading=1;
                }
                
                if(res.data.code=='200'){
                    this.showLoading=0;
                    this.resData=res.data.data.dataInfo;
                    this.nextFlag=this.resData.nextFlag;
                    this.page=this.resData.page;
                }
            },function(res){
                if(res.status=='504'||res.status=='404'){
                    this.loadOrMsg='获取数据失败，状态码：'+res.status;
                    this.showLoading=1;
                }
            });
            /*this.resData={
                head:['标题','标题','标题','标题'],
                data:[
                    [1,2,3,4],
                    [3,4,5,6],
                ]
            }*/
        },
        hideOneLine(e){
            if(e.target.classList.value=='tableWrapDiv'){
                this.$emit('hideNewTabFn');
                document.body.style.overflow='scroll';
            }
        },
        hideWrap(){
            this.$emit('hideNewTabFn');
        },
        /*分页*/
        pageFn(e){
            var targ=event.target.innerHTML;
            if(targ=='上一页'||targ=='下一页'){
                if(targ=='上一页'){
                    if(this.page==1) return;
                    this.page--;
                }else if(targ=='下一页'){
                    if(this.nextFlag=='0'){
                        return;
                    }
                    this.page++;
                }
                this.getDate();
            }
        }
    }
}
</script>
