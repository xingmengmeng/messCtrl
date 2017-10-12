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
	                    <option value="1">1</option>
	                    <option value="2">2</option>
	                    <option value="3">3</option>
	                    <option value="4">4</option>
	                    <option value="5">5</option>
	                </select>
        		</div>
        		<div class="dateChoose">
        			<span>完成时间：</span>
        			<ul class="btns">
        				<li>日</li>
        				<li>月</li>
        				<li>年</li>
        				<li>区间</li>
        			</ul>
        			<div class="calendar">
        				<input type="text" v-model="startTimes" class="smallTxt" readonly="" id="aboutDay"/>
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
	require('../../../assets/css/payTable.less');//三方支付样式
	require('../../../assets/css/layout.less');//全局样式
	require('../../../assets/laydate/theme/default/laydate.css');//日历样式
	
	import pages from '../../../components/pages.vue';//分页组件
	import setLeftHeight from '../../../assets/js/setLeftHeight';//设置左边栏的高度
	import * as laydate from '../../../assets/laydate/laydate.js'; //日历插件
	
	export default {
		data(){
			return{
				startTimes:'2017-10-12'
			}
		},
		mounted(){
			let aboutDay = laydate.render({
				elem: '#aboutDay',
				type:'dateTime',
				theme: 'lightblue',
				value: '2017-10-12'
			})
		},
		components:{
            'pages':pages
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
            }
		}
	}
</script>