<template>
    <div class="clearfix rightWrap">
        <!--面包屑-->
        <section class="crumbsContainer">
            <div class="crumbs">
                <a>美借</a>
                <span>></span>
                <a>资产分析</a>
                <span>></span>
                <a>推标报表</a>
            </div>
        </section>
        
        <!--右侧主要内容 start-->
        <section class="mainContainer clearfix">
            <div class="divWrap">
                <div class="biaoWrap">
                    <div class="everyDiv clearfix">
                        <h4 class="ablePush">可推标</h4>
                        <div v-cloak>
                            <ul class="everyUl">
                                <li>总资产</li>
                                <li class="boldF">{{defaultMes.ktbPushAssertAmount}}万元</li>
                            </ul>
                            <ul class="everyUl">
                                <li>国美可推资产</li>
                                <li class="boldF">{{defaultMes.ktbGomePushAssertAmount}}万元</li>
                            </ul>
                            <ul class="everyUl">
                                <li>总预计收益</li>
                                <li class="boldF">{{defaultMes.ktbTotalProfit}}万元</li>
                            </ul>
                            <ul class="everyUl">
                                <li>总预计收益率</li>
                                <li class="boldF">{{defaultMes.ktbTotalProfitRate}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="biaoWrap">
                    <div class="everyDiv clearfix">
                        <h4>已推标</h4>
                        <div>
                            <ul class="everyUl has23">
                                <li>总资产</li>
                                <li class="boldF">{{defaultMes.ytbPushAssertAmount}}万元</li>
                            </ul>
                            <ul class="everyUl has23">
                                <li>国美已推资产</li>
                                <li class="boldF">{{defaultMes.ytbGomePushAssertAmount}}万元</li>
                            </ul>
                            <ul class="everyUl has22">
                                <li>总预计收益</li>
                                <li class="boldF">{{defaultMes.ytbTotalProfit}}万元</li>
                            </ul>
                            <ul class="everyUl has16">
                                <li>总预计收益率</li>
                                <li class="boldF">{{defaultMes.ytbTotalProfitRate}}</li>
                            </ul>
                            <ul class="everyUl has16">
                                <li>坏账率</li>
                                <li class="boldF">{{defaultMes.ytbBadDebtRate}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="biaoWrap">
                    <div class="everyDiv clearfix">
                        <h4 class="timeSelect">时间选择</h4>
                        <div>
                            <ul class="everyUl allWidth">
                                <li>
                                    <div class="inputDiv">
                                        {{startTime}}
                                        <!--<datapicker v-model='startTime' :min='startMinTime'></datapicker>-->
                                    </div>
                                    <span class="inputCenterLine">-</span>
                                    <div class="inputDiv">
                                        <datapicker v-model='startEnd' :min="startTime"></datapicker>
                                    </div>
                                </li>
                                <li class="clearfix">
                                    <span class="left boldF14">区间到期国美可推资产：{{resAmount}}万元</span>
                                    <input type="button" value="查询" class="right btn" @click="selectTimeFn('newUrl')">
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="biaoWrap">
                    <div class="everyDiv clearfix">
                        <h4 class="selfMoney">自定义金额</h4>
                        <div>
                            <ul class="everyUl allWidth">
                                <li>
                                    <span class="left boldF14">开始时间：</span>
                                    <div class="inputDiv">
                                        {{moneyStartTime}}
                                        <!--<datapicker v-model='moneyStartTime' :min='moneyStartMinTime'></datapicker>-->
                                    </div>
                                </li>
                                <li class="clearfix">
                                    <span class="left boldF14">到期国美可推资产：<input type="text" class="txt" v-model="moneyTxt">万元</span>
                                    <input type="button" value="查询" class="right btn" @click="selectMoneyFn('newUrl')">
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!--表导航-->
            <div class="tableTop">
                <div class="topWrap">
                    <div class="left" @click="changeTabShow($event)">
                        <a name="1" :class="{'active':showTab==1}">查询结果</a>
                        <a name="2" :class="{'active':showTab==2}">推标概览</a>
                        <a class="detailsNav" name="3" :class="{'active':showTab==3}">推标明细</a>
                    </div>
                    <div class="right">
                        <span class="pushTabIcon" v-show="showTab==1" v-if="meijieAdminFlag" @click="pushBiFn">推标</span>
                        <span class="outTabIcon" v-show="showTab==2" v-if="meijieAdminFlag" @click="outBiFn">退标</span>
                        <span class="backTabIcon" v-show="showTab==3" @click="goBackFn">返回</span>
                        <span class="downTabIcon" @click="exportTab">导出</span>
                    </div>
                </div>
            </div>
            <!--三个表格-->
            <div class="tableCon">
                <!--查询结果-->
                <div class="left moduleWrap clearfix" v-show="showTab==1">
                    <div class="tableWrap">
                        <table width="100%">
                            <thead>
                            <tr>
                                <th width="60">账户</th>
                                <th width="80">产品类型</th>
                                <th width="80">客户姓名</th>
                                <th width="150">身份证号</th>
                                <th width="110">手机号</th>
                                <th width="90">放款日期</th>
                                <th>合同金额</th>
                                <th>放款金额</th>
                                <th width="60">总期数</th>
                                <th>所属期数</th>

                                <th width="90">到期还款日期</th>
                                <th>应还本金</th>
                                <th>可推资产</th>
                                <th>国美可推资产</th>
                                <th>资产预计总收益</th>
                                <th>资产预计收益率</th>
                                <!--<th width="90">到期还款日期</th>-->
                                <th>资产总天数</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in form1Info">
                                <td>{{item.acctNbr}}</td>
                                <td>{{item.loanCode}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.idNo}}</td>
                                <td>{{item.mobileNo}}</td>
                                <td>{{item.loanDateStr}}</td>
                                <td>{{item.loanInitPrin}}</td>
                                <td>{{item.loanAmount}}</td>
                                <td>{{item.loanInitTerm}}</td>
                                <td>{{item.currTerm}}</td>

                                <td>{{item.loanPmtDueDateStr}}</td>
                                <td>{{item.loanTermInt}}</td>
                                <td>{{item.pushAssertAmount}}</td><!--可推资产-->
                                <td>{{item.gomePushAssertAmount}}</td><!--国美可推资产-->
                                <td>{{item.totExpectedReturned}}</td>
                                <td>{{item.totExpectedRate}}</td>
                                <!--<td>{{item.loanPmtDueDateStr}}</td>-->
                                <td>{{item.totAssetDays}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <pages :con-count="form1conCount" :page-count="form1pageCount" :current="form1CurrentPage" @changePage="changePageFn" ref="urlChange"></pages>
                </div>

                <!--推标概览-->
                <div class="left moduleWrap clearfix" v-show="showTab==2">
                    <div class="tableWrap">
                        <table width="100%">
                            <thead>
                            <tr>
                                <th>导出选项</th>
                                <th>资产转让日期</th>
                                <th>序号</th>
                                <th>资产包金额（万元）</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in resDate2">
                                <td>
                                    <div class="checkWrap">
                                        <input type="radio" name="outCheck" :value="item.serialnum" v-model="checkAry">
                                        <i class="checkImg" :class="item.serialnum!=checkAry?'classA':'classB'"></i>
                                    </div>
                                </td>
                                <td>{{item.pushtipsdateStr}}</td>
                                <td>{{item.serialnum}}</td>
                                <td>{{item.amount}}</td>
                                <td><a @click="showDetails(item.serialnum)">明细</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <pages :con-count="form2conCount" :page-count="form2pageCount" :current="form2CurrentPage" @changePage="changePageFn2" ref="newSelect"></pages>
                </div>

                <!--推标明细-->
                <div class="left moduleWrap clearfix" v-show="showTab==3">
                    <div class="tableWrap scrollWrap">
                        <table width="240%">
                            <thead>
                            <tr>
                                <th width="100">资产转让日期</th>
                                <th>序号</th>
                                <th>账户</th>
                                <th>产品类型</th>
                                <th width="100">客户姓名</th>
                                <th>身份证号</th>
                                <th>手机号</th>
                                <th width="100">放款日期</th>
                                <th>合同金额</th>
                                <th width="80">放款金额</th>
                                <th width="50">总期数</th>
                                <th>所属期数</th>
                                <th width="100">到期还款日期</th>
                                <th>应还本金</th>
                                <th>可推资产</th>
                                <th>国美可推资产</th>
                                <th>资产预计总收益</th>
                                <th>资产预计收益率</th>
                                <th width="80">资产总天数</th>
                                <th>资产转让天数</th>
                                <th>资产转让预计总收益</th>
                                <th>资产应收总收益</th>
                                <th>资产实收总收益</th>
                                <th>月份</th>
                                <th>当月资产转让天数</th>
                                <th>当月资产转让预计收益</th>
                                <th>当月资产转让应收收益</th>
                                <th>当月资产转让实收收益</th>
                                <th>收益差额</th>
                                <th width="120">还款状态</th>
                                <th>逾期天数</th>
                                <th>账户逾期天数</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in detailsData">
                                <td>{{item.pushtipsdateStr}}</td>
                                <td>{{item.serialnum}}</td>
                                <td>{{item.acctNbr}}</td>
                                <td>{{item.loanCode}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.idNo}}</td>
                                <td>{{item.mobileNo}}</td>
                                <td>{{item.loanDateStr}}</td>
                                <td>{{item.loanInitPrin}}</td>
                                <td>{{item.loanAmount}}</td>
                                <td>{{item.loanInitTerm}}</td>
                                <td>{{item.currTerm}}</td>
                                <td>{{item.loanPmtDueDateStr}}</td><!--到期还款日-->
                                <td>{{item.loanTermInt}}</td><!--loanTermInt-->
                                <td>{{item.pushAssertAmount}}</td><!--可推资产-->
                                <td>{{item.gomePushAssertAmount}}</td><!--国美可推资产-->
                                <td>{{item.totExpectedReturned}}</td>
                                <td>{{item.totExpectedRate}}</td>
                                <td>{{item.totAssetDays}}</td>
                                <td>{{item.assetTransDays}}</td>
                                <td>{{item.assetTransEstProfit}}</td>
                                <td>{{item.assetReciProfit}}</td>
                                <td>{{item.assetRealProfit}}</td>
                                <td>{{item.ctdAssetTransDaysMonth}}</td>
                                <td>{{item.ctdAssetTransDays}}</td>
                                <td>{{item.cdtAssetTransEstProfit }}</td>
                                <td>{{item.ctdAssetTransReciProfit}}</td>
                                <td>{{item.ctdAssetTransRealProfit}}</td>
                                <td>{{item.gapProfit}}</td>
                                <td>{{item.repayStatus}}</td>
                                <td>{{item.currtermOverdueDays}}</td>
                                <td>{{item.acctOverdueDays}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <pages :con-count="form3conCount" :page-count="form3pageCount" :current="form3CurrentPage" @changePage="changePageFn3" ref="newSelect2"></pages>
                </div>
            </div>

        </section>
        <!--右侧主要内容 end-->
        <over-box-one-line v-show="noSelectCon==1" @hideOverFn="hideMarkWrap" mark-con="请输入到期应还款本金"></over-box-one-line>
        <over-box-one-line v-show="noSelectM==1" @hideOverFn="hideMarkWrap" mark-con="请选中目标信息"></over-box-one-line>
        <over-box-one-line v-show="noSelectT==1" @hideOverFn="hideMarkWrap" mark-con="开始时间不能大于结束时间"></over-box-one-line>
        <!--推标弹框-->
        <pushMarker v-show="pushMarker==1" @hidePushFn="hideMarkWrap" @changePushList="changePushList" ref="sendData"></pushMarker>
        <!--是否确认退标-->
        <confirm-com v-show="confirmMarker==1" @hidePushFn="hideMarkWrap" @confirmTrue="confirmTrueFn"></confirm-com>

        <over-box-one-line v-show="noSelectP==1" @hideOverFn="hideMarkWrap" :mark-con="pushMsg"></over-box-one-line>
    </div>
</template>
<script type="text/ecmascript-6">
    require('../../../assets/css/tbTable.less');//推标特有的样式
    require('../../../assets/css/layout.less');//全局样式

    import pages from '../../../components/pages.vue';//分页组件
    import datePicker from '../../../components/Datepicker.vue';//日历插件
    import overBoxOneLine from '../../../components/overBoxOneLine.vue';//只有一行的提示框
    import pushMarker from '../../../components/pushMarker.vue';//推标的提示
    import confirmCom from '../../../components/confirmCom.vue';//确认的提示

    import setLeftHeight from '../../../assets/js/setLeftHeight';//设置左边栏的高度

    export default {
        data(){
            return{
                startTime:'',
                startMinTime:'',
                startEnd:'',
                moneyStartTime:'',
                moneyStartMinTime:'',
                showTab:1,
                resDate:[],//分页返回值  查询结果
                resDate2:[],//分页返回值  推标概览
                noSelectCon:0,//无按条件查询数据  弹框显示与隐藏
                noSelectM:0,//请选中目标信息   弹框显示与隐藏
                noSelectT:0,//开始时间大于结束时间   弹框显示与隐藏
                noSelectP:0,
                pushMsg:'',
                defaultMes:{
                    ktbTotalAmount:'22',
                    ktbStartDate:'',
                },
                selectUrl:'',//查询地址
                form1Info:[],
                resAmount:'',//按照时间查询  区间到期应还款本金
                form1QueryCondition:null,//查询结果用于生成资产包
                moneyTxt:'',//到期应还款本金  文本框输入的数值
                pushMarker:0,//推标弹框显示与隐藏
                confirmMarker:0,//是否确认退标弹框显示与隐藏
                queryCondition:{},
                checkAry:'',//单选按钮选中结果
                detailsData:[],//推标明细返回数据
                detailId:'',//每次的明细id
                form1CurrentPage:1,//分页  1表当前页
                form1conCount:2,//分页  1表总条数
                form1pageCount:0,//分页  1表总页数
                resDateFrom:1,//1代表来自时间选择   2代表来自金额查询

                form2CurrentPage:1,//分页  2表当前页
                form2conCount:200,//分页  2表总条数
                form2pageCount:6,//分页  2表总页数

                form3CurrentPage:1,//分页  3表当前页
                form3conCount:200,//分页  3表总条数
                form3pageCount:6,//分页  3表总页数

                meijieAdminFlag:false,//下载按钮显示控制
            }
        },
        components:{
            'pages':pages,
            'datapicker':datePicker,
            'overBoxOneLine':overBoxOneLine,
            'pushMarker':pushMarker,
            'confirmCom':confirmCom,
        },
        mounted(){
            this.getData();
            this.getDefTime();
            this.getLocale();
            this.$on('showPushMsg',function (res) {
                console.log(res);
            })
        },
        methods:{
            //得到默认信息
            getData(){
                this.$http.get('biPc/debtChange/getBaseInfo.gm').then(function (res) {
                    if(res.data.code==203){
                        window.location.href='login.html';
                        return;
                    }
                    this.defaultMes=res.data.data.dataInfo;
                    this.getAdminFlag();
                });
            },
            //得到是否可推标权限
            getAdminFlag(){
                this.$http.get('biPc/debtChange/isPushDebt.gm').then(function(res){
                    if(res.data.code=='200'){
                        this.meijieAdminFlag=res.data.data.dataInfo;
                        localStorage.meijieAdminFlag=this.meijieAdminFlag;
                    }
                })
            },
            //得到默认时间
            getDefTime(def){
                this.$http.get('biPc/debtChange/getTimeBaseInfo.gm').then(function (res) {
                    this.startTime=this.moneyStartTime=this.startMinTime=this.moneyStartMinTime=res.data.data.dataInfo.ktbStartDate;
                    this.startEnd=res.data.data.dataInfo.ktbEndDate;
                    this.selectTimeFn();
                });
            },
            //得到本地存储内容
            getLocale(){
                this.meijieAdminFlag=localStorage.meijieAdminFlag;
            },
            //点击时间选择 查询按钮 事件----------时间查询
            selectTimeFn(newUrl,pushPackge){
                //得到开始和结束时间
                if(newUrl){//重新开始查询
                    this.form1CurrentPage=1;
                    this.$refs.urlChange.$emit('urlChange');
                }
                this.resDateFrom=1;
                this.moneyTxt='';
                var d1=new Date(this.startTime),
                        d2=new Date(this.startEnd);
                if(d1>d2) {
                    this.noSelectT=1;
                    return;
                }
                this.selectUrl='biPc/debtChange/getPushDebtByTime.gm?rows=15&page='+this.form1CurrentPage+'&startDate='+this.startTime+'&endDate='+this.startEnd;

                if(pushPackge){
                    this.getSelectData('times',pushPackge);
                }else{
                    this.getSelectData('times');
                }
                //this.getSelectData('times');
            },
            //得到按金额查询结果    -------按金额查询
            selectMoneyFn(newUrl){
                if(this.moneyTxt==''){
                    this.noSelectCon=1;
                    return;
                }
                if(newUrl){//重新开始查询
                    this.form1CurrentPage=1;
                    this.$refs.urlChange.$emit('urlChange');
                }
                this.resDateFrom=2;
                this.selectUrl='biPc/debtChange/getPushDebtByAmount.gm?rows=15&page='+this.form1CurrentPage+'&startDate='+this.moneyStartTime+'&amount='+this.moneyTxt;
                this.getSelectData();
            },
            getSelectData(myTime,pushPackge){
                if(!pushPackge){
                    this.showTab=1;
                }
                this.$emit('toggleLoading',true);
                this.$http.get(this.selectUrl).then(function (res) {
                    if(res.data.code==200){
                        this.resDate=res.data.data.dataInfo;
                        this.form1pageCount=this.resDate.totalPages;//总页数
                        this.form1conCount=this.resDate.totalRows;//总条数
                        this.form1QueryCondition=this.resDate.queryCondition;
                        this.form1Info=this.resDate.info;

                        this.queryCondition=this.resDate.queryCondition;

                        if(myTime) this.resAmount=this.resDate.amount;

                        this.$nextTick(function () {
                            setLeftHeight.setLeftHeight.init();
                        })
                    }
                });
            },
            //选项卡切换   查询结果、推标概览
            changeTabShow(event){
                if(event.target.tagName.toLowerCase()=='a'){
                    var tabName=event.target.name;
                    this.showTab=tabName;
                    //点击推标概览  如果没有查询结果则查询
                    if(this.showTab==2){
                        this.changePushList();
                    }
                }
            },
            hideMarkWrap(){
                this.noSelectCon=this.noSelectM=this.noSelectT=this.noSelectP=this.pushMarker=this.confirmMarker=0;
            },
            //查询结果分页
            changePageFn(res){
                this.form1CurrentPage=res;
                if(this.resDateFrom==1){//时间选择的查询结果分页
                    this.selectTimeFn();
                }else {
                    this.selectMoneyFn();
                }
            },
            //点击推标
            pushBiFn(){
                var queryConStr=JSON.stringify(this.queryCondition);
                this.$http.post('biPc/debtChange/loadAssetPackSerial.gm',{"queryCondition":queryConStr},{emulateJSON:true}).then(function (res) {
                    var resMes=res.data.data.dataInfo.serial;
                    var minTime=res.data.data.dataInfo.kssj;
                    var maxTime=res.data.data.dataInfo.jssj;
                    this.pushMarker=1;
                    this.$refs.sendData.$emit('getMarkMes',resMes,this.queryCondition,this.startTime,minTime,maxTime);
                })
            },
            //推标概览显示查询
            changePushList(res,pushMsg){
                if(res){//点击提交按钮重新查询来的数据
                    this.form2CurrentPage=1;
                    this.$refs.newSelect.$emit('urlChange');
                }
                if(pushMsg){
                    this.noSelectP=1;
                    this.pushMsg=pushMsg;
                }
                this.showTab=2;
                //重新查询可推标与已推标
                this.$http.get('biPc/debtChange/getBaseInfo.gm').then(function (res) {
                    this.defaultMes=res.data.data.dataInfo;
                });
                //重新查询
                this.selectTimeFn('newUrl','pushPackge');
                //查询资产包信息
                this.$http.get('biPc/debtChange/listPackInfo.gm?page='+this.form2CurrentPage+'&rows=15').then(function (res) {
                    this.resDate2=res.data.data.dataInfo.info;
                    this.form2pageCount=res.data.data.dataInfo.totalPages;//分页  2表总页
                    this.form2conCount=res.data.data.dataInfo.totalRows;//分页  2表总条数
                    this.$nextTick(function () {
                        setLeftHeight.setLeftHeight.init();
                    })
                })
            },
            //推标概览分页点击
            changePageFn2(res){
                this.form2CurrentPage=res;
                this.checkAry='';//点击分页后清空存储的选中按钮
                this.changePushList();
            },
            //退标点击   出弹框
            outBiFn(){
                if(this.checkAry.length==0){//没有选中目标  显示错误提示弹框
                    this.noSelectM=1;
                    return;
                }else {
                    this.confirmMarker=1; //显示是否确认退标弹框
                }
            },
            //确认退标
            confirmTrueFn(){
                this.hideMarkWrap();
                this.$http.get('biPc/debtChange/reversePackInfo.gm?serialnums='+this.checkAry).then(function (res) {
                    //code成功  隐藏弹框  重新查询退标概览
                    if(res.data.code==200){
                        this.checkAry='';
                        this.confirmMarker=0;
                        this.changePushList('news');
                    }
                })
            },
            //明细按钮
            showDetails(serId){
                this.detailId=serId;
                this.form3CurrentPage=1;
                this.$refs.newSelect2.$emit('urlChange');
                this.detailsFn();
            },
            detailsFn(){
                this.$http.get('biPc/debtChange/listPackMxxx.gm?serialnum='+this.detailId+'&page='+this.form3CurrentPage+'&rows=15').then(function (res) {
                    //code成功  隐藏弹框  重新查询退标概览
                    if(res.data.code==200){
                        this.showTab=3;
                        this.confirmMarker=0;
                        this.detailsData=res.data.data.dataInfo.info;
                        this.form3pageCount=res.data.data.dataInfo.totalPages;//分页  3表总页
                        this.form3conCount=res.data.data.dataInfo.totalRows;//分页  33表总条数

                        this.$nextTick(function () {
                            setLeftHeight.setLeftHeight.init();
                        })
                    }
                })
            },
            //明细分页
            changePageFn3(res){
                this.form3CurrentPage=res;
                this.detailsFn();
            },
            //返回按钮
            goBackFn(){
                this.showTab=2;
            },
            //导出 下载
            exportTab(){
                //判断是否登录
                this.$http.get('biPc/login/isLogin.gm').then(function (res) {
                    if(res.data.code!=200){
                        return;
                    }else {
                        //登录成功的逻辑
                        var downUrl='';
                        var queryStr=JSON.stringify(this.queryCondition);
                        if(this.showTab==1){//查询列表的下载导出
                            if(this.form1Info.length==0){
                                alert('无下载结果');
                                return;
                            }
                            downUrl='biPc/debtChange/downloadPushDebtInfo.gm?queryCondition='+queryStr;
                            window.location.href=downUrl;
                        }else if(this.showTab==2){//推标概览及明细的下载导出
                            if(this.checkAry.length==0){
                                this.noSelectM=1;
                                return;
                            }
                            downUrl='biPc/debtChange/downloadPackMxxx.gm?serialnum='+this.checkAry;
                            window.location.href=downUrl;
                        }else{
                            downUrl='biPc/debtChange/downloadPackMxxx.gm?serialnum='+this.detailId;
                            window.location.href=downUrl;
                        }
                        //window.location.href=downUrl;
                    }
                })
            }
        }
    }
</script>

