import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router'
Vue.use(VueResource);
Vue.use(VueRouter);

import self from './views/selfHelp/selfApp.vue';
import selfIndex from './views/selfHelp/selfIndex.vue';
import dataFactory from './views/selfHelp/dataFactory.vue';

const router2 = new VueRouter({
    hashbang:true,//路径已#/开头  防止刷新报404
    history:true,
    linkActiveClass:'active',//当前页的选中状态
    routes: [
        /*{   path: '/', component:self,
            children:[
                { path:'/selfIndex',component:selfIndex}
            ]
        },*/
        {  path: '/', redirect:'/dataFactory'},
        {  path: '/selfIndex', component:selfIndex},
        {  path: '/dataFactory', component:dataFactory},
        /*{ path: '/index',component: Index,redirect: '/businessLine/commonTab/tbTable'},
        {
            path:'/businessLine',component:businessLine,
            children:[
                { path:'commonTab/tbTable',component:taTable}
            ]
        }*/
    ]
})
var myVue=new Vue({
    el: '#selfApp',
    router:router2,
    components: { self },
})

Vue.http.interceptors.push(function(request, next) {
    
    if(request.url.indexOf('listTableMx')==-1&&request.url.indexOf('excuteSql')==-1){
        myVue.$refs.mySelf.$emit('toggleLoading',true);
    }
    next(function(response) {
        //console.log(response);
        myVue.$refs.mySelf.$emit('toggleLoading',false);
        if(response.status=='504'||response.status=='404'){
            myVue.$refs.mySelf.$emit('showOverTime');
        }
        if(response.status==200){

            if(response.body.code==203||response.body.code==undefined){
                window.location.href='login.html';
            }else if(response.body.code==200){

            }else {
                myVue.$refs.mySelf.$emit('showOverTime',response.body.msg);
            }
        }
        return response;
    });
});