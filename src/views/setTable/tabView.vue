<template>
    <section class="mainApi">
        <div class="mainTitle">
            <h4>{{tabName}}</h4>
            <span class="download"></span>
        </div>
        <div class="selectCtrl clearfix">
            <div v-for="(curP,index) in resData" :key="index" class="left everyCtrl">
                <label>{{curP.valueCn}}：</label>
                <input class="timeTxt" v-if="curP.control==1" type="text" :value="curP.defaultValue.replace(/\|\|/g,' 至 ')" @input="param[curP.key] = $event.target.value" :id="curP.key">
                <select v-if="curP.control==2" @change="param[curP.key] = $event.target.value">
                    <option v-for="(curOp,sxIndex) in curP.sxwds" :key="sxIndex" :value="curOp.key">{{curOp.value}}</option>
                </select>
            </div>
            <input type="button" value="查询" @click="getParam('news')" class="btnRightBlue">
        </div>

        
        <div class="tableWrap">
            <table width="100%">
                <thead>
                    <tr>
                        <th v-for="(curTh,index) in tabList.head" :key="index">{{curTh}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(curTr,index) in tabList.data" :key="index">
                        <td v-for="(curTd,tdIndex) in curTr" :key="tdIndex">{{curTd}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <pages :con-count="formconCount" :page-count="formpageCount" :current="formCurrentPage" @changePage="changePageFn" ref="newSelect"></pages>
    </section>
</template>
<script>
    import * as laydate from '../../assets/laydate/laydate.js'; //日历插件
    require('../../assets/laydate/theme/default/laydate.css');//日历样式
    import pages from '../../components/pages.vue';//分页组件
    export default {
        data(){
            return{
                configReportBm:'',//配置报表编码
                resData:[],
                param:{},
                tabList:{},
                tabName:'',

                formCurrentPage:1,//分页  1表当前页
                formconCount:1,//分页  1表总条数
                formpageCount:0,//分页  1表总页数
            }
        },
        components:{
            pages,
        },
        mounted(){
            this.setParam();
            setTimeout(()=>{
                this.tabName=localStorage.getItem('tabName');
            },0)
        },
        methods:{
            /*得到返回信息  获取参数对象*/
            setParam(){
                this.configReportBm=this.$route.query.configReportBm;
                this.$http.get('/configReport/dimension.gm?configReportBm='+this.configReportBm).then(function(res){
                    if(res.data.code==200){
                        this.resData=res.data.data.dimensionBOs;
                        this.$nextTick(function(){
                            this.resData.forEach((item)=> {
                                //得到查询参数列表
                                for(var key in item){
                                    if(key=='key'){
                                        this.param[item[key]]=item["defaultValue"];
                                    }
                                }
                                //渲染日历组件
                                if(item.control==1){//时间类型
                                    if(item.controlType==1){//时间区间  item.key为日历id及参数名  item.defaultValue：默认值
                                        this.showCalendar(item.key,item.defaultValue);
                                    }else if(item.controlType==2){//单个时间
                                        this.showBaseCanlender(item.key,item.defaultValue);
                                    }
                                }  
                            });
                            this.getParam();
                        })
                    }
                })
            },
            //查询
            getParam(news){
                if(news){
                    this.formCurrentPage=1;
                    this.$refs.newSelect.$emit('urlChange');
                }
                let param={
                    "page":this.formCurrentPage,
                    "rows":15,
                    "configReportBm":this.configReportBm,
                    "queryCondition":this.param
                }
                let pushParam=encodeURI(JSON.stringify(param));
                this.$http.get('/configReport/data.gm?param='+pushParam).then(function(res){
                    if(res.data.code==200){
                        this.tabList=res.data.data;
                        this.formpageCount=res.data.data.totalPages;//分页  2表总页
                        this.formconCount=res.data.data.totalRows;//分页  2表总条数
                    }
                })
            },
            changePageFn(res){
                this.formCurrentPage=res;
                this.getParam();
            },
            showCalendar(id,val){//日历 区间  id==key
                var _this=this;
                laydate.render({
					elem: '#'+id,
					theme: '#03BBFF',
					range: '至',
					value: val,
					/*min: '2017-12-01',
					max: '2018-04-01',*/
					done: function(value,date){
						_this.param[id] = value;
					}
				})
            },
            showBaseCanlender(id,val){//日历  单个
                var _this=this;
                laydate.render({
					elem: '#'+id,
					theme: '#03BBFF',
					value: val,
					btns: ['confirm'],
					/*min: '2017-02-01',
					max: '2018-04-01',*/
					done: function(value,date){
						_this.param[id] = value;
					}
				})
            }
        }
    }
</script>
<style lang="less" scoped>
    .mainTitle {
        background: #fff;
        box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding-left: 12px;
        position: relative;
        h4 {
            font-size: 16px;
            font-weight: normal;
        }
        .download {
            position: absolute;
            right: 12px;
            top: 50%;
            margin-top: -11px;
            width: 22px;
            height: 22px;
            background: url(../../assets/images/icon_2.png);
            font-size: 0;
            cursor: pointer;
        }
    }
    .selectCtrl{
        margin-bottom: 10px;
        padding:10px 10px;
        width: 100%;
        background: #fff;
        box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        .everyCtrl{
            margin-right: 20px;
            label{
                height: 30px;
                line-height: 30px;
            }
            select{
                padding: 0 30px 0 5px;
                -webkit-appearance: none;
                background: url(../../assets/images/downs.png) no-repeat 95% 55%;
                box-sizing: border-box;
            }
            .timeTxt{
                padding:3px 20px 3px 5px;
                border: 1px solid #D4D4D4;
                background: url(../../assets/images/canl.png) 96% center no-repeat;
                box-sizing: border-box;
            }
        }
    }
</style>
