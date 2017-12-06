<template>
    <section class="mainApi">
        图表渲染
        <div v-for="(curP,index) in resData" :key="index">
            <!--<input :value="curP" @input="param[index] = $event.target.value" />{{curP}}-->
            <label>{{curP.valueCn}}：</label>
            <input v-if="curP.control==1" type="text" :value="curP.defaultValue.replace(/\|\|/g,' 至 ')" @input="param[curP.key] = $event.target.value" :id="curP.key">
            <select v-if="curP.control==2" @change="param[curP.key] = $event.target.value">
                <option v-for="(curOp,sxIndex) in curP.sxwds" :key="sxIndex" :value="curOp.key">{{curOp.value}}</option>
            </select>
        </div>
        <input type="button" value="点击" @click="getParam">
    </section>
</template>
<script>
    import * as laydate from '../../assets/laydate/laydate.js'; //日历插件
    require('../../assets/laydate/theme/default/laydate.css');//日历样式
    export default {
        data(){
            return{
                resData:[],
                param:{},
            }
        },
        mounted(){
            this.setParam();
        },
        methods:{
            /*得到返回信息  获取参数对象*/
            setParam(){
                this.$http.get('/configReport/dimension.gm?configReportBm=001').then(function(res){
                    if(res.data.dimensionBOs){
                        this.resData=res.data.dimensionBOs;
                        this.$nextTick(function(){
                            this.resData.forEach((item)=> {
                                //得到查询参数列表
                                for(var key in item){
                                    if(key=='key'){
                                        this.param[item[key]]=item["defaultValue"];
                                    }
                                }
                                //渲染日历组件
                                if(item.control==1){//时间类型
                                    if(item.controlType==1){//时间区间  item.key为日历id及参数名  item.defaultValue：默认值
                                        this.showCalendar(item.key,item.defaultValue);
                                    }else if(item.controlType==2){//单个时间
                                        this.showBaseCanlender(item.key,item.defaultValue);
                                    }
                                }
                            });
                        })
                    }
                })
            },
            getParam(){
                console.log(JSON.stringify(this.param));
            },
            showCalendar(id,val){//日历 区间  id==key
                var _this=this;
                laydate.render({
					elem: '#'+id,
					theme: '#03BBFF',
					range: '至',
					value: val,
					min: '2017-12-01',
					max: '2018-04-01',
					done: function(value,date){
						_this.param[id] = value;
					}
				})
            },
            showBaseCanlender(id,val){//日历  单个
                var _this=this;
                laydate.render({
					elem: '#'+id,
					theme: '#03BBFF',
					value: val,
					btns: ['confirm'],
					min: '2017-02-01',
					max: '2018-04-01',
					done: function(value,date){
						_this.param[id] = value;
					}
				})
            }
        }
    }
</script>
<style lang="less" scoped>
    .mainApi{
        padding-top: 60px;
    }
</style>
