<template>
    <div class="leftSide">
        <ul class="menuTop clearfix" @click="changeNav($event)">
            <li v-for="(item,index) in resDate" :key="index" :class="menuShow==(index+1)?'active':''"><span :class="index==0?'mycenter':'comLine'">{{item.name}}</span></li>
            <!--<li class="active"><span class="comLine">{{businessName}}</span></li>-->
        </ul>
        <ul class="navMenu" v-show="menuShow==1" v-if="businessMenu">
            <li v-for="(item,index) in businessMenu" :key="index">
                <a class="newPageLink" :href="'/'+item.href" target="_blank">{{item.name}}</a>
            </li>
        </ul>
        <ul class="navMenu" v-show="menuShow==2" v-if="mainMenu">
            <li v-for="(item,index) in mainMenu" :key="index">
                <span class="firstLi active">{{item.name}} <i></i></span>
                <ul class="nextCom">
                    <li class="routerLi" v-for="(secItem,secindex) in item.children" :key="secindex">
                        <router-link :to="secItem.href" :key="secindex">{{secItem.name}}</router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<style scoped lang='less'>

</style>
<script type="text/ecmascript-6">
    export default {
        data(){
            return{
                resDate:[],
                businessMenu:[],
                mainMenu:[],
                businessName:'',
                menuShow:1,
                userName:'',
            }
        },
        mounted(){
            this.$nextTick(function(){
                this.getMenu();
            })
        },
        methods:{
            getMenu(){
                this.getLocal();
                this.$http.get('biPc/login/getMenus.gm?userName='+this.userName).then(function(res){
                    if(res.data.code=='200'){
                        this.resDate=res.data.data.dataInfo[0].children;
                        if(this.resDate[0]){
                            this.businessName=this.resDate[0].name;
                            this.businessMenu=this.resDate[0].children;
                        }
                        if(this.resDate[1]){
                            this.menuShow=2;
                            this.mainMenu=this.resDate[1].children;
                        }
                    }
                });
            },
            changeNav(e){
                if(e.target.innerHTML=='主页'&&e.target.tagName.toLowerCase()=='span'){
                    this.menuShow=1;
                    //this.resetClass(e);
                }else if(e.target.tagName.toLowerCase()=='span'){
                    this.menuShow=2;
                    //this.resetClass(e);
                }
            },
            resetClass(e){
                var oUl=document.querySelector('.menuTop');
                var aLi=oUl.getElementsByTagName('li');
                for(var i=0;i<aLi.length;i++){
                    aLi[i].className='';
                }
                e.target.parentNode.className="active";
            },
            getLocal(){
                this.userName=localStorage.userName;
            }
        }
    }
</script>
