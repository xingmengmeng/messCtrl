<template>
    <div class="leftSide">
        <div class="selectLine">
            <div class="checkedLineDiv" @click="showLineFn">
                <span class="checkedLine">{{businessName}}</span>
            </div>
            
            <ul class="lineUl" v-show="showLineUl">
                <li v-for="(item,index) in resData" :key="index" @click="changeBusinessLine(item)">{{item.name}}</li>
                <!--<li>美借</li>
                <li>美易分</li>-->
            </ul>
        </div>
        <ul class="navMenu">
            <li v-for="(item,index) in businessMenu" :key="index">
                <span class="secSpan" :class="showIndex==item.ocMenubm?'active':''" @click="showIndexFn(item.ocMenubm)">{{item.name}}</span>
                <ul class="nextCom" v-show="showIndex==item.ocMenubm">
                    <li class="routerLi" v-for="(thr,thrIndex) in item.children" :key="thrIndex" :data-menu="item.ocMenubm">
                        <router-link :to="thr.href">{{thr.name}}</router-link>
                    </li>
                </ul>
            </li>
            <!--<li>
                <span class="secSpan" :class="showIndex==1?'active':''" @click="showIndex=1">资产分析</span>
                <ul class="nextCom" v-show="showIndex==1">
                    <li class="routerLi">
                        <router-link to="/businessLine/commonTab/tbTable">推标报表</router-link>
                    </li>
                    <li>
                        <a href="#">异常报表</a>
                    </li>
                    <li>
                        <a href="#">异常报表</a>
                    </li>
                </ul>
            </li>
            <li>
                <span class="secSpan" :class="showIndex==2?'active':''" @click="showIndex=2">贷后分析</span>
                <ul class="nextCom" v-show="showIndex==2">
                    <li class="routerLi">
                        <router-link to="/businessLine/commonTab/urgeMoney">催收日常</router-link>
                    </li>
                </ul>
            </li>-->
        </ul>
    </div>
</template>
<style scoped lang='less'>
.selectLine{
    background: #fff;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    .checkedLineDiv{
        width: 100%;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #EEF1F9;
        box-sizing: border-box;
        cursor: pointer;
        .checkedLine{
            display: inline-block;
            padding:0 25px 0 30px;
            width:64px;
            text-align: left;
            font-size: 15px;
            color: #03BBFF;
            background: url(../assets/images/ls1.png) left center no-repeat,url(../assets/images/downs.png) right center no-repeat;
        }
    }
    
    .lineUl{
        position: absolute;
        z-index: 2;
        width: 180px;
        box-shadow: 0 7px 11px 0 #E1E2E9;
        box-sizing: border-box;
        background: #fff;
        li{
            float:left;
            margin-left:12px;
            padding:0 38px 0 50px;
            width:64px;
            height: 40px;
            line-height: 40px;
            text-align: left;
            border-bottom: 1px solid #EEF1F9;
            background: url(../assets/images/ls2.png) 20px center no-repeat;
            cursor: pointer;
        }
    }
}
</style>
<script type="text/ecmascript-6">
    export default {
        data(){
            return{
                urlName:'',
                resData:[],
                businessMenu:[],
                mainMenu:[],
                businessName:'',
                menuShow:1,
                userName:'',
                showIndex:-1,//默认显示哪个业务线下的哪个页面
                showLineUl:false,//是否显示选择业务线弹框
                //ocMenubm:'MENU170800002',
            }
        },
        mounted(){
            this.urlName= localStorage.getItem('urlName');
            this.$nextTick(function(){
                this.getMenu();
            })
        },
        methods:{
            getMenu(){
                this.getLocal();
                this.$http.get('biPc/login/getZxtMenus2.gm?nId=2').then(function(res){
                    if(res.data.code=='200'){
                        this.resData=res.data.data.dataInfo[0].children;//得到所有的业务线
                        for(let business of this.resData){
                            let curMenubm=business;
                            for(let sectwo of business.children){
                                for(let threeM of sectwo.children){
                                    if(threeM.href==this.$route.path){
                                        this.businessMenu=business.children;
                                        this.businessName=business.name;
                                        break;
                                    }
                                }
                            }
                        }
                        this.$nextTick(function(){
                            this.resetClass();
                        })
                    }
                })
            },
            /*设置哪个一级显示*/
            resetClass(e){
                var aLi=document.querySelectorAll('.routerLi');
                for(let i=0;i<aLi.length;i++){
                    let aA=aLi[i].querySelectorAll('a');
                    for(let j=0;j<aA.length;j++){
                        if(aA[j].className=='active'){
                            var oLi=aA[j].parentNode;
                            this.showIndex=oLi.dataset.menu;
                        }
                    }
                }
            },
            getLocal(){
                this.userName=localStorage.userName;
            },
            /*显示业务线弹框*/
            showLineFn(){
                this.showLineUl=!this.showLineUl;
            },
            showIndexFn(menuBm){
                if(this.showIndex==menuBm){
                    this.showIndex=-1;
                    return;
                }
                this.showIndex=menuBm;
            },
            //切换业务线
            changeBusinessLine(cur){
                this.showLineUl=false;
                //改变显示的业务线
                this.resData.forEach(item=> {
                    if(cur.ocMenubm==item.ocMenubm){
                        this.businessMenu=item.children;//得到要显示的二级下所有
                        this.businessName=item.name;
                        localStorage.ocMenubm=item.ocMenubm;//存储当前显示业务线
                    }
                    this.$nextTick(function(){
                        this.resetClass();
                    })
                }, this);
            }
        }
    }
</script>
