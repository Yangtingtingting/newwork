<!-- 组件说明 -->
<template>
    <div class="haveheaderbar">
        <headerbar :title="'充值记录'" :ifgocenter="false"></headerbar>
       
        <div class="historylist">
            <div class="li" v-for="(item,index) in pagelist" :key="index" @click="goto('paydetails',item)">
                <p v-if="false">充值</p>
                <img v-if="false" src="@/assets/imgs/purse/canclebtn.png">
                <ul>
                    <li>
                        <span>数量</span>
                        <span>{{item.amount}}</span>
                        <!-- <span>-1233123.99</span> -->
                    </li>
                    <li>
                        <!-- <span>状态</span> -->
                        <span>货币类型</span>
                        <span>{{item.coin}}</span>
                    </li>
                    <li>
                        <span>时间</span>
                        <span>{{item.ctime}}</span>
                    </li>
                </ul>
            </div>
            <div v-if="pagelist.length==0" class="nodata">暂无正在进行的充提记录</div>
        </div>
    </div>
</template>

<script>
    //import x from ''
    export default {
        components: {

        },
        data () {
            return {
                pagelist:[],
            };
        },
        computed: {

        },
        methods: {
            goto(name,data){
                sessionStorage.setItem('payhistoryli',JSON.stringify(data));
                this.$router.push({
                    name,
                    // liid:data.id
                })
            },
            get_walletrechargerecord(){
                let zs = this;
                this.$toast.loading({
                    duration:0,
                    forbidClick:true,
                })
                this.api.bussiness.get_walletrechargerecord().then(res=>{
                    zs.$toast.clear();
                    if(res.data.code===0){
                        zs.pagelist=res.data.data;
                    }else{
                        zs.$toast(res.data.msg)
                    }
                })
            }
        },
        mounted() {
            this.get_walletrechargerecord();
        },
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang='less' scoped>
@import url("./../../../assets/css/common.less");
.haveheaderbar{
    .historylist{
        // min-height: calc(100vh - 7.88rem);
        min-height: calc(100vh - 0.88rem);
        background-color: #fff;
        padding:0 0.25rem 0.4rem;
        position: relative;
        .li{
            position: relative;
            padding-top: 0.4rem;
            border-bottom:2px solid rgba(204, 203, 203, 1);
            &:first-child{
                padding-top:0.46rem;
            }
            &>p{
                font-size: 0.36rem;
                color:rgba(0, 0, 0, 1);
                font-weight: bold;
                margin-bottom: 0.26rem;
            }
            &>img{
                position: absolute;
                right: 0.48rem;
                bottom:1.24rem;
                height: 0.32rem;
                cursor: pointer;
            }
            ul{
                display: flex;
                justify-content: space-between;
                li{
                    span{
                        color:rgba(99, 97, 97, 1);
                        font-weight:bold;
                        font-size:0.24rem;
                        display: block;
                        text-align:center;
                        line-height:0.57rem;
                    }
                }
            }
        }
        .nodata{
            height:calc(100vh - 0.88rem);
            line-height:calc(100vh - 0.88rem);
            width:100%; 
            color:rgba(0, 0, 0, 1);
            font-weight: bold;
            font-size:0.36rem;
            position: absolute;
            left: 0;
            top:0;
            background-color: #fff;
            text-align: center;
        }
    }
}
</style>