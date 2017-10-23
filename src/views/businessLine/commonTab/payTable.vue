<template>
	<div class="clearfix rightWrap">
		<!--面包屑-->
        <section class="crumbsContainer">
            <div class="crumbs">
                <a>财务</a>
                <span>></span>
                <a>融资租赁</a>
                <span>></span>
                <a>三方支付渠道信息</a>
            </div>
        </section>
        <!--右侧主要内容 start-->
        <section class="mainContainer clearfix">
        	<div class="mainTitle">
        		<h4>三方支付渠道信息</h4>
        		<span class="download" @click="download" v-if="tableDetail.payChannelDetails && tableDetail.payChannelDetails.length != 0"></span>
        	</div>
        	<div class="conditionChoose">
        		<div class="sel">
        			<label class="companyp">业务主体：</label>
	                <select class="company" v-model="selectRe">
	                    <option :value="items.value" v-if="defaultMes.incomeModelCom" v-for="items in defaultMes.incomeModelCom">{{items.text}}</option>
	                </select>
        		</div>
        		<div class="dateChoose">
        			<span>完成时间：</span>
        			<ul class="btns">
        				<li :class="initDate=='日'?'active':''" data-value="日" @click="changeClass($event)">日</li>
        				<li :class="initDate=='月'?'active':''" data-value="月" @click="changeClass($event)">月</li>
        				<li :class="initDate=='年'?'active':''" data-value="年" @click="changeClass($event)">年</li>
        				<li :class="initDate=='区间'?'active':''" data-value="区间" @click="changeClass($event)">区间</li>
        				<li>
        					<input v-show="initDate == '日'" type="text" v-model="startDay" class="smallTxt" readonly id="aboutDay"/>
        				<input v-show="initDate == '月'" type="text" v-model="startMonth" class="smallTxt" readonly id="aboutMonth"/>
        				<input v-show="initDate == '年'" type="text" v-model="startYear" class="smallTxt" readonly id="aboutYear"/>
        				<input v-show="initDate == '区间'" type="text" v-model="startRange" class="smallTxt" readonly id="aboutRange"/>
        				</li>
        			</ul>
        		</div>
        		<div class="intoPieces">
        			<label>进件编码：</label>
        			<input class="typeInput" type="text" v-model="intoPiecesRe"/>
        			<input type="button" value="查询" class="btn" @click="inquireData('newUrl')">
        		</div>
        	</div>
        	<div class="mainContent">
        		<div class="tableBlock">
        			<table>
        				<thead>
        					<tr>
        						<th>进件编码</th>
        						<th>合同编号</th>
        						<th>业务主体</th>
        						<th>核心账务订单编号</th>
        						<th>三方支付渠道</th>
        						<th>三方支付渠道放款订单号</th>
        						<th>三方支付渠道回款订单号</th>
        						<th>交易金额</th>
        						<th>完成时间</th>
        					</tr>
        				</thead>
        				<tbody v-if="tableDetail && tableDetail.payChannelDetails && tableDetail.payChannelDetails.length != 0">
        					<tr v-for="items in tableDetail.payChannelDetails">
        						<td>{{items.appNo}}</td>
        						<td>{{items.contractNo}}</td>
        						<td>{{items.incomeModel}}</td>
        						<td>{{items.orderId}}</td>
        						<td>{{items.chnid}}</td>
        						<td>{{items.bizidPayment}}</td>
        						<td>{{items.bizidReceipt}}</td>
        						<td>{{items.amount}}</td>
        						<td>{{items.completetime}}</td>
        					</tr>
        				</tbody>
        				<tbody v-else>
        					<tr>
        						<td colspan="9" style="padding-right:24%">暂无业务数据</td>
        					</tr>
        				</tbody>
        			</table>
        		</div>
        		<pages :con-count="formconCount" :page-count="formpageCount" :current="formCurrentPage" @changePage="changePageFn" ref="urlChange"></pages>
        	</div>
        </section>
	</div>
</template>
<script type="text/ecmascript-6">
	import * as laydate from '../../../assets/laydate/laydate.js'; //日历插件
	require('../../../assets/css/payTable.less');//三方支付样式
	require('../../../assets/css/layout.less');//全局样式
	require('../../../assets/laydate/theme/default/laydate.css');//日历样式
	
	import pages from '../../../components/pages.vue';//分页组件
	import setLeftHeight from '../../../assets/js/setLeftHeight';//设置左边栏的高度
	
	
	export default {
		data(){
			return{
				startDay: '',//日历默认显示日期		日
				startMonth: '',//日历默认显示日期		月
				startYear: '',//日历默认显示日期		年
				startRange: '',//日历默认显示日期		区间
				defaultMes: '',//初始加载信息
				initDate: '日',//默认显示的日历模式
				sendData: '',//查询数据传的参数
				selectRe: '',//业务主体的选中值
				intoPiecesRe: '',//进件编码的输入值
				formconCount: 0,//总条数
				formpageCount: 0,//总页数
				formCurrentPage: 1,//当前页
				tableDetail:''//查询后的数据
			}
		},
		mounted(){
			this.getData();//获取默认信息
		},
		components:{
            'pages':pages
        },
		methods:{
			//获取默认信息	包括日、月、年、区间的默认值	以及	业务主体下拉框信息
            getData(){
                this.$http.get('biPc/payChannel/init.gm').then(function (res) {
                    if(res.data.code==203){
                        window.location.href='login.html';
                        return;
                    }
					this.defaultMes = res.data.data.dataInfo;
					this.startDay = this.defaultMes.day;		//日
					this.startMonth = this.defaultMes.month;	//月
					this.startYear = this.defaultMes.year;		//年
					this.startRange = this.defaultMes.section.replace(',',' - ');//区间
					//日历默认显示
					this.showCalendar(this.defaultMes.day,this.defaultMes.month,this.defaultMes.year);
					//获取查询后的表格详情
					this.sendData = {
						incomeModel: this.selectRe,
						appNo: this.intoPiecesRe,
						date: this.startDay,
						page: this.formCurrentPage,
						row: 15
					}
					this.getDetail(encodeURIComponent(JSON.stringify(this.sendData)));
                });
            },
            //获取查询后的表格详情
            getDetail(sendData){
            	this.$http.get('biPc/payChannel/data.gm?pcQueryModel='+sendData).then(function (res) {
                    if(res.data.code==203){
                        window.location.href='login.html';
                        return;
                    }
					this.tableDetail = res.data.data.dataInfo;
					this.formconCount = this.tableDetail.totalRows,//总条数
					this.formpageCount = this.tableDetail.totalPages,//总页数
					this.formCurrentPage = this.tableDetail.page//当前页
                });
            },
            //日历插件默认显示
            showCalendar(day,month,year){
       			let _this = this;
       			let newStr = new Date(new Date(day).getTime()+24*60*60*1000);
       			let newYear = newStr.getFullYear();
       			let newMonth = (newStr.getMonth()+1)<10 ? ('0'+(newStr.getMonth()+1)) : (newStr.getMonth()+1);
       			let newDay = (newStr.getDate())<10 ? ('0'+(newStr.getDate())) : (newStr.getDate());
       			let rangeEnd = newYear +'-'+ newMonth +'-'+ newDay;//时间的最大值
       			//console.log(day)
       			//console.log(rangeEnd)
       			//console.log(Math.random())
       			//console.log(new Date().toLocaleDateString())
            	var aboutDay = laydate.render({
					elem: '#aboutDay',
					theme: '#03BBFF',
					value: _this.startDay,
					btns: ['confirm'],
					min: '2017-02-01',
					max: day,
					done: function(value,date){
						//console.log('你选择的日期是：' + value + '\n获得的对象是' + JSON.stringify(date));
						_this.startDay = value;
					}
				})
				let aboutMonth = laydate.render({
					elem: '#aboutMonth',
					theme: '#03BBFF',
					type: 'month',
					value: _this.startMonth,
					btns: ['confirm'],
					min: '2017-02-01',
					max: rangeEnd,
					done: function(value,date){
						_this.startMonth = value;
					}
				})
				let aboutYear = laydate.render({
					elem: '#aboutYear',
					theme: '#03BBFF',
					type: 'year',
					value: _this.startYear,
					btns: ['confirm'],
					min: '2017-02-01',
					max: rangeEnd,
					done: function(value,date){
						_this.startYear = value;
					}
				})
				let aboutRange = laydate.render({
					elem: '#aboutRange',
					theme: '#03BBFF',
					range: true,
					value: _this.startRange,
					btns: ['confirm'],
					min: '2017-02-01',
					max: day,
					done: function(value,date){
						_this.startRange = value;
					}
				})
            },
            //改变日、月、年、区间	高亮显示
            changeClass(event){
            	var curValue = event.target.getAttribute("data-value");
            	this.initDate = curValue;
            },
			//查询进件信息
            inquireData(newUrl){
            	//获取查询后的表格详情
            	let curDate;
            	if(this.initDate == '日'){
            		curDate = this.startDay;
            	}else if(this.initDate == '月'){
            		curDate = this.startMonth;
            	}else if(this.initDate == '年'){
            		curDate = this.startYear;
            	}else if(this.initDate == '区间'){
            		curDate = this.startRange.replace(' - ',',');
            	}
				this.sendData = {
					incomeModel: this.selectRe,
					appNo: this.intoPiecesRe,
					date: curDate,
					page: this.formCurrentPage,
					row: 15
				}
				//判断是否需要重新开始查询
				if(newUrl){
                    this.sendData.page = 1;
                    this.formCurrentPage = 1;
                    this.$refs.urlChange.$emit('urlChange');
                }
				this.getDetail(encodeURIComponent(JSON.stringify(this.sendData)));
            },
            download(){
            	//获取下载的信息
            	let curDate,downData,downUrl;
            	if(this.initDate == '日'){
            		curDate = this.startDay;
            	}else if(this.initDate == '月'){
            		curDate = this.startMonth;
            	}else if(this.initDate == '年'){
            		curDate = this.startYear;
            	}else if(this.initDate == '区间'){
            		curDate = this.startRange.replace(' - ',',');
            	}
				downData = {
					incomeModel: this.selectRe,
					appNo: this.intoPiecesRe,
					date: curDate
				}
				downData = encodeURIComponent(JSON.stringify(downData));
				downUrl = 'biPc/payChannel/download.gm?pcQueryModel='+downData;
            	//先判断是否登录
                this.$http.get('biPc/login/isLogin.gm').then(function (res) {
                	if(res.data.code!=200){
                        return;
                  	}else {
                  		//登录成功后的逻辑
		                window.location.href=downUrl;//下载文件
                   	}
                })
            },
            //切换页数
            changePageFn(res){
            	//res为当前页
            	this.formCurrentPage = res;//当前页
            	this.inquireData();//查询数据
            }
		}
	}
</script>