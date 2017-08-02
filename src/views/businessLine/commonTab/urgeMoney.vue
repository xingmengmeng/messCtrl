<template>
    <div class="container">
        <!--面包屑-->
        <section class="crumbsContainer">
            <div class="crumbs">
                <a href="#">美借</a>
                <span>></span>
                <a href="#">贷后分析</a>
                <span>></span>
                <a href="#">催收日常</a>
            </div>
        </section>
       <!-- 催收整体概览-->
        <div id="getAll" class="getAll">
           <!-- 催收整体概览head-->
            <div class="getTop">
                <ul class="everyUl allWidth">
                    <li class="csgl">催收整体概览</li>
                    <li class="rustart">
                        <div class="chub WZ">入催起止时间</div>
                        <div class="inputDiv WZ">
                            <datapicker v-model='ruyStartTime1' :min='rustartMinTime1' ></datapicker>
                        </div>
                        <div class="inputCenterLine WZ">-</div>
                        <div class="inputDiv WZ">
                            <datapicker v-model='startEndRu1' :min="ruyStartTime1"></datapicker>
                        </div>
                    </li>
                    <li class="chustart">
                        <div class="chub WZ">出催起止时间</div>
                        <div class="inputDiv WZ">
                            <datapicker v-model='chustartTime1' :min='chustartMinTime1'></datapicker>
                        </div>
                        <div class="inputCenterLine WZ">-</div>
                        <div class="inputDiv WZ">
                            <datapicker v-model='startEnd1' :min="chustartTime1" :max="chustartMaxTime1"></datapicker>
                        </div>
                    </li>

                    <li class="check">
                        <input type="button" value="查询"  class="check1" @click="check('tab1')">
                    </li>
                  <!--  <li class="">指标解释</li>-->
                    <li class="download" @click="downLoad('tab1')">下载</li>
                </ul>
            </div>
            <!--催收整体概览选项-->
            <div class="choices">
                <label class="companyp">催收公司</label>
                <select class="company" v-model="selected1" @change="choose('tab1')">
                    <option v-for="item in defaultMesAllCompany" v-bind:value="item.value">{{item.name}}</option>
                </select>
                <label class="stagep">催收阶段</label>
                <select class="stage" v-model="selected2" @change="choose('tab1')">
                    <option v-for="item in defaultMesAllStage" v-bind:value="item.value">{{item.name}}</option>
                </select>
                <label class="channelp">渠道</label>
                <select class="channel" v-model="selected3" @change="choose('tab1')">
                    <option v-for="item in defaultMesAllChannel" v-bind:value="item.value">{{item.name}}</option>
                </select>
                <label class="productp">产品</label>
                <select class="product" v-model="selected4" @change="choose('tab1')">
                    <option v-for="item in defaultMesAllProduct" v-bind:value="item.value">{{item.name}}</option>
                </select>

            </div>
            <!--催收整体概览的表格-->
            <div class="newTabls tableWrap">
                <table class="cuishoubg">
                    <thead class="cuishoubt" >
                    <tr class="cuishoubt1" >
                        <th rowspan="2">催收公司</th>
                        <th rowspan="2">催收阶段</th>
                        <th rowspan="2">产品类型</th>
                        <th rowspan="2">进件渠道</th>
                        <th colspan="2">入催</th>
                        <th colspan="2">出催</th>
                        <th colspan="2">出催率</th>
                        <th colspan="2">回款</th>
                        <th colspan="2">回款率</th>
                    </tr>
                    <tr class="cuishoubt2" >
                        <th >用户数</th>
                        <th>总金额</th>
                        <th>用户数</th>
                        <th>总金额</th>
                        <th>用户数</th>
                        <th>总金额</th>
                        <th>用户数</th>
                        <th>总金额</th>
                        <th>用户数</th>
                        <th>总金额</th>
                    </tr>
                    </thead>
                    <tbody class="cuishoubody">
                    <tr v-for="item in defaultMes">
                        <td>{{item.collct_company}}</td>
                        <td>{{item.collct_stage}}</td>
                        <td>{{item.channel}}</td>
                        <td>{{item.product}}</td>
                        <td>{{item.in_collct_user_count}}</td>
                        <td>{{item.in_collct_total_amount}}</td>
                        <td>{{item.out_collct_user_count}}</td>
                        <td>{{item.out_collct_total_amount}}</td>
                        <td>{{item.out_collct_rate_user_count}}</td>
                        <td>{{item.out_collct_rate_total_amount}}</td>
                        <td>{{item.payment_user_count}}</td>
                        <td>{{item.payment_total_amount}}</td>
                        <td>{{item.payment_rate_user_count}}</td>
                        <td>{{item.payment_rate_total_amount}}</td>
                    </tr>
                    <!--<tr v-for="item in defaultMesAllCompany">{{item.value}}</tr>
                    <tr v-for="item in defaultMesAllStage">{{item.value}}</tr>
                    <tr v-for="item in defaultMesAllChannel">{{item.value}}</tr>
                    <tr v-for="item in defaultMesAllProduct">{{item.value}}</tr>-->

                    </tbody>
                    <tfoot class="cuishoufoot" >
                    <tr>
                        <td  colspan="4">合计</td>
                        <td>{{defaultMesZong.in_collct_user_count}}</td>
                        <td>{{defaultMesZong.in_collct_total_amount}}</td>
                        <td>{{defaultMesZong.out_collct_user_count }}</td>
                        <td>{{defaultMesZong.out_collct_total_amount }}</td>
                        <td></td>
                        <td></td>
                        <td>{{defaultMesZong.payment_user_count}}</td>
                        <td>{{defaultMesZong.payment_total_amount}}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tfoot>
                </table>
            </div>

        </div>

        <!--催收整体明细-->
        <div id="getDetail" class="getAll">
            <!-- 催收整体概览head-->
            <div class="getTop">
                <ul class="everyUl allWidth">
                    <li class="csgl">催收整体明细</li>
                    <li class="rustart">
                        <div class="chub WZ">入催起止时间</div>
                        <div class="inputDiv WZ">
                            <datapicker v-model='ruyStartTime2' :min='rustartMinTime2'></datapicker>
                        </div>
                        <div class="inputCenterLine WZ">-</div>
                        <div class="inputDiv WZ">
                            <datapicker v-model='startEndRu2' :min="ruyStartTime2"></datapicker>
                        </div>
                    </li>
                    <li class="chustart">
                        <div class="chub WZ">出催起止时间</div>
                        <div class="inputDiv WZ">
                            <datapicker v-model='chustartTime2' :min='chustartMinTime2'></datapicker>
                        </div>
                        <div class="inputCenterLine WZ">-</div>
                        <div class="inputDiv WZ">
                            <datapicker v-model='startEnd2' :min="chustartTime2" :max="chustartMaxTime2"></datapicker>
                        </div>
                    </li>

                    <li class="check">
                        <input type="button" value="查询"  class="check1" @click="check('tab2')">
                    </li>
                    <!--  <li class="">指标解释</li>-->
                    <li class="download" @click="downLoad('tab2')">下载</li>
                </ul>
            </div>
            <!--催收整体概览选项-->
            <div class="choices">
                <label class="companyp">催收公司</label>
                <select class="company" v-model="selected5" @change="choose('tab2')">
                    <option v-for="item in defaultMesAllCompany" v-bind:value="item.value">{{item.name}}</option>
                </select>
                <label class="stagep">催收阶段</label>
                <select class="stage" v-model="selected6" @change="choose('tab2')">
                    <option v-for="item in defaultMesAllStage" v-bind:value="item.value">{{item.name}}</option>
                </select>
                <label class="channelp">渠道</label>
                <select class="channel" v-model="selected7" @change="choose('tab2')">
                    <option v-for="item in defaultMesAllChannel" v-bind:value="item.value">{{item.name}}</option>
                </select>
                <label class="productp">产品</label>
                <select class="product" v-model="selected8" @change="choose('tab2')">
                    <option v-for="item in defaultMesAllProduct" v-bind:value="item.value">{{item.name}}</option>
                </select>

            </div>
            <!--催收整体概览的表格-->
            <div class="newTabls2 tableWrap">
                <table class="cuishoubg cuishoubg2">
                    <thead class="cuishoubt">
                    <tr class="cuishoubt1" >
                        <th rowspan="2">催收公司</th>
                        <th rowspan="2">催收阶段</th>
                        <th rowspan="2">产品类型</th>
                        <th rowspan="2">进件渠道</th>
                        <th colspan="9">入催</th>
                        <th colspan="9">出催</th>
                        <th colspan="2">出催率</th>
                        <th colspan="13">回款</th>
                        <th colspan="2">回款率</th>
                    </tr>
                    <tr class="cuishoubt2" >
                        <th >用户数</th>
                        <th>总金额</th>
                        <th>本金</th>
                        <th>延期服务费</th>
                        <th>利息</th>
                        <th>服务费</th>
                        <th>管理费</th>
                        <th>罚息</th>
                        <th>滞纳金</th>
                        <th >用户数</th>
                        <th>总金额</th>
                        <th>本金</th>
                        <th>延期服务费</th>
                        <th>利息</th>
                        <th>服务费</th>
                        <th>管理费</th>
                        <th>罚息</th>
                        <th>滞纳金</th>
                        <th>用户</th>
                        <th>金额</th>
                        <th >用户数</th>
                        <th>总金额</th>
                        <th>本金</th>
                        <th>延期服务费</th>
                        <th>利息</th>
                        <th>服务费</th>
                        <th>管理费</th>
                        <th>罚息</th>
                        <th>滞纳金</th>
                        <th>提前结清管理费</th>
                        <th>提前结清服务费</th>
                        <th>提前回款本金</th>
                        <th>提前回款利息</th>
                        <th>用户</th>
                        <th>金额</th>
                    </tr>
                    </thead>
                    <tbody class="cuishoubody">
                    <tr v-for="item in defaultMes2">
                        <td>{{item.collct_company}}</td>
                        <td>{{item.collct_stage}}</td>
                        <td>{{item.channel}}</td>
                        <td>{{item.product}}</td>
                        <td>{{item.in_collct_user_count}}</td>
                        <td>{{item.in_collct_total_amount}}</td>
                        <td>{{item.in_collct_principal}}</td>
                        <td>{{item.in_collct_ext_service_charges}}</td>
                        <td>{{item.in_collct_interest}}</td>
                        <td>{{item.in_collct_service_charges}}</td>
                        <td>{{item.in_collct_management_fee}}</td>
                        <td>{{item.in_collct_penalty}}</td>
                        <td>{{item.in_collct_late_fee}}</td>
                        <td>{{item.out_collct_user_count}}</td>
                        <td>{{item.out_collct_total_amount}}</td>
                        <td>{{item.out_collct_principal}}</td>
                        <td>{{item.out_collct_ext_service_charges}}</td>
                        <td>{{item.out_collct_interest}}</td>
                        <td>{{item.out_collct_service_charges}}</td>
                        <td>{{item.out_collct_management_fee}}</td>
                        <td>{{item.out_collct_penalty}}</td>
                        <td>{{item.out_collct_late_fee}}</td>
                        <td>{{item.out_collct_rate_user_count}}</td>
                        <td>{{item.out_collct_rate_total_amount}}</td>
                        <td>{{item.payment_user_count}}</td>
                        <td>{{item.payment_total_amount}}</td>
                        <td>{{item.payment_principal}}</td>
                        <td>{{item.payment_ext_service_charges}}</td>
                        <td>{{item.payment_interest}}</td>
                        <td>{{item.payment_service_charges}}</td>
                        <td>{{item.payment_management_fee}}</td>
                        <td>{{item.payment_penalty}}</td>
                        <td>{{item.payment_late_fee}}</td>
                        <td>{{item.payment_adv_manag_fee}}</td>
                        <td>{{item.payment_adv_service_charges}}</td>
                        <td>{{item.payment_adv_pay_principal}}</td>
                        <td>{{item.payment_adv_pay_interest}}</td>
                        <td>{{item.payment_rate_user_count}}</td>
                        <td>{{item.payment_rate_total_amount}}</td>
                    </tr>
                    </tbody>
                    <tfoot class="cuishoufoot">
                    <tr>
                        <td  colspan="4">合计</td>

                        <td>{{defaultMes2Zong.in_collct_user_count}}</td>
                        <td>{{defaultMes2Zong.in_collct_total_amount}}</td>
                        <td>{{defaultMes2Zong.in_collct_principal}}</td>
                        <td>{{defaultMes2Zong.in_collct_ext_service_charges}}</td>
                        <td>{{defaultMes2Zong.in_collct_interest}}</td>
                        <td>{{defaultMes2Zong.in_collct_service_charges}}</td>
                        <td>{{defaultMes2Zong.in_collct_management_fee}}</td>
                        <td>{{defaultMes2Zong.in_collct_penalty}}</td>
                        <td>{{defaultMes2Zong.in_collct_late_fee}}</td>
                        <td>{{defaultMes2Zong.out_collct_user_count}}</td>
                        <td>{{defaultMes2Zong.out_collct_total_amount}}</td>
                        <td>{{defaultMes2Zong.out_collct_principal}}</td>
                        <td>{{defaultMes2Zong.out_collct_ext_service_charges}}</td>
                        <td>{{defaultMes2Zong.out_collct_interest}}</td>
                        <td>{{defaultMes2Zong.out_collct_service_charges}}</td>
                        <td>{{defaultMes2Zong.out_collct_management_fee}}</td>
                        <td>{{defaultMes2Zong.out_collct_penalty}}</td>
                        <td>{{defaultMes2Zong.out_collct_late_fee}}</td>
                        <td>{{defaultMes2Zong.out_collct_rate_user_count}}</td>
                        <td>{{defaultMes2Zong.out_collct_rate_total_amount}}</td>
                        <td>{{defaultMes2Zong.payment_user_count}}</td>
                        <td>{{defaultMes2Zong.payment_total_amount}}</td>
                        <td>{{defaultMes2Zong.payment_principal}}</td>
                        <td>{{defaultMes2Zong.payment_ext_service_charges}}</td>
                        <td>{{defaultMes2Zong.payment_interest}}</td>
                        <td>{{defaultMes2Zong.payment_service_charges}}</td>
                        <td>{{defaultMes2Zong.payment_management_fee}}</td>
                        <td>{{defaultMes2Zong.payment_penalty}}</td>
                        <td>{{defaultMes2Zong.payment_late_fee}}</td>
                        <td>{{defaultMes2Zong.payment_adv_manag_fee}}</td>
                        <td>{{defaultMes2Zong.payment_adv_service_charges}}</td>
                        <td>{{defaultMes2Zong.payment_adv_pay_principal}}</td>
                        <td>{{defaultMes2Zong.payment_adv_pay_interest}}</td>
                        <td>{{defaultMes2Zong.payment_rate_user_count}}</td>
                        <td>{{defaultMes2Zong.payment_rate_total_amount}}</td>
                    </tr>
                    </tfoot>
                </table>
            </div>

        </div>

        <!--催收人员明细-->
        <div id="getstaff" class="getAll">
            <!-- 催收整体概览head-->
            <div class="getTop">
                <ul class="everyUl allWidth">
                    <li class="csgl">催收人员明细</li>
                    <li class="rustart">
                        <div class="chub WZ">入催起止时间</div>
                        <div class="inputDiv WZ">
                            <datapicker v-model='ruyStartTime3' :min='rustartMinTime3'></datapicker>
                        </div>
                        <div class="inputCenterLine WZ">-</div>
                        <div class="inputDiv WZ">
                            <datapicker v-model='startEndRu3' :min="ruyStartTime3"></datapicker>
                        </div>
                    </li>
                    <li class="chustart">
                        <div class="chub WZ">出催起止时间</div>
                        <div class="inputDiv WZ">
                            <datapicker v-model='chustartTime3' :min='chustartMinTime3'></datapicker>
                        </div>
                        <div class="inputCenterLine WZ">-</div>
                        <div class="inputDiv WZ">
                            <datapicker v-model='startEnd3' :min="chustartTime3" :max="chustartMaxTime3"></datapicker>
                        </div>
                    </li>

                    <li class="check">
                        <input type="button" value="查询"  class="check1" @click="check('tab3')" />
                    </li>
                    <!--  <li class="">指标解释</li>-->
                    <li class="download" @click="downLoad('tab3')">下载</li>
                </ul>
            </div>
            <!--催收人员明细选项-->
            <div class="choices">
                <label class="companyp">催收公司</label>
                <select class="company" v-model="selected9" @change="choose('tab3')">
                    <option v-for="item in defaultMesAllCompany" v-bind:value="item.value">{{item.name}}</option>
                </select>
                <label class="stagep">催收阶段</label>
                <select class="stage" v-model="selected10" @change="choose('tab3')">
                    <option v-for="item in defaultMesAllStage" v-bind:value="item.value">{{item.name}}</option>
                </select>
                <label class="channelp">渠道</label>
                <select class="channel" v-model="selected11" @change="choose('tab3')">
                    <option v-for="item in defaultMesAllChannel" v-bind:value="item.value">{{item.name}}</option>
                </select>
                <label class="productp">产品</label>
                <select class="product" v-model="selected12" @change="choose('tab3')">
                    <option v-for="item in defaultMesAllProduct" v-bind:value="item.value">{{item.name}}</option>
                </select>
                <label>人员</label>
               <!-- @blur是vue中失去焦点，失去焦点后才能走接口，获取需要的名字的数据-->
                <input type="text"   @blur="choose('tab3')" @enter="choose('tab3')"  v-model="allName" class="people"/>

            </div>
            <!--催收人员明细的表格-->
            <div class="newTabls3 tableWrap">
                <table class="cuishoubg cuishoubg3">
                    <thead class="cuishoubt">
                    <tr class="cuishoubt1" >
                        <th rowspan="2">催收公司</th>
                        <th rowspan="2">催收阶段</th>
                        <th rowspan="2">催收人员</th>
                        <th colspan="9">入催</th>
                        <th colspan="9">出催</th>
                        <th colspan="2">出催率</th>
                        <th colspan="11">回款</th>
                        <th colspan="2">回款率</th>
                    </tr>
                    <tr class="cuishoubt2" >
                        <th >用户数</th>
                        <th>总金额</th>
                        <th>本金</th>
                        <th>延期服务费</th>
                        <th>利息</th>
                        <th>服务费</th>
                        <th>管理费</th>
                        <th>罚息</th>
                        <th>滞纳金</th>
                        <th >用户数</th>
                        <th>总金额</th>
                        <th>本金</th>
                        <th>延期服务费</th>
                        <th>利息</th>
                        <th>服务费</th>
                        <th>管理费</th>
                        <th>罚息</th>
                        <th>滞纳金</th>
                        <th>用户</th>
                        <th>金额</th>
                        <th >用户数</th>
                        <th>总金额</th>
                        <th>本金</th>
                        <th>延期服务费</th>
                        <th>利息</th>
                        <th>服务费</th>
                        <th>管理费</th>
                        <th>罚息</th>
                        <th>滞纳金</th>
                        <th>提前回款本金</th>
                        <th>提前回款利息</th>
                        <th>用户</th>
                        <th>金额</th>
                    </tr>
                    </thead>
                    <tbody class="cuishoubody">
                    <tr v-for="item in defaultMes3">
                        <td>{{item.collct_company}}</td>
                        <td>{{item.collct_stage}}</td>
                        <td>{{item.collct_user}}</td>
                        <td>{{item.in_collct_user_count}}</td>
                        <td>{{item.in_collct_total_amount}}</td>
                        <td>{{item.in_collct_principal}}</td>
                        <td>{{item.in_collct_ext_service_charges}}</td>
                        <td>{{item.in_collct_interest}}</td>
                        <td>{{item.in_collct_service_charges}}</td>
                        <td>{{item.in_collct_management_fee}}</td>
                        <td>{{item.in_collct_penalty}}</td>
                        <td>{{item.in_collct_late_fee}}</td>
                        <td>{{item.out_collct_user_count}}</td>
                        <td>{{item.out_collct_total_amount}}</td>
                        <td>{{item.out_collct_principal}}</td>
                        <td>{{item.out_collct_ext_service_charges}}</td>
                        <td>{{item.out_collct_interest}}</td>
                        <td>{{item.out_collct_service_charges}}</td>
                        <td>{{item.out_collct_management_fee}}</td>
                        <td>{{item.out_collct_penalty}}</td>
                        <td>{{item.out_collct_late_fee}}</td>
                        <td>{{item.out_collct_rate_user_count}}</td>
                        <td>{{item.out_collct_rate_total_amount}}</td>
                        <td>{{item.payment_user_count}}</td>
                        <td>{{item.payment_total_amount}}</td>
                        <td>{{item.payment_principal }}</td>
                        <td>{{item.payment_ext_service_charges}}</td>
                        <td>{{item.payment_interest}}</td>
                        <td>{{item.payment_service_charges}}</td>
                        <td>{{item.payment_management_fee}}</td>
                        <td>{{item.payment_penalty}}</td>
                        <td>{{item.payment_late_fee}}</td>
                        <td>{{item.payment_adv_pay_principal}}</td>
                        <td>{{item.payment_adv_pay_interest}}</td>
                        <td>{{item.payment_rate_user_count}}</td>
                        <td>{{item.payment_rate_total_amount}}</td>
                    </tr>
                    </tbody>
                    <tfoot class="cuishoufoot">
                    <tr>
                        <td  colspan="3">合计</td>
                        <td>{{defaultMes3Zong.in_collct_user_count}}</td>
                        <td>{{defaultMes3Zong.in_collct_total_amount}}</td>
                        <td>{{defaultMes3Zong.in_collct_principal}}</td>
                        <td>{{defaultMes3Zong.in_collct_ext_service_charges}}</td>
                        <td>{{defaultMes3Zong.in_collct_interest}}</td>
                        <td>{{defaultMes3Zong.in_collct_service_charges}}</td>
                        <td>{{defaultMes3Zong.in_collct_management_fee}}</td>
                        <td>{{defaultMes3Zong.in_collct_penalty}}</td>
                        <td>{{defaultMes3Zong.in_collct_late_fee}}</td>
                        <td>{{defaultMes3Zong.out_collct_user_count}}</td>
                        <td>{{defaultMes3Zong.out_collct_total_amount}}</td>
                        <td>{{defaultMes3Zong.out_collct_principal}}</td>
                        <td>{{defaultMes3Zong.out_collct_ext_service_charges}}</td>
                        <td>{{defaultMes3Zong.out_collct_interest}}</td>
                        <td>{{defaultMes3Zong.out_collct_service_charges}}</td>
                        <td>{{defaultMes3Zong.out_collct_management_fee}}</td>
                        <td>{{defaultMes3Zong.out_collct_penalty}}</td>
                        <td>{{defaultMes3Zong.out_collct_late_fee}}</td>
                        <td>{{defaultMes3Zong.out_collct_rate_user_count}}</td>
                        <td>{{defaultMes3Zong.out_collct_rate_total_amount}}</td>
                        <td>{{defaultMes3Zong.payment_user_count}}</td>
                        <td>{{defaultMes3Zong.payment_total_amount}}</td>
                        <td>{{defaultMes3Zong.payment_principal }}</td>
                        <td>{{defaultMes3Zong.payment_ext_service_charges}}</td>
                        <td>{{defaultMes3Zong.payment_interest}}</td>
                        <td>{{defaultMes3Zong.payment_service_charges}}</td>
                        <td>{{defaultMes3Zong.payment_management_fee}}</td>
                        <td>{{defaultMes3Zong.payment_penalty}}</td>
                        <td>{{defaultMes3Zong.payment_late_fee}}</td>
                        <td>{{defaultMes3Zong.payment_adv_pay_principal}}</td>
                        <td>{{defaultMes3Zong.payment_adv_pay_interest}}</td>
                        <td>{{defaultMes3Zong.payment_rate_user_count}}</td>
                        <td>{{defaultMes3Zong.payment_rate_total_amount}}</td>
                    </tr>
                    </tfoot>
                </table>
            </div>

        </div>

        <!--催收案件明细-->
        <div id="getscase" class="getAll">
            <!-- 催收整体概览head-->
            <div class="getTop">
                <ul class="everyUl allWidth">
                    <li class="csgl">催收案件明细</li>
                    <li class="rustart">
                        <div class="chub WZ">入催起止时间</div>
                        <div class="inputDiv WZ">
                            <datapicker v-model='ruyStartTime4' :min='rustartMinTime4'></datapicker>
                        </div>
                        <div class="inputCenterLine WZ">-</div>
                        <div class="inputDiv WZ">
                            <datapicker v-model='startEndRu4' :min="ruyStartTime4"></datapicker>
                        </div>
                    </li>
                    <li class="chustart">
                        <div class="chub WZ">出催起止时间</div>
                        <div class="inputDiv WZ">
                            <datapicker v-model='chustartTime4' :min='chustartMinTime4'></datapicker>
                        </div>
                        <div class="inputCenterLine WZ">-</div>
                        <div class="inputDiv WZ">
                            <datapicker v-model='startEnd4' :min="chustartTime4" :max="chustartMaxTime4"></datapicker>
                        </div>
                    </li>

                    <li class="check">
                        <input type="button" value="查询"  class="check1" @click="check('tab4')">
                    </li>
                    <!--  <li class="">指标解释</li>-->
                    <li class="download" @click="downLoad('tab4')">下载</li>
                </ul>
            </div>
            <!--催收整体概览选项-->
            <div class="choices">
                <label class="companyp">催收公司</label>
                <select class="company" v-model="selected13" @change="choose('tab4')">
                    <option v-for="item in defaultMesAllCompany" v-bind:value="item.value">{{item.name}}</option>
                </select>
                <label class="stagep">催收阶段</label>
                <select class="stage" v-model="selected14" @change="choose('tab4')">
                    <option v-for="item in defaultMesAllStage" v-bind:value="item.value">{{item.name}}</option>
                </select>
                <label class="channelp">渠道</label>
                <select class="channel" v-model="selected15" @change="choose('tab4')">
                    <option v-for="item in defaultMesAllChannel" v-bind:value="item.value">{{item.name}}</option>
                </select>
                <label class="productp">产品</label>
                <select class="product" v-model="selected16" @change="choose('tab4')">
                    <option v-for="item in defaultMesAllProduct" v-bind:value="item.value">{{item.name}}</option>
                </select>
                <label>人员</label>
                <input type="text"   @blur="choose('tab4')" @enter="choose('tab4')"  v-model="allName2" class="people"/>
            </div>
            <!--催收整体概览的表格-->
            <div class="newTabls4 tableWrap">
                <table class="cuishoubg cuishoubg4">
                    <thead class="cuishoubt">
                    <tr class="cuishoubt1" >
                        <th rowspan="2">催收公司</th>
                        <th rowspan="2">催收阶段</th>
                        <th rowspan="2">催收人员</th>
                        <th rowspan="2">账号编号</th>
                        <th rowspan="2">合同编号</th>
                        <th rowspan="2">产品类型</th>
                        <th rowspan="2">进件渠道</th>
                        <!--<th rowspan="2">客户姓名</th>
                        <th rowspan="2">客户性别</th>
                        <th rowspan="2">身份证号</th>
                        <th rowspan="2">手机号</th>-->
                        <th colspan="8">入催</th>
                        <th colspan="8">出催</th>
                        <!--<th>出催率</th>-->
                        <th colspan="10">回款</th>
                       <!-- <th colspan="2">回款率</th>-->
                    </tr>
                    <tr class="cuishoubt2" >
                        <th>总金额</th>
                        <th>本金</th>
                        <th>延期服务费</th>
                        <th>利息</th>
                        <th>服务费</th>
                        <th>管理费</th>
                        <th>罚息</th>
                        <th>滞纳金</th>
                       <!-- <th>交易手续费</th>-->
                        <th>总金额</th>
                        <th>本金</th>
                        <th>延期服务费</th>
                        <th>利息</th>
                        <th>服务费</th>
                        <th>管理费</th>
                        <th>罚息</th>
                        <th>滞纳金</th>
                        <!--<th>交易手续费</th>-->
                        <!--<th>用户</th>-->
                        <!--<th>金额</th>-->
                        <th>总金额</th>
                        <th>本金</th>
                        <th>延期服务费</th>
                        <th>利息</th>
                        <th>服务费</th>
                        <th>管理费</th>
                        <th>罚息</th>
                        <th>滞纳金</th>
                        <!--<th>交易手续费</th>-->
                        <th>提前回款本金</th>
                        <th>提前回款利息</th>
                        <!--<th>提前回款交易手续费</th>-->
                        <!--<th>用户</th>-->
                        <!--<th>金额</th>-->
                    </tr>
                    </thead>
                    <tbody class="cuishoubody">
                        <tr v-for="item in defaultMes4">
                            <td>{{item.collct_company}}</td>
                            <td>{{item.collct_stage}}</td>
                            <td>{{item.collct_user}}</td>
                            <td>{{item.account_no}}</td>
                            <td>{{item.contract_no}}</td>
                            <td>{{item.product}}</td>
                            <td>{{item.channel}}</td>
                            <!--<td>{{item.custom_name}}</td>
                            <td>{{item.gender}}</td>
                            <td>{{item.id_no}}</td>
                            <td>{{item.mobile}}</td>-->


                            <td>{{item.in_collct_total_amount}}</td>
                            <td>{{item.in_collct_principal}}</td>
                            <td>{{item.in_collct_ext_service_charges}}</td>
                            <td>{{item.in_collct_interest}}</td>
                            <td>{{item.in_collct_service_charges}}</td>
                            <td>{{item.in_collct_management_fee}}</td>
                            <td>{{item.in_collct_penalty}}</td>
                            <td>{{item.in_collct_late_fee}}</td>
                            <!--<td>此处是入催交易手续费</td>-->


                            <td>{{item.out_collct_total_amount}}</td>
                            <td>{{item.out_collct_principal}}</td>
                            <td>{{item.out_collct_ext_service_charges}}</td>
                            <td>{{item.out_collct_interest}}</td>
                            <td>{{item.out_collct_service_charges}}</td>
                            <td>{{item.out_collct_management_fee}}</td>
                            <td>{{item.out_collct_penalty}}</td>
                            <td>{{item.out_collct_late_fee}}</td>
                            <!--<td>此处是出催交易手续费</td>-->
                            <!--<td>{{item.out_collct_rate_total_amount}}</td>-->


                            <td>{{item.payment_total_amount}}</td>
                            <td>{{item.payment_principal}}</td>
                            <td>{{item.payment_ext_service_charges}}</td>
                            <td>{{item.payment_interest}}</td>
                            <td>{{item.payment_service_charges}}</td>
                            <td>{{item.payment_management_fee}}</td>
                            <td>{{item.payment_penalty}}</td>
                            <td>{{item.payment_late_fee}}</td>
                            <td>{{item.payment_adv_pay_principal}}</td>
                            <td>{{item.payment_adv_pay_interest}}</td>
                            <!--<td>提前回款交易手续费</td>-->
                            <!--<td>{{item.payment_rate_total_amount}}</td>-->
                    </tr>

                    </tbody>
                    <!--<tfoot class="cuishoufoot">
                    <tr>
                        <td  colspan="11">合计</td>
                        <td>{{defaultMes4Zong.in_collct_total_amount}}</td>
                        <td>{{defaultMes4Zong.in_collct_principal}}</td>
                        <td>{{defaultMes4Zong.in_collct_ext_service_charges}}</td>
                        <td>{{defaultMes4Zong.in_collct_interest}}</td>
                        <td>{{defaultMes4Zong.in_collct_service_charges}}</td>
                        <td>{{defaultMes4Zong.in_collct_management_fee}}</td>
                        <td>{{defaultMes4Zong.in_collct_penalty}}</td>
                        <td>{{defaultMes4Zong.in_collct_late_fee}}</td>
                        <td>{{defaultMes4Zong.out_collct_total_amount}}</td>
                        <td>{{defaultMes4Zong.out_collct_principal}}</td>
                        <td>{{defaultMes4Zong.out_collct_ext_service_charges}}</td>
                        <td>{{defaultMes4Zong.out_collct_interest}}</td>
                        <td>{{defaultMes4Zong.out_collct_service_charges}}</td>
                        <td>{{defaultMes4Zong.out_collct_management_fee}}</td>
                        <td>{{defaultMes4Zong.out_collct_penalty}}</td>
                        <td>{{defaultMes4Zong.out_collct_late_fee}}</td>
                        <td>{{defaultMes4Zong.out_collct_rate_total_amount}}</td>
                        <td>{{defaultMes4Zong.payment_total_amount}}</td>
                        <td>{{defaultMes4Zong.payment_principal}}</td>
                        <td>{{defaultMes4Zong.payment_ext_service_charges}}</td>
                        <td>{{defaultMes4Zong.payment_interest}}</td>
                        <td>{{defaultMes4Zong.payment_service_charges}}</td>
                        <td>{{defaultMes4Zong.payment_management_fee}}</td>
                        <td>{{defaultMes4Zong.payment_penalty}}</td>
                        <td>{{defaultMes4Zong.payment_late_fee}}</td>
                        <td>{{defaultMes4Zong.payment_adv_pay_principal}}</td>
                        <td>{{defaultMes4Zong.payment_adv_pay_interest}}</td>
                        <td>{{defaultMes4Zong.payment_rate_total_amount}}</td>
                    </tr>
                    </tfoot>-->
                </table>
                <pages :con-count="form4conCount" :page-count="form4pageCount" :current="form4CurrentPage" @changePage="changePageFn" ref="urlChange"></pages>
            </div>

        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    require('../../../assets/css/tbTable.less');
    require('../../../assets/css/layout.less');
    require('../../../assets/css/urgeMoney.less');
    import pages from '../../../components/pages.vue';
    import datePicker from '../../../components/Datepicker.vue';


export default {
  data(){
      return{
          chustartTime1:'',
          chustartTime2:'',
          chustartTime3:'',
          chustartTime4:'',
          chustartMinTime1:'',
          chustartMinTime2:'',
          chustartMinTime3:'',
          chustartMinTime4:'',
          chustartMaxTime1:'',
          chustartMaxTime2:'',
          chustartMaxTime3:'',
          chustartMaxTime4:'',
          startEnd1:'',
          startEnd2:'',
          startEnd3:'',
          startEnd4:'',
          ruyStartTime1:'',
          ruyStartTime2:'',
          ruyStartTime3:'',
          ruyStartTime4:'',
          rustartMinTime1:'',
          rustartMinTime2:'',
          rustartMinTime3:'',
          rustartMinTime4:'',
          startEndRu1:'',
          startEndRu2:'',
          startEndRu3:'',
          startEndRu4:'',
          defaultMes:'',//催收整体概览列表数
          defaultMesZong:'',//催收整体橄榄总数
          defaultMes2:'',//催收整体明细列表数
          defaultMes2Zong:'',//催收整体明细总数
          defaultMes3:'',//催收人员明细列表数
          defaultMes3Zong:'',//催收人员明细总数
          defaultMes4:'',//催收案件明细列表数
          defaultMes4Zong:'',//催收案件明细总数
          defaultMesAllCompany:'',
          defaultMesAllStage:'',
          defaultMesAllChannel:'',
          defaultMesAllProduct:'',
          /*此处一次是催收整体概览的四个选项*/
          selected1:'',
          selected2:'M1',
          selected3:'',
          selected4:'',
          /*此处一次是催收整体明细的四个选项*/
          selected5:'',
          selected6:'M1',
          selected7:'',
          selected8:'',
          /*此处是催收人员明细的四个选项*/
          selected9:'',
          selected10:'M1',
          selected11:'',
          selected12:'',
          /*此处是催收案件明细的四个选项*/
          selected13:'',
          selected14:'M1',
          selected15:'',
          selected16:'',
          allName:'',//催收人员明细人员名字
          allName2:'',//催收案件明细人员名字
          form4conCount:2,//分页  图表4的总条数
          form4pageCount:0,//分页  图表4的总页数
          form4CurrentPage:1,//分页   图表4的当前页



      }
  },
  components:{
      'datapicker':datePicker,
      'pages':pages,


  },
  mounted(){
      this.getStartData();
      //this.getAllData();
      //this.getDetailData();
      //this.getStaffData();
      //this.getCaseData();
      document.querySelector('.newTabls').addEventListener('scroll', function(e) {
          this.querySelector('thead').style.transform = 'translate(0, '+this.scrollTop+'px)';
      });
      document.querySelector('.newTabls2').addEventListener('scroll', function(e) {
          this.querySelector('thead').style.transform = 'translate(0, '+this.scrollTop+'px)';
      });
      document.querySelector('.newTabls3').addEventListener('scroll',function(e){
          this.querySelector('thead').style.transform='translate(0,'+this.scrollTop+'px)'
      });
      document.querySelector('.newTabls4').addEventListener('scroll',function(e){
          this.querySelector('thead').style.transform='translate(0,'+this.scrollTop+'px)'
      });
  },
  methods:{
      /*得到页面默认的信息*/
      getStartData(){
          this.$http.get('biPc/collct/dict.gm').then(function(res){
              this.defaultMesAllCompany=res.data.data.dataInfo.company_info;
              //console.log(JSON.stringify(this.defaultMesAllCompany));
              this.defaultMesAllStage=res.data.data.dataInfo.stage_info;
              this.defaultMesAllChannel=res.data.data.dataInfo.channel_info;
              this.defaultMesAllProduct=res.data.data.dataInfo.product_info;
              this.rustartMinTime1=this.rustartMinTime2=this.rustartMinTime3=this.rustartMinTime4=res.data.data.dataInfo.date_info.in_start_time;
              this.chustartMinTime1=this.chustartMinTime2=this.chustartMinTime3=this.chustartMinTime4=res.data.data.dataInfo.date_info.out_start_time;
              this.chustartTime1=this.chustartTime2=this.chustartTime3=this.chustartTime4=res.data.data.dataInfo.date_info.out_start_time;
              this.chustartMaxTime1=this.chustartMaxTime2=this.chustartMaxTime3=this.chustartMaxTime4=this.startEnd1=this.startEnd2=this.startEnd3=this.startEnd4=res.data.data.dataInfo.date_info.out_end_time;
              this.ruyStartTime1=this.ruyStartTime2=this.ruyStartTime3=this.ruyStartTime4=res.data.data.dataInfo.date_info.in_start_time;
              this.startEndRu1=this.startEndRu2=this.startEndRu3=this.startEndRu4=res.data.data.dataInfo.date_info.in_end_time;
              /*此处是默认催收整体概览*/
              this.getAllData(this.selected1,this.selected2,this.selected3,this.selected4,this.ruyStartTime1,this.startEndRu1,this.chustartTime1,this.startEnd1);
              /*此处是默认催收整体明细*/
              this.getDetailData(this.selected5,this.selected6,this.selected7,this.selected8,this.ruyStartTime2,this.startEndRu2,this.chustartTime2,this.startEnd2);
              /*此处是默认催收人员明细*/
              this.getStaffData(this.selected9,this.selected10,this.selected11,this.selected12,this.ruyStartTime3,this.startEndRu3,this.chustartTime3,this.startEnd3,this.allName);
              /*此处是默认催收案件明细*/
              this.getCaseData(this.selected13,this.selected14,this.selected15,this.selected16,this.ruyStartTime4,this.startEndRu4,this.chustartTime4,this.startEnd4,this.allName2,this.form4CurrentPage);
          });
      },
      choose(tab){
          if(tab=='tab1'){
              this.getAllData(this.selected1,this.selected2,this.selected3,this.selected4,this.ruyStartTime1,this.startEndRu1,this.chustartTime1,this.startEnd1);
          }else if(tab=='tab2'){
              this.getDetailData(this.selected5,this.selected6,this.selected7,this.selected8,this.ruyStartTime2,this.startEndRu2,this.chustartTime2,this.startEnd2);
          }else if(tab=='tab3'){
              this.getStaffData(this.selected9,this.selected10,this.selected11,this.selected12,this.ruyStartTime3,this.startEndRu3,this.chustartTime3,this.startEnd3,this.allName);
          }else if(tab=='tab4'){
              this.getCaseData(this.selected13,this.selected14,this.selected15,this.selected16,this.ruyStartTime4,this.startEndRu4,this.chustartTime4,this.startEnd4,this.allName2,this.form4CurrentPage);
          }
      },
      check(tab){
          if(tab=='tab1'){
              this.getAllData(this.selected1,this.selected2,this.selected3,this.selected4,this.ruyStartTime1,this.startEndRu1,this.chustartTime1,this.startEnd1);
          }else if(tab=='tab2'){
              this.getDetailData(this.selected5,this.selected6,this.selected7,this.selected8,this.ruyStartTime2,this.startEndRu2,this.chustartTime2,this.startEnd2);
          }else if(tab=='tab3'){
              this.getStaffData(this.selected9,this.selected10,this.selected11,this.selected12,this.ruyStartTime3,this.startEndRu3,this.chustartTime3,this.startEnd3,this.allName);
          }else if(tab=='tab4'){
              this.getCaseData(this.selected13,this.selected14,this.selected15,this.selected16,this.ruyStartTime4,this.startEndRu4,this.chustartTime4,this.startEnd4,this.allName2,this.form4CurrentPage);
          }
      },

      /*得到催收整体概览信息*/
      getAllData(a,b,c,d,e,f,g,h){
          /*此处是向后台传参的json格式*/
          var json={
              "collct_company":a,
              "collct_stage":b,
              "channel":c,
              "product":d,
              "in_start_time":e,
              "in_end_time":f,
              "out_start_time": g,
              "out_end_time":h,
          };
          //console.log(json);
          /*var json={
              "collct_company":this.selected1,
              "collct_stage":this.selected2,
              "channel":this.selected3,
              "product":this.selected4,
              "in_start_time":this.ruyStartTime1,
              "in_end_time":this.startEndRu1,
              "out_start_time": this.chustartTime1,
              "out_end_time":this.startEnd1,
          }*/
         /* 将json格式转换为字符串类型，因为encodeURI只识别字符串*/
          var param=encodeURI(JSON.stringify(json));
          //console.log(param);
          //var allHttp=encodeURI('biPc/collct/overall/glance.gm?collct_company='+this.selected1+'&collct_stage='+this.selected2+'&channel='+this.selected3+'&product='+this.selected4+'&in_start_time='+this.ruyStartTime1+'&in_end_time='+this.startEndRu1+'');
          //var allHttp='biPc/collct/overall/glance.gm';
          this.$http.get('biPc/collct/overall/glance.gm?param='+param+'').then(function (res) {
              if(res.data.code==203){
                  window.location.href='login.html';
                  return;
              }
              this.defaultMes=res.data.data.dataInfo.list_info;
              this.defaultMesZong=res.data.data.dataInfo.total_info;


          });
      },
      /*得到催收整体明细信息*/
      getDetailData(a,b,c,d,e,f,g,h){
          var json={
              "collct_company":a,
              "collct_stage":b,
              "channel":c,
              "product":d,
              "in_start_time":e,
              "in_end_time":f,
              "out_start_time": g,
              "out_end_time":h,
          };
          var param=encodeURI(JSON.stringify(json));

          this.$http.get('biPc/collct/overall/detail.gm?param='+param+'').then(function(res){
              if(res.data.code==203){
                  window.location.href='login.html';
                  return;
              }
              this.defaultMes2=res.data.data.dataInfo.list_info;
              this.defaultMes2Zong=res.data.data.dataInfo.total_info;
          });
      },
      /*得到催收人员明细*/
      getStaffData(a,b,c,d,e,f,g,h,i){
          //console.log(1);
          var json={
              "collct_company":a,
              "collct_stage":b,
              "channel":c,
              "product":d,
              "in_start_time":e,
              "in_end_time":f,
              "out_start_time": g,
              "out_end_time":h,
              "collct_user":i,
          };
          var param=encodeURI(JSON.stringify(json));
          this.$http.get('biPc/collct/user/detail.gm?param='+param+'').then(function(res){
              if(res.data.code==203){
                  window.location.href='login.html';
                  return;
              }
              this.defaultMes3=res.data.data.dataInfo.list_info;
              this.defaultMes3Zong=res.data.data.dataInfo.total_info;

          });
      },
      /*得到催收案件明细*/
      getCaseData(a,b,c,d,e,f,g,h,i,j){
          //console.log(1);
          var json={
              "collct_company":a,
              "collct_stage":b,
              "channel":c,
              "product":d,
              "in_start_time":e,
              "in_end_time":f,
              "out_start_time": g,
              "out_end_time":h,
              "collct_user":i,
          };
          var param=encodeURI(JSON.stringify(json));
          this.$http.get('biPc/collct/case/detail.gm?param='+param+'&curPage='+j+'').then(function(res){
              if(res.data.code==203){
                  window.location.href='login.html';
                  return;
              }
              this.defaultMes4=res.data.data.dataInfo.datas;
              //this.defaultMes4Zong=res.data.data.dataInfo.datas;
              this.form4conCount=res.data.data.dataInfo.total;//总条数
              this.form4pageCount=res.data.data.dataInfo.totalPage;//总条数
          });
      },
      /*此处是下载功能*/
      downLoad(tab){
          if(tab=='tab1'){
              var json={
                  "collct_company":this.selected1,
                  "collct_stage":this.selected2,
                  "channel":this.selected3,
                  "product":this.selected4,
                  "in_start_time":this.ruyStartTime1,
                  "in_end_time":this.startEndRu1,
                  "out_start_time": this.chustartTime1,
                  "out_end_time":this.startEnd1,
              };
              var param=encodeURI(JSON.stringify(json));
              var downUrl='biPc/collct/overall/glance/export.gm?param='+param+'';
              window.location.href=downUrl;
          }else if(tab=='tab2'){
              var json={
                  "collct_company":this.selected5,
                  "collct_stage":this.selected6,
                  "channel":this.selected7,
                  "product":this.selected8,
                  "in_start_time":this.ruyStartTime2,
                  "in_end_time":this.startEndRu2,
                  "out_start_time": this.chustartTime2,
                  "out_end_time":this.startEnd2,
              };
              var param=encodeURI(JSON.stringify(json));
              var downUrl='biPc/collct/overall/detail/export.gm?param='+param+'';
              window.location.href=downUrl;
          }else if(tab=='tab3'){
              var json={
                  "collct_company":this.selected9,
                  "collct_stage":this.selected10,
                  "channel":this.selected11,
                  "product":this.selected12,
                  "in_start_time":this.ruyStartTime3,
                  "in_end_time":this.startEndRu3,
                  "out_start_time": this.chustartTime3,
                  "out_end_time":this.startEnd3,
                  "collct_user":this.allName,
              };
              var param=encodeURI(JSON.stringify(json));
              var downUrl='biPc/collct/user/detail/export.gm?param='+param+'';
              window.location.href=downUrl;
          }else if(tab=='tab4'){
              var json={
                  "collct_company":this.selected13,
                  "collct_stage":this.selected14,
                  "channel":this.selected15,
                  "product":this.selected16,
                  "in_start_time":this.ruyStartTime4,
                  "in_end_time":this.startEndRu4,
                  "out_start_time": this.chustartTime4,
                  "out_end_time":this.startEnd4,
                  "collct_user":this.allName2,
              };
              var param=encodeURI(JSON.stringify(json));

              var downUrl='biPc/collct/case/detail/export.gm?param='+param+'&curPage='+this.form4CurrentPage+'';
              window.location.href=downUrl;
          };


      },
      changePageFn(res){
          this.form4CurrentPage=res;
          this.getCaseData(this.selected13,this.selected14,this.selected15,this.selected16,this.ruyStartTime4,this.startEndRu4,this.chustartTime4,this.startEnd4,this.allName2,this.form4CurrentPage);
      },


  }
}
</script>
