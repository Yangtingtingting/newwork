<!-- 组件说明 -->
<template>
    <!-- <div class="haveheaderbar"> -->
    <div class="haveheaderbar havebottombar">
        <headerbar :title="'钱包'" :ifgocenter="true"></headerbar>
        <div class="p">
            总账户资产折合（VPN）
        </div>
        <div class="totalbox">
            {{total_vpn_value}} ≈ {{Number(total_cny_value).toFixed(2)}} CNY
        </div>
        <!-- <div class="entrybox" v-if="false">
            <img src="@/assets/imgs/purse/tibi.png" @click="goto('dissaving')">
            <img src="@/assets/imgs/purse/chongzhi.png" @click="goto('pay')">
            <img src="@/assets/imgs/purse/shandui.png" @click="goto('flashexchange')">
        </div> -->
        <div class="historylist">
            <div class="li" v-for="(item,index) in walletinfo" :key="index">
                <!-- <p>充值</p> -->
                <p>
                    <span>{{item.coin}}</span>
                    <span v-if="item.coin=='ETH'" class="hjb" @click.stop="ETHgoto('flashexchange',{coindata:JSON.stringify(item)})">核聚变</span>
                    <img src="@/assets/imgs/common/gonext2.png" @click.stop="goto('pursecoinindex',{coindata:JSON.stringify(item)})">
                </p>
                <!-- <img @click="goto('pursecoinindex',{coindata:JSON.stringify(item)})" src="@/assets/imgs/common/gonext2.png"> -->
                <ul class="clearfix">
                    <li>
                        <span>可用</span>
                        <span>{{item.balance}}</span>
                    </li>
                    <li>
                        <span>冻结</span>
                        <span>{{item.frozen}}</span>
                    </li>
                    <li>
                        <span>折合（CNY）</span>
                        <span>{{Number(item.cny_value).toFixed(2)}}</span>
                    </li>
                </ul>
            </div>
            <!-- <div v-if="walletwithdrawrecordlist.length==0" class="nodata">暂无提币记录</div> -->
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
                walletinfo:[
                    {
                        balance:0,
                        coin:'',
                        froze:'',
                        user_id:'',
                    }
                ],
                walletinfo_index:0,
                walletwithdrawrecordlist:[],//提现记录
                total_cny_value:0,
                total_vpn_value:0,
            };
        },
        computed: {

        },
        methods: {
            ETHgoto(name,querydata){
                this.$router.push({
                    name,
                    // query:{
                    //      coin:'ETH',
                    //      coindata:querydata
                    // },
                    query:querydata
                })
            },
            goto(name,querydata){
                this.$router.push({
                    name,
                    query:querydata
                })
            },
            // 获取资产信息
            get_walletinfo(){
                let zs = this;
                this.$toast.loading({
                    duration:0,
                    forbidClick:true,
                })
                this.api.bussiness.get_walletinfo().then(res=>{
                    zs.$toast.clear();
                    if(res.data.code===0){
                        zs.walletinfo = res.data.data;
                        zs.total_cny_value = res.data.total_cny_value;
                        zs.total_vpn_value = res.data.total_vpn_value;
                    }else{
                        zs.$toast(res.data.msg);
                    }
                })
            },
            get_walletwithdrawrecord(){
                let zs = this;
                this.$toast.loading({
                    duration:0,
                    forbidClick:true,
                })
                this.api.bussiness.get_walletwithdrawrecord().then(res=>{
                    zs.$toast.clear();
                    if(res.data.code===0){
                        zs.walletwithdrawrecordlist = zs.walletwithdrawrecordlist.concat(res.data.data);
                    }else{
                        zs.$toast(res.data.msg);
                    }
                })
            }
        },
        mounted() {
            this.get_walletinfo();
            this.get_walletwithdrawrecord();
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
    .logo{
        width: 0.79rem;
        height:0.79rem ;
        padding:0.5rem 0 0.16rem;
        margin:0 auto;
    }
    &>.p{
        // font-size: 0.18rem;
        // line-height: 0.25rem;
        font-size: 0.35rem;
        line-height: 0.5rem;
        color: rgba(255, 255, 255, 1);
        font-weight: 0.5rem;
        text-align: left;
        // padding:0.3rem 0 0.04rem 0.21rem;
        padding:0.60rem 0 0.08rem 0.42rem;
        font-weight:bold;
    }
    .totalbox{
        padding: 0 0.42rem 0.4rem;
        font-size: 0.36rem;
        line-height: 0.5rem;
    }
    .entrybox{
        padding:0  0.54rem 0.38rem;
        display: flex;
        justify-content: space-between;
        img{
            cursor: pointer;
            height:0.5rem;
        }
    }
    .historylist{
        // min-height: calc(100vh - 0.88rem - 1.92rem - 3.32rem);
        // min-height: calc(100vh - 0.88rem - 0.52rem - 3.25rem);
        min-height: calc(100vh - 0.88rem - 0.5rem - 3.25rem);
        background-color: #fff;
        padding:0 0.25rem 0.4rem;
        box-sizing: border-box;
        position: relative;
        .li{
            position: relative;
            padding-top: 0.4rem;
            border-bottom:2px solid rgba(204, 203, 203, 1);
            cursor: pointer;
            &:first-child{
                padding-top:0.46rem;
            }
            &>p{
                font-size: 0.36rem;
                line-height: 0.5rem;
                height: 0.5rem;
                color:rgba(0, 0, 0, 1);
                font-weight: bold;
                margin-bottom: 0.26rem;
                position: relative;
                &>img{
                    position: absolute;
                    right: 0.64rem;
                    bottom:0.13rem;
                    height: 0.24rem;
                    cursor: pointer;
                }
                &>span{
                    height: 0.5rem;
                    line-height: 0.5rem;
                    display: inline-block;
                    cursor: pointer;
                    &.hjb{
                        font-size: 0.26rem;
                        // color:#ccc;
                        color:#646566;
                        margin-left:0.2rem;
                    }
                }
            }
            ul{
                // display: flex;
                // justify-content: space-between;
                li{
                    float: left;
                    width:33.333%;
                    text-align:left;
                    &:last-child{
                        text-align: right;
                    }
                    span{
                        color:rgba(99, 97, 97, 1);
                        font-weight:bold;
                        font-size:0.24rem;
                        display: block;
                        line-height:0.57rem;
                    }
                }
            }
        }
        .nodata{
            height:calc(100vh - 7.88rem);
            line-height:calc(100vh - 7.88rem);
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