<template>
<div class="sixContainer">
    <div class="sixWrap">
        <div class="sixDiv">
            <div class="conDiv">
                <h3><span>金控驾驶舱</span></h3>
                <p>
                    从全局角度查看金控业务的规模，用户群体，KPI进度等信息
                </p>
            </div> 
        </div>
        <div class="sixDiv">
            <div class="conDiv">
                <h3><span>BI报表体系</span></h3>
                <p>
                    金控各业务线报表体系
                </p>
            </div> 
        </div>
        <div class="sixDiv">
            <div class="conDiv">
                <h3><span>活动作战室</span></h3>
                <p>
                    金控各业务线上线下活动实时数据监测展现
                </p>
            </div> 
        </div>
        <div class="sixDiv">
            <div class="conDiv">
                <h3><span>自助分析平台</span></h3>
                <p>
                    提供全业务线实时，历史数据查询。定位任务跑批，源数据管理等综合数据查询分析平台
                </p>
            </div> 
        </div>
        <div class="sixDiv">
            <div class="conDiv">
                <h3><span>标签工厂</span></h3>
                <p>
                    金控各业务线报表体系
                </p>
            </div> 
        </div>
        <div class="sixDiv">
            <div class="developing">正在开发中...</div>
            <div class="noAuth">
                <p>还没有权限哦！</p>
            </div>
            <div class="conDiv">
                <h3><span>知识图谱</span></h3>
                <p>
                    从全局角度查看金控业务的规模，用户群体，KPI进度等信息
                </p>
            </div> 
        </div>
    </div>
</div> 
</template>
<style scoped lang="less">
@keyframes trans {
  0% {
    opacity: .8;
    transform: translateY(150px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
.sixContainer{
    width: 100%;
    background:#FAFBFE url(../../assets/images/indexBg.png) center no-repeat;
}
.sixWrap{
    margin:0 auto;
    padding-top:120px;   
    width: 960px;
    height: 360px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    .sixDiv{
        position: relative;
        width: 300px;
        padding:15px 20px;
        box-sizing: border-box;
        cursor: pointer;
        .developing{
            position: absolute;
            z-index: 3;
            top:5px;
            right:21px;
            width: 126px;
            height: 25px;
            line-height: 27px;
            color:#fff;
            font-size: 14px;
            background: url(../../assets/images/biaoqian.png);
            text-align: center;
        }
        .noAuth{
            .conDiv;
            background:#fff url(../../assets/images/sixBg7.png);
            position: absolute;
            top:15px;
            z-index: 2;
            width: 260px;
            height: 150px;
            transform: translateY(150px);
            opacity: 0;
            p{
                padding-top:100px;
                background: url(../../assets/images/wuquanxian2.png) center 15px no-repeat;
                text-align: center;
                color:#999;
            }
        }
        &:hover{
            .noAuth{
                animation: trans 1s both;
            }
        }

        .conDiv{
            position: relative;
            z-index: 1;
            background:#fff url(../../assets/images/sixBg1.png);
            background-size: cover;
            height: 150px;
            border-radius: 10px;
            box-sizing: border-box;
            &:hover{
                transform: translateY(-1px);
                box-shadow: 0 3px 11px 0 #E1E2E9;
            }
            h3{
                width: 100%;
                font-size: 18px;
                font-weight: normal;
                color: #030303;
                text-align: center; 
                span{
                    display: inline-block;
                    padding-left: 60px;
                    height: 65px;
                    line-height: 65px;
                    background: url(../../assets/images/sixIcon1.png) left 7px no-repeat;
                }
            }
            p{
                padding:15px 15px 0 15px;
                font-size: 14px;
                color: #030303;
            }
        }
        &:nth-of-type(2){
            .conDiv{
                background:#fff url(../../assets/images/sixBg2.png);
                background-size: cover;
                span{
                    background: url(../../assets/images/sixIcon2.png) left 7px no-repeat;
                }
            }
        }
        &:nth-of-type(3){
            .conDiv{
                background:#fff url(../../assets/images/sixBg3.png);
                background-size: cover;
                span{
                    background: url(../../assets/images/sixIcon3.png) left 7px no-repeat;
                }
            }
        }
        &:nth-of-type(4){
            .conDiv{
                background:#fff url(../../assets/images/sixBg4.png);
                background-size: cover;
                span{
                    background: url(../../assets/images/sixIcon4.png) left 7px no-repeat;
                }
            }
        }
        &:nth-of-type(5){
            .conDiv{
                background:#fff url(../../assets/images/sixBg5.png);
                background-size: cover;
                span{
                    background: url(../../assets/images/sixIcon5.png) left 7px no-repeat;
                }
            }
        }
        &:nth-of-type(6){
            .conDiv{
                background:#fff url(../../assets/images/sixBg6.png);
                background-size: cover;
                span{
                    background: url(../../assets/images/sixIcon6.png) left 7px no-repeat;
                }
            }
        }
    }
}
@media screen and (min-width: 1400px){
    .sixWrap{
        padding-top:200px;
        width: 1050px;
        .sixDiv{
            width: 350px;
            padding:25px 30px;
            .conDiv{
                height: 167px;
            }
            .noAuth{
                height: 167px;
                background-size:cover;
                top:25px;
                width: 290px;
            }
            .developing{
                top:15px;
                right:30px;
            }
        }
    } 
}

</style>

<script type="text/ecmascript-6">
    export default {
        data(){
            return{
                
            }
        },
        components:{
            
        },
        mounted(){
            this.setHeight();
        },
        methods:{
            setHeight(){
                var sixWrap=document.querySelector('.sixContainer');
                //var sixDiv=document.querySelectorAll('.conDiv');
                sixWrap.style.height=document.documentElement.clientHeight-50+'px';
                /*for(let i=0;i<sixDiv.length;i++){
                    sixDiv[i].style.height=document.querySelector('.conDiv').offsetWidth*(15/26)+'px';
                }*/
            }
        }
    }
</script>

