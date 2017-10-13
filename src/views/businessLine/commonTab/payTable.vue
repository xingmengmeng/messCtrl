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
        		<span class="download"></span>
        	</div>
        	<div class="conditionChoose">
        		<div class="sel">
        			<label class="companyp">业务主体：</label>
	                <select class="company" >
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
        			</ul>
        			<div class="calendar">
        				<input v-show="initDate == '日'" type="text" v-model="startDay" class="smallTxt" readonly id="aboutDay"/>
        				<input v-show="initDate == '月'" type="text" v-model="startMonth" class="smallTxt" readonly id="aboutMonth"/>
        				<input v-show="initDate == '年'" type="text" v-model="startYear" class="smallTxt" readonly id="aboutYear"/>
        				<input v-show="initDate == '区间'" type="text" v-model="startRange" class="smallTxt" readonly id="aboutRange"/>
        			</div>
        		</div>
        		<div class="intoPieces">
        			<label>进件编码：</label>
        			<input type="text" />
        			<button>查询</button>
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
        						<th>三方支付渠道汇款订单号</th>
        						<th>交易金额</th>
        						<th>完成时间</th>
        					</tr>
        				</thead>
        				<tbody>
        					<tr>
        						<td>进件编码</td>
        						<td>合同编号</td>
        						<td>业务主体</td>
        						<td>核心账务订单编号</td>
        						<td>三方支付渠道</td>
        						<td>三方支付渠道放款订单号</td>
        						<td>三方支付渠道汇款订单号</td>
        						<td>交易金额</td>
        						<td>完成时间</td>
        					</tr>
        				</tbody>
        			</table>
        		</div>
        		<pages :con-count="1" :page-count="1" :current="1" @changePage="" ref=""></pages>
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
				initDate: '日'
			}
		},
		mounted(){
			this.showCalendar();//日历默认显示
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
					this.startDay = this.defaultMes.day;
					this.startMonth = this.defaultMes.month;
					this.startYear = this.defaultMes.year;
					this.startRange = this.defaultMes.section.replace(',',' - ');
                });
            },
            showCalendar(){
            	//日历插件默认显示
            	let aboutDay = laydate.render({
					elem: '#aboutDay',
					theme: '#03BBFF',
					value: this.startDay
				})
				let aboutMonth = laydate.render({
					elem: '#aboutMonth',
					theme: '#03BBFF',
					type: 'month',
					value: this.startMonth
				})
				let aboutYear = laydate.render({
					elem: '#aboutYear',
					theme: '#03BBFF',
					type: 'year',
					value: this.startYear
				})
				let aboutRange = laydate.render({
					elem: '#aboutRange',
					theme: '#03BBFF',
					range: true,
					value: this.startYear
				})
            },
            changeClass(event){
            	var curValue = event.target.getAttribute("data-value");
            	this.initDate = curValue;
            }
		}
	}
</script>