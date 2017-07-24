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
/*const Index = resolve => require(['./views/index/indexMain.vue'], resolve);
const businessLine = resolve => require(['./views/businessLine/businessLine.vue'], resolve);
const taTable = resolve => require(['./views/businessLine/commonTab/tbTable.vue'], resolve);*/



const router = new VueRouter({
    /*mode: 'history',*/
    // base: baseUrl,
    hashbang:true,//路径已#/开头  防止刷新报404
    history:true,
    linkActiveClass:'active',//当前页的选中状态
    routes: [
        { path: '/', redirect: '/index'},
        { path: '/index',component: Index},
        {
            path:'/businessLine',component:businessLine,
            children:[
                { path:'commonTab/tbTable',component:taTable},
                { path:'commonTab/urgeMoney',component:urgeMoney}
            ]
        }
    ]
})

var myVue=new Vue({
    el: '#app',
    router:router,
    components: { App },
});

Vue.http.interceptors.push(function(request, next) {
    myVue.$refs.app.$emit('toggleLoading',true);
    next(function(response) {
        //console.log(response);
        myVue.$refs.app.$emit('toggleLoading',false);
        if(response.status=='504'||response.status=='404'){
            myVue.$refs.app.$emit('showOverTime');
        }
        if(response.status==200){

            if(response.body.code==203||response.body.code==undefined){
                window.location.href='login.html';
            }else if(response.body.code==200){

            }else {
                myVue.$refs.app.$emit('showOverTime',response.body.msg);
            }
        }
        return response;
    });
});