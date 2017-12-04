<template>
    <header class="container" id="header">
        <a href="/#/index" class="left logo">自助分析平台</a>
        <div class="right headRight">
            <!--<div class="headerIcon">
                <img src="../assets/images/_header.png" >
            </div>-->
            <span class="headerUserName">{{userName}}</span>
            <div class="layoutIcon" @click="logoutFn($event)">退出</div>
        </div>
        <div class="nav">
            <!--<router-link to="/selfIndex">首页</router-link>-->
            <router-link to="/dataFactory">数据工厂</router-link>
            <!--<a href="/selfHelp.html#/selfIndex">首页</a>
            <a href="/selfHelp.html#/dataFactory">数据工厂</a>
            <a href="#">任务管理</a>
            <a href="#">数据管理</a>
            <a href="#">我的报表</a>-->
        </div>
    </header>
</template>
<style scoped lang="less">
    header{
        overflow: hidden;
    }
    .logo{
        display: inline-block;
        width: 120px;
        color:#03bbff;
        font-size: 20px;
        background: none;
        margin: 16px 0 0 5px;
    }
    .nav{
        padding:0 250px;
        text-align: center;
        box-sizing: border-box;
        a{
        display: inline-block;
        height: 35px;
        line-height: 35px;
        padding: 12px 5px 0 5px;
        margin: 0 20px;
        opacity: 0.8;
        font-size: 16px;
        color: #FFFFFF;
        }
        a:hover,a.active{
        opacity: 1;
        border-bottom: 1px #fff solid;
        }
    }
</style>
<script type="text/ecmascript-6">
    require('../assets/css/reset.min.less');
    require('../assets/css/layout.less');
    export default {
        data () {
            return {
                userName:'',
            }
        },
        components:{

        },
        mounted(){
            this.userName=localStorage.userName;
        },
        methods:{
            logoutFn(e){
                if(e.target.innerHTML=='退出'){
                    this.$http.get('/biPc/login/logout.gm').then(function (res) {
                        if(res.data.code==200){
                            window.location.href='/login.html';
                        }
                    })
                }
            },
        }
    }
</script>

