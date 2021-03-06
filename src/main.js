import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.use(VueResource);
Vue.use(VueRouter);

import App from './views/app.vue'


/*const Foo = resolve => require(['./Foo.vue'], resolve);*/
import Index from './views/index/indexMain.vue'
import businessLine  from './views/businessLine/businessLine.vue';
import taTable from './views/businessLine/commonTab/tbTable.vue';
import urgeMoney from './views/businessLine/commonTab/urgeMoney.vue';
import payTable from './views/businessLine/commonTab/payTable.vue';

import setTable from './views/setTable/tabConfig.vue';
import tabView from './views/setTable/tabView.vue';
import configList from './views/setTable/configList.vue';
/*const Index = resolve => require(['./views/index/indexMain.vue'], resolve);
const businessLine = resolve => require(['./views/businessLine/businessLine.vue'], resolve);
const taTable = resolve => require(['./views/businessLine/commonTab/tbTable.vue'], resolve);*/



const router = new VueRouter({
    mode:'history',
    linkActiveClass:'active',//当前页的选中状态
    routes: [
        { path: '/', redirect: '/index'},
        { path: '/index',component: Index},
        {
            path:'/businessLine',component:businessLine,redirect:to=>{
                var cc=localStorage.getItem('busLeftMenuRoute');
                return cc;
            },
            children:[
                { path:'commonTab/tbTable',component:taTable},/*推标报表*/
                { path:'commonTab/urgeMoney',component:urgeMoney},/*催收日常*/
                { path:'commonTab/payTable',component:payTable},/*三方支付*/
                { path:'commonTab/tabView' , component:tabView},/*配置报表路径*/
            ]
        },
        { path: '/setTable',component: setTable},
        { path: '/configList',component: configList},
    ]
})

var myVue=new Vue({
    el: '#app',
    router:router,
    components: { App },
    mounted () {
        this.$http.get('/biPc/login/getZxtMenus2.gm?nId=2').then(function(res){
            if(res.data.code=='200'){
                localStorage.setItem('busLeftMenuRoute',res.data.data.dataInfo[0].children[0].children[0].children[0].href);
            }
        })
    }
});
var reqNum=1,nextNum=1;
Vue.http.interceptors.push(function(request, next) {
    reqNum++;
    myVue.$refs.app.$emit('toggleLoading',true);
    next(function(response) {
        nextNum++;
        if(reqNum==nextNum){
            myVue.$refs.app.$emit('toggleLoading',false);
        } 
        if(response.status=='504'||response.status=='404'){
            myVue.$refs.app.$emit('showOverTime');
        }
        if(response.status==200){

            if(response.body.code==203||response.body.code==undefined){
                localStorage.clear();
                window.location.href='/login.html';
            }else if(response.body.code==200){

            }else {
                myVue.$refs.app.$emit('showOverTime',response.body.msg);
            }
        }
        return response;
    });
});