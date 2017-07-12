<template>
    <div class="sixWrap">
        <div class="sixDiv">
            <h3>金控驾驶舱</h3>
            <p>

            </p>
        </div>
        <div class="sixDiv">
            <h3>金控驾驶舱</h3>
            <p>

            </p>
        </div>
        <div class="sixDiv">
            <h3>金控驾驶舱</h3>
            <p>

            </p>
        </div>
        <div class="sixDiv">
            <h3>金控驾驶舱</h3>
            <p>

            </p>
        </div>
        <div class="sixDiv">
            <h3>金控驾驶舱</h3>
            <p>

            </p>
        </div>
        <div class="sixDiv">
            <h3>金控驾驶舱</h3>
            <p>

            </p>
        </div>
    </div>
</template>
<style scoped lang="less">
.sixWrap{
    width: 100%;
    padding:70px 170px;
    box-sizing: border-box;
    display: flex;
    .sixDiv{
        flex: 1;
        background: #fff;
        border:1px #daeeff solid;
    }
}

</style>

<script type="text/ecmascript-6">
    export default {
        data(){
            return{
                
            }
        },
        components:{
            
        },
        mounted(){
            this.setHeight();
        },
        methods:{
            setHeight(){
                var sixWrap=document.querySelector('.sixWrap');
                sixWrap.style.height=document.documentElement.clientHeight-50+'px';
            }
        }
    }
</script>

