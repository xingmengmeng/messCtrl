<template>
    <section class="mainApi">
        <h3 class="newTable">新建固定报表</h3>
        <div class="clearfix apiMain">
            <div class="leftWrap">
                <span class="titl">报表信息</span>
                <ul class="tabUl">
                    <li>
                        <label>业务线：</label>
                        <select>
                            <option value="">美借</option>
                        </select>
                    </li>
                    <li>
                        <label>业务主体：</label>
                        <select>
                            <option value="">贷后</option>
                        </select>
                    </li>
                    <li>
                        <label>报表名称：</label>
                        <input type="text">
                    </li>
                </ul>
                <span class="titl">定制任务</span>
                <input type="radio" style="margin-left:15px;">
                <span>是否推送</span>
                <ul class="pushUl">
                    <li class="firLi clearfix">
                        <label class="left">任务周期：</label>
                        <ul class="mesUl">
                            <li>
                                <input type="radio" for=""><span>每日</span>
                            </li>
                            <li>
                                <input type="radio" for=""><span>每周</span>
                                <select>
                                    <option value="">周一</option>
                                </select>
                            </li>
                            <li>
                                <input type="radio" for=""><span>每月</span>
                                <select>
                                    <option value="">1号</option>
                                </select>
                            </li>
                        </ul>
                    </li>
                    <li class="firLi">
                        <label>执行时间：</label>
                        <input type="text">
                    </li>
                    <li class="firLi clearfix">
                        <label class="left">推送邮箱：</label>
                        <textarea></textarea>
                    </li>
                </ul>
                <input type="button" value="保存">
            </div>
            <div class="rightWrap">
                <div class="dataWrap">
                    <h3>数据准备</h3>
                    <div>
                        <label>样本SQL：</label>
                        <textarea></textarea>
                    </div>
                    <div>
                        <label>参数配置：</label>
                        <span>解析表头</span>
                        <span>报表预览</span>
                        <table>
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>字段类型</th>
                                    <th>英文名称</th>
                                    <th>中文名称</th>
                                    <th>功能控件</th>
                                    <th>是否必填</th>
                                    <th>默认值</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>表头</td>
                                    <td>cat_flag</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <a>编辑</a>
                                        <a>删除</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <input type="button" value="提交">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        data(){
            return{
                
            }
        },
        methods:{
            
        }
    }
</script>

<style lang="less" scoped>
    .mainApi{
        padding:0 10px;
        padding-top: 60px;
        box-sizing: border-box;
        .newTable{
            margin-bottom:20px;
            width: 100%;
            font-size: 16px;
            box-sizing: border-box;
        }
    }
    .apiMain{
        display: flex;
        .leftWrap{
            padding:10px;
            width: 340px;
            background: #fff;
            border-radius: 3px;
            box-sizing: border-box;
            box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.1);
            .tabUl{
                margin-bottom: 20px;
                li{
                    margin:10px 0;
                    label{
                        display: inline-block;
                        width: 80px;
                        text-align: left;
                    }
                    select{width: 210px;}
                }
            }
            .pushUl{
                margin-top:20px;
                .firLi{
                    margin:10px 0;
                    label{
                        display: inline-block;
                        width: 80px;
                        text-align: left;
                    }
                    select{width: 80px;}
                    textarea{
                        margin-left:4px;
                        padding:5px;
                        float: left;
                        width: 210px;
                        height: 100px;
                        box-sizing: border-box;
                    }
                    .mesUl{
                        float: left;
                        li{margin:5px 0;}
                    }
                }
            }
        }
        .rightWrap{
            flex: 1;
            padding-left: 10px;
            box-sizing: border-box;
            .dataWrap{
                padding:10px;
                background: #f2f2f2;
                box-sizing: border-box;
            }
        }
    }
    .titl{
        font-size: 16px;
        font-weight: bold;
    }
</style>

