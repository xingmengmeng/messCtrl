<template>
    <section class="mainApi">
        <h3>新建固定报表</h3>
        <div>
            <div class="left">
                <span>报表信息</span>
                <ul>
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
                <span>报表信息</span>
                <input type="radio" for="">
                <span>是否推送</span>
                <ul>
                    <li>
                        <label>任务周期：</label>
                        <ul>
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
                    <li>
                        <label>执行时间：</label>
                        <input type="text">
                    </li>
                    <li>
                        <label>推送邮箱：</label>
                        <textarea></textarea>
                    </li>
                </ul>
                <input type="button" value="保存">
            </div>
            <div class="right">
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
    </section>
</template>
<script>
    export default {
        data(){

        },
        methods:{
            
        }
    }
</script>

<style lang="less" scoped>
    .mainApi{
        padding-top: 60px;
    }
</style>

