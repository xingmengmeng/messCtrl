<template>
    <section class="mainApi">
        <h3>配置报表管理页面</h3>
        <div class="tableTitle clearfix">
            <h5>报表列表</h5>
            <div class="right">
                <input type="text" placeholder="报表名称" class="txt">
                <input type="button" value="查询" class="btnRightBlue">
                <input type="button" value="重置" class="btnRightBlue">
                <input type="button" value="新建" class="btnRightBlue">
            </div>
        </div>
        <div class="tableWrap"> 
            <table width="100%">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>报表名称</th>
                        <th>业务线</th>
                        <th>业务主体</th>
                        <th>创建时间</th>
                        <th>是否推送</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>XXXXXXXXXXXX报表</td>
                        <td>供应量金融</td>
                        <td>融资租赁</td>
                        <td>2017-11-07 00:00:00</td>
                        <td>否</td>
                        <td>
                            <a>编辑</a>
                            <a>删除</a>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>XXXXXXXXXXXX报表</td>
                        <td>供应量金融</td>
                        <td>融资租赁</td>
                        <td>2017-11-07 00:00:00</td>
                        <td>否</td>
                        <td>
                            <a>编辑</a>
                            <a>删除</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <pages :con-count="formconCount" :page-count="formpageCount" :current="formCurrentPage" @changePage="changePageFn" ref="newSelect"></pages>  
    </section>
</template>
<script>
    import pages from '../../components/pages.vue';//分页组件
    export default {
        data(){
            return{
                listData:[],
                formCurrentPage:1,//分页  1表当前页
                formconCount:1,//分页  1表总条数
                formpageCount:0,//分页  1表总页数
            }
        },
        components:{
            pages,
        },
        mounted(){

        },
        methods:{
            changePageFn(){

            },
        },
    }
</script>
<style lang="less" scoped>
    .mainApi{
        padding:0 10px;
        padding-top: 60px;
        background:#FAFBFE url(../../assets/images/indexBg.png) center no-repeat;
        box-sizing: border-box;
    }
    h3{
        padding: 0 20px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        color:#666;
        background: #E6EBF9;
        box-sizing: border-box;
    }
    .tableTitle{
        margin: 10px 0;
        padding: 10px 20px;
        background: #fff;
        box-shadow: 0 3px 11px 0 #E1E2E9;
        box-sizing: border-box;
        box-sizing: border-box;
        ::-webkit-input-placeholder{color:#bbb;}
        h5{
            float: left;
            font-size: 16px;
            margin-top:5px;
        }
        .btnRightBlue{
            margin-left: 10px;
        }
        .txt{
            padding:7px;
            border: 1px solid #ddd;
            border-radius: 1.4px;
            box-sizing: border-box;
        }
    }
</style>
