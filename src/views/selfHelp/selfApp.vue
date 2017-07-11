<template>
    <div>
        <headerSelf></headerSelf>
        <router-view></router-view>
        <loading v-show="showLoading"></loading>
    </div>
</template>

<script>
import headerSelf from '../../components/headerSelfHelp';
import loading from '../../components/loadings.vue';
export default {
    data(){
        return{
            showLoading:false,
        }
    },
    created() {
        this.$on('toggleLoading', (show) => {
            this.showLoading = show;
        });
        this.$on('showOverTime', (con)=> {
            this.noSelectT=1;
            if(con){
                this.con=con;
            }
        })
    },
    components:{
        headerSelf,
        'loading':loading,
    },
    methods:{
        hideMarkWrap(){
            this.noSelectT=0;
            this.con='请求超时';
        }
    }
}
</script>

