<template>
    <section class="clearfix">
        <ul @click="changeShowIndex($event)" class="selfUlNav clearfix">
            <li :class="showIndex==1?'active':''">查询编辑</li>
            <li :class="showIndex==2?'active':''">查询管理</li>
        </ul>
        <!--查询编辑  start-->
        <div v-show="showIndex==1">
            <div class="left leftSide clearfix">
                <ul @click="changeDataIndex($event)" class="dataShowUl clearfix">
                    <li class="active">数据库源信息</li>
                    <li>数据仓库信息</li>
                </ul>
                <!--数据库源信息 start-->
                <div v-show="showDataIndex==1" class="botDiv clearfix">
                    <select name="messSelect" id="messSelect" v-model="selected" @change="selectVal('5',selected)">
                        <option value="">选择业务线</option>
                        <option :value="op.ocMenubm" v-for="op in oneLevelMenus" :key="op">{{op.vcMenumc}}</option>
                    </select>
                    <select name="dataLibrary" id="dataLibrary" v-model="selectedSecond" @change="selectVal('6',selectedSecond)">
                        <option value="">选择数据库</option>
                        <option :value="op.ocMenubm" v-for="op in twoLevelMenus" :key="op">{{op.vcMenumc}}</option>
                    </select>
                    <select name="dataTable" id="dataTable" v-model="selectedThree" @change="showNewTab(selectedThree)">
                        <option value="">选择数据表</option>
                        <option :value="op.ocMenubm" v-for="op in threeLevelMenus" :key="op">{{op.vcMenumc}}</option>
                    </select>
                    <!--折叠菜单-->
                    <ul class="menuUl clearfix">
                        <li class="firstLi" v-for="item in menuData" :key="item">
                            <span @click="showMenu(item.ocMenubm)">{{item.name}}</span>
                            <ul class="clearfix" v-show="menuShowSecond==item.ocMenubm">
                                <li class="secondLi" v-for="secondMenu in item.children" :key="secondMenu">
                                    <span @click="showMenuThree(secondMenu.ocMenubm)">{{secondMenu.name}}</span>
                                    <ul class="clearfix scrollUl" v-show="menuShowThree==secondMenu.ocMenubm">
                                        <li class="threeLi" @click="showNewTab(cur.ocMenubm)" v-for="cur in secondMenu.children" :id="cur.ocMenubm" :key="cur">{{cur.name}}</li>
                                        <!--<li class="threeLi">t_user</li>
                                        <li class="threeLi">t_user</li>-->
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <!--数据库源信息 end-->

                <!--数据仓库信息 start-->
                <div v-show="showDataIndex==2" class="botDiv clearfix">
                    数据仓库信息
                </div>
                <!--数据仓库信息 end-->
            </div>
            <section class="rightSide clearfix">
                <div>
                    <button @click="addSql">新建</button>
                    <button @click="showCeatSql">保存</button>
                    <button @click="selectSql">执行</button>
                    <button @click="endSql" style="position:relative; z-index:3" class="selectBtn" :class="seleSqling?'active':''">终止</button>
                    <div class="whiteWrap" v-show="seleSqling"></div>
                </div>
                <div class="left flexDiv">
                    <div class="everySql" :class="curShow==index?'active':'noActive'" v-for="(item,index) in sqlNameAry" @click="changeSqlDivShow(index,$event)" :key="index">
                        <span>{{item.name}}</span>
                        <i>+</i>
                    </div>
                    <!--<div class="everySql left">
                        <span>新建查询.sql</span>
                        <i>+</i>
                    </div>-->
                    <span class="left addIcon" @click="addSql">+</span>
                </div>
                <textarea spellcheck="false" class="textareaClass" v-for="(item,index) in sqlNameAry" v-show="curShow==index" v-model="item.con" :key="index" @mouseup="setSelectedCon" @change="clearSelectedCon"></textarea>

                <div class="downDiv">
                    <div class="downWrap" @click="changeDataShow($event)">
                        <span :class="downShowIndex==1?'active':''">执行日志</span>
                        <span :class="downShowIndex==2?'active':''">执行结果</span>
                        <a href="javascript:;" class="right downRes" v-show="downShowIndex==2&&sqlResTabData.head" @click="downRes">下载</a>
                    </div>
                    <div v-show="downShowIndex==1" class="libDiv firstDiv">
                        <pre id="log"></pre>
                        <div class="selIngIcon" v-show="seleSqling">{{setTimes}}s  执行中...</div>
                    </div>
                    <div v-show="downShowIndex==2" class="libDiv">
                        <div class="tableWrap newTabls" v-show="sqlResTabData.head">
                            <table width="100%">
                                <thead>
                                    <tr>
                                        <th v-for="item in sqlResTabData.head" :key="item">{{item}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in sqlResTabData.data" :key="item">
                                        <td v-for="curTd in item" :key="curTd">{{curTd}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <!--查询编辑  end-->

        <!--查询管理  start-->
        <div v-show="showIndex==2" class="selectManage">
            <div class="tabTop">
                <input type="text" placeholder="查询名称" v-model="vcRwmc" class="txt">
                <input type="button" value="查询" class="btn" @click="changeResData">
            </div>
            <div class="tableWrap">
                <table width="100%">
                    <thead>
                        <tr>
                            <!--<th><input type="checkbox"></th>-->
                            <th>创建时间</th>
                            <th>查询名称</th>
                            <th>执行用户</th>
                            <th width="50%">查询</th>
                            <th width="100">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in selectListData" :key="index">
                            <!--<td>
                                <input type="checkbox" name="outCheck">
                            </td>-->
                            <td>{{item.vcCjsj}}</td>
                            <td>{{item.vcRwmc}}</td>
                            <td>{{item.ocCjr}}</td>
                            <td style="text-align:left;">{{item.vcDrillsqlText}}</td>
                            <td>
                                <!--<a>执行</a>-->
                                <a @click="deleteList(item.NId)">删除</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <pages :con-count="form3conCount" :page-count="form3pageCount" :current="form3CurrentPage" @changePage="changePageFn3" ref="newSelect2"></pages>
        </div>
        <!--查询管理  end-->

        <save-sql v-show="saveShow==1" @hidePushFn="hideMarkWrap" @saveSqlName="saveSqlNameFn" ref="saveId"></save-sql>
        <new-tab v-show="newTabShow==1" @hideNewTabFn="hideMarkWrap" ref="newTabBox"></new-tab>
        <over-box-one-line v-show="noSelectP==1" @hideOverFn="hideMarkWrap" :mark-con="pushMsg"></over-box-one-line>
    </section>
</template>
<script type="text/ecmascript-6">
require('../../assets/css/tbTable.less');
require('../../assets/css/selfHelp.less');

import getUuid from '../../assets/js/getUuid.js';
import saveSql from '../../components/saveSql.vue';
import newTab from '../../components/newTab.vue';
import overBoxOneLine from '../../components/overBoxOneLine.vue';
import pages from '../../components/pages.vue';

export default {
    data () {
        return {
            userName:'',
            menuData:[],
            linkMenu:[],
            oneLevelMenus:[],
            twoLevelMenus:[],
            threeLevelMenus:[],
            sqlText:'',//textarea里的值
            sqlNameAry:[],
            sqlResTabData:{},
            showIndex:1,
            showDataIndex:1,
            downShowIndex:1,
            saveShow:0,/*显示与隐藏*/
            newTabShow:0,/*显示与隐藏*/
            curShow:0,/*显示的textarea索引*/
            exLog:'',
            seleSqling:false,
            uuid:'',
            selected:'',
            selectedSecond:'',
            selectedThree:'',
            menuShowSecond:'-1',
            menuShowThree:'-1',
            pushMsg:'最多新建9条查询Sql',
            noSelectP:0,
            vcRwmc:'',
            selectListData:[],//查询管理的数据
            form3CurrentPage:1,//分页  3表当前页
            form3conCount:200,//分页  3表总条数
            form3pageCount:6,//分页  3表总页数
            n:1,/*新建查询计数*/
            setTimes:0,/*查询sql的耗时*/
            selectedCon:'',/*当前页面鼠标选中的值*/
        }
    },
    components:{
        'save-sql':saveSql,
        'new-tab':newTab,
        'overBoxOneLine':overBoxOneLine,
        'pages':pages,
    },
    mounted(){
        this.sqlNameAry.length=0;

        var obj={};
        obj.name='新建查询'+this.n+'.sql';
        obj.con='',
        this.sqlNameAry.push(obj);
        this.n++;

        this.getLocal();
        this.$nextTick(function(){
            this.getLeftMenuData();
            this.getLinkMenu();
        });

        document.querySelector('.newTabls').addEventListener('scroll', function(e) {
            this.querySelector('thead').style.transform = 'translate(0, '+this.scrollTop+'px)';
        });
    },
    methods:{
        /**/
        getLocal(){
            this.userName=localStorage.userName;
        },
        /*左侧菜单*/
        getLeftMenuData(){
            this.$http.get('biPc/selfAnaPlatform/getMenus.gm?userName='+this.userName).then(function(res){
                if(res.data.code=='200'){
                    this.menuData=res.data.data.dataInfo;
                } 
            })
        },
        /*获取联动菜单*/
        getLinkMenu(){
            this.$http.get('biPc/selfAnaPlatform/getLevelMenus.gm').then(function(res){
                if(res.data.code=='200'){
                    this.linkMenu=res.data.data.dataInfo;
                    this.oneLevelMenus=this.linkMenu.oneLevelMenus;
                    this.twoLevelMenus=this.linkMenu.twoLevelMenus;
                    this.threeLevelMenus=this.linkMenu.threeLevelMenus;
                }
            })
        },
        /*联动菜单选择*/
        selectVal(level,menuNm){
            if(level=='5'){
                this.menuShowSecond=menuNm;
            }else if(level=='6'){
                this.twoLevelMenus.forEach((item) =>{
                    if(item.ocMenubm==menuNm){
                        this.menuShowSecond=item.ocParentbm;
                    }
                }, this);
                this.menuShowThree=menuNm;
            }
            this.$http.get('biPc/selfAnaPlatform/menusLink.gm?level='+level+'&ocMenubm='+menuNm).then(function(res){
                if(res.data.code=='200'){
                    if(level=='5'){
                        this.twoLevelMenus=res.data.data.dataInfo.twoLevelMenus;
                        this.threeLevelMenus=res.data.data.dataInfo.threeLevelMenus;
                        this.selectedSecond=this.selectedThree='';
                    }else if(level=='6'){
                        this.threeLevelMenus=res.data.data.dataInfo.threeLevelMenus;
                        this.selectedThree='';
                    }
                }
            })
        },
        /*折叠菜单切换 二级*/
        showMenu(ocMenubm){
            if(this.menuShowSecond==ocMenubm){
                this.menuShowSecond=-1;
                return;
            }
            this.menuShowSecond=ocMenubm;
        },
        /*折叠菜单切换 三级*/
        showMenuThree(ocMenubm){
            if(this.menuShowThree==ocMenubm){
                this.menuShowThree=-1;
                return;
            }
            this.menuShowThree=ocMenubm;
        },
        /*查询编辑、查询管理切换*/
        changeShowIndex(e){
            if(e.target.tagName.toLowerCase()=='li'){
                if(e.target.innerHTML=='查询编辑'){
                    this.showIndex=1;
                    //this.resetClass(e,'.selfUlNav','li');
                }else{
                    this.showIndex=2;
                    /*默认  如果列表为空  则查询信息显示*/
                    if(this.selectListData.length==0){
                        this.$http.get('biPc/selfAnaPlatform/listSqlText.gm?vcRwmc='+this.vcRwmc+'&page=1&rows=15').then(function(res){
                            if(res.data.code=='200'){
                                this.selectListData=res.data.data.dataInfo.info;
                                this.form3CurrentPage=res.data.data.dataInfo.page;
                                this.form3conCount=res.data.data.dataInfo.totalRows;//分页  3表总条数
                                this.form3pageCount=res.data.data.dataInfo.totalPages;//分页  3表总页数
                            }
                        })
                    } 
                    //this.resetClass(e,'.selfUlNav','li');
                }
            }
        },
        /*数据库源信息、数据仓库信息切换*/
        changeDataIndex(e){
            if(e.target.tagName.toLowerCase()=='li'){
                if(e.target.innerHTML=='数据库源信息'){
                    this.showDataIndex=1;
                    this.resetClass(e,'.dataShowUl','li');
                }else{
                    this.showDataIndex=2;
                    this.resetClass(e,'.dataShowUl','li');
                }
            }
        },
        /*执行日志、执行结果切换*/
        changeDataShow(e){
            if(e.target.tagName.toLowerCase()=='span'){
                if(e.target.innerHTML=='执行日志'){
                    this.downShowIndex=1;
                    this.resetClass(e,'.downWrap','span');
                }else if(e.target.innerHTML=='执行结果'){
                    this.downShowIndex=2;
                    this.resetClass(e,'.downWrap','span');
                }
            }
        },
        /*当前项样式切换*/
        resetClass(e,el,curChild){/*e鼠标事件、el父元素、curchild要找的子元素*/
            var oUl=document.querySelector(el);
            var aLi=oUl.getElementsByTagName(curChild);
            for(var i=0;i<aLi.length;i++){
                aLi[i].className='';
            }
            e.target.className="active";
        },
        /*点击出表结构*/
        showNewTab(id){
            this.$refs.newTabBox.$emit('getTabData',id);
            this.newTabShow=1;
        },
        /*点击保存按钮*/
        showCeatSql(){
            this.saveShow=1;
            this.$refs.saveId.$emit('emputyName');
        },
        /*点击弹框的保存按钮*/
        saveSqlNameFn(conName){
            this.saveShow=0; 
            var aTextarea=document.querySelectorAll('.textareaClass');
            this.sqlText=aTextarea[this.curShow].value;
            this.vcRwmc='';
            var url=encodeURI('biPc/selfAnaPlatform/saveSqlText.gm?vcRwmc='+conName+'&sqlText='+this.sqlText);
            this.$http.get(url).then(function(res){
                if(res.data.code=='200'){
                    this.saveShow=0;
                    this.sqlNameAry=this.sqlNameAry.map((item,index)=>{
                        if(index==this.curShow){
                            item.name=conName+'.sql';
                        }
                        return item;
                    });
                    this.showIndex=2;
                    this.changeResData();
                }else{
                    this.saveShow=1;
                    this.$refs.saveId.$emit('addError',res.data.msg);
                }
            });  
        },
        /*查询  查询管理*/
        changeResData(curpage){
            if(typeof curpage =='object'){//点击查询按钮
                this.form3CurrentPage=1;
                this.$refs.newSelect2.$emit('urlChange');
            }else if(typeof curpage =='undefined'){//保存按钮 
                this.form3CurrentPage=1;
                this.$refs.newSelect2.$emit('urlChange');
            }else{//点击分页
                this.form3CurrentPage=curpage;
            }
            
            this.$http.get('biPc/selfAnaPlatform/listSqlText.gm?vcRwmc='+this.vcRwmc+'&page='+this.form3CurrentPage+'&rows=15').then(function(res){
                if(res.data.code=='200'){
                    this.selectListData=res.data.data.dataInfo.info;
                    this.form3CurrentPage=res.data.data.dataInfo.page;
                    this.form3conCount=res.data.data.dataInfo.totalRows;//分页  3表总条数
                    this.form3pageCount=res.data.data.dataInfo.totalPages;//分页  3表总页数
                }
            })
        },
        changePageFn3(res){
            this.changeResData(res);   
        },
        /*删除查询列表 查询管理*/
        deleteList(id){
            this.$http.get('biPc/selfAnaPlatform/deleteSqlText.gm?nId='+id).then(function(res){
                if(res.data.code=='200'){
                    this.changeResData();
                }
            })
        },
        hideMarkWrap(){
            this.saveShow=this.newTabShow=this.noSelectP=0;
        },
        /*添加sql*/
        addSql(){
            /*if(this.sqlNameAry.length>=9){
                this.noSelectP=1;
                return;
            }*/
            var obj={};
            obj.name='新建查询'+this.n+'.sql';
            obj.con='',
            this.sqlNameAry.push(obj);
            this.n++;
            /*得到要显示的内容索引*/
            this.curShow=this.sqlNameAry.length-1;
            this.$nextTick(function(){
                var aTextarea=document.querySelectorAll('.textareaClass');
                this.sqlText=aTextarea[this.curShow].value;
            });  
        },
        /*sql选项卡切换*/
        changeSqlDivShow(index,e){/*得到内容索引  index*/
            this.selectedCon='';
            if(e.target.tagName.toLowerCase()=='i'){/*点击删除按钮*/
                /*
                1.找到当前点击的索引值，名称数组中删除此索引下的那一项
                2.下方 textarea按照存储名称的数组渲染的   删除后则会永远删除最后一项  如何解决??????    ----一个数组中存对象包含sql名与sql内容
                3.this.curShow当前显示选择  this.curShow-1
                */
                if(this.sqlNameAry.length>1){
                    this.sqlNameAry.splice(index,1);
                    this.curShow=this.curShow-1;
                    if(this.curShow==-1){
                        this.curShow=0;
                    }
                }
            }else{
                this.curShow=index;
                var aTextarea=document.querySelectorAll('.textareaClass');
                this.sqlText=aTextarea[index].value;
            }   
        },
        setSelectedCon(){
            this.selectedCon=window.getSelection().toString();
        },
        /*文本框内容变化  清空选中内容*/
        clearSelectedCon(){
            this.selectedCon='';
        },
        /*执行sql*/
        selectSql(){/*selectedCon：当前选中的值   sqlText:当前页面显示sql的文本框的值*/
            this.setTimes=0;
            var timer=setInterval(()=>{
                this.setTimes++;
            },1000);

            this.sqlResTabData=[];/*清空列表*/
            var aTextarea=document.querySelectorAll('.textareaClass');
            this.sqlText=aTextarea[this.curShow].value;
            /*如果没有选中，则默认查询当前显示的sql*/
            if(this.selectedCon==''){
                this.selectedCon=this.sqlText;
            }

            document.querySelector('#log').innerHTML='执行sql:\n'+this.selectedCon;
            this.seleSqling=true;/*白色透明遮罩 出*/
            this.downShowIndex=1;

            this.uuid=getUuid.getUuid();
            var url=encodeURI('biPc/selfAnaPlatform/excuteSql.gm?sqlText='+this.selectedCon+'&exId='+this.uuid);
            this.$http.get(url).then(function(res){
                clearInterval(timer);
                this.seleSqling=false;
                if(res.data.code=='200'){
                    this.exLog=res.data.data.dataInfo.exLog;
                    document.querySelector('#log').innerHTML='执行sql:\n'+this.selectedCon+this.exLog;

                    this.downShowIndex=2;
                    this.sqlResTabData=res.data.data.dataInfo.tableDataMx;
                }
                if(res.data.code=='BIPC0400001'||res.data.code=='sqlErr001'||res.data.code=='220'||res.data.code=='BIPC0400003'){
                    this.exLog=res.data.msg;
                    document.querySelector('#log').innerHTML='执行sql:\n'+this.selectedCon+'\n'+this.exLog;
                }
            },function(res){
                clearInterval(timer);
                if(res.status=='504'){
                    this.seleSqling=false;
                    document.querySelector('#log').innerHTML='执行sql:\n'+this.selectedCon+'\n'+'执行失败，服务器超时';
                }else if(res.status=='404'){
                    this.seleSqling=false;
                    document.querySelector('#log').innerHTML='执行sql:\n'+this.selectedCon+'\n'+'404 Not Found!';
                }
            })
        },
        /*end sql*/
        endSql(){
            this.seleSqling=false;/*白色透明遮罩 隐藏*/
            var aTextarea=document.querySelectorAll('.textareaClass');
            this.sqlText=aTextarea[this.curShow].value;
            var url=encodeURI('biPc/selfAnaPlatform/endSql.gm?sqlText='+this.sqlText+'&exId='+this.uuid);
            this.$http.get(url).then(function(res){
                if(res.data.code=='200'){
                    document.querySelector('#log').innerHTML='执行sql:\n'+this.sqlText+'\n已终止执行';
                }
            })
        },
        /*下载*/
        downRes(){
            var url=encodeURI('biPc/selfAnaPlatform/exportSqlResult.gm?sqlText='+this.sqlText);
            window.location.href=url;
        },
    },
}
</script>

