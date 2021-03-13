<!-- 组件说明 -->
<template>
    <!-- <div class="haveheaderbar"> -->
    <div class="haveheaderbar">
        <headerbar :title="pagedata.coin" :ifgocenter="false"></headerbar>
        <img class="logo" src="@/assets/imgs/purse/purselogo.png">
        <div class="p" v-if="walletinfo.length>0">
            {{pagedata.coin}}
            <!-- <select v-model="walletinfo_index">
                <option v-for="(item,index) in walletinfo" :key="index" :value="index">{{item.coin}}</option>
            </select> -->
        </div>
        <div class="totalbox">
            <div class="left">
                <p>可用</p>
                <span>{{Number(pagedata.balance).toFixed(2)}}</span>
            </div>
            <div class="right">
                <p>冻结</p>
                <span>{{Number(pagedata.frozen).toFixed(2)}}</span>
            </div>
        </div>
        <div class="entrybox">
            <P class="btn" @click="goto('dissaving')">提币</P>
            <P class="btn" @click="goto('pay')">充值</P>
            <P v-if="pagedata.coin!=='ETH'" class="btn" @click="goto('flashexchange')">闪兑</P>
            <!-- <img src="@/assets/imgs/purse/tibi.png" @click="goto('dissaving')">
            <img src="@/assets/imgs/purse/chongzhi.png" @click="goto('pay')">
            <img v-if="pagedata.coin!='ETH'" src="@/assets/imgs/purse/shandui.png" @click="goto('flashexchange')"> -->
            <P v-if="pagedata.coin=='ETH'" class="btn" @click="goto('flashexchange')">核聚变</P>
        </div>
        <div class="historylist">
            <div class="li" v-for="(item,index) in walletwithdrawrecordlist" :key="index">
                <!-- <p>充值</p> -->
                <p>[{{item.coin}}] 提币</p>
                <img src="@/assets/imgs/purse/canclebtn.png" v-if="false">
                <ul>
                    <li>
                        <span>数量</span>
                        <span>{{item.amount}}</span>
                        <!-- <span>-1233123.99</span> -->
                    </li>
                    <li>
                        <span>转态</span>
                        <!-- <span>8/12区块确认</span> -->
                        <span>{{item.status===0?'待审核':item.status===1?'已拒绝':item.status===2?'已完成':''}}</span>
                        <!-- <span>已完成</span> -->
                    </li>
                    <li>
                        <span>时间</span>
                        <span>{{item.ctime}}</span>
                    </li>
                </ul>
            </div>
            <div v-if="walletwithdrawrecordlist.length==0" class="nodata">暂无提币记录</div>
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

                pagedata:{
                    balance:0,
                    coin:'',
                    froze:'',
                    user_id:'',
                },//上一页带过来的页面数据
            };
        },
        computed: {

        },
        methods: {
            goto(name,querydata){
                this.$router.push({
                    name,
                    query:{
                         coin:this.pagedata.coin,
                         coindata:JSON.stringify(this.pagedata)
                    }
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
                this.api.bussiness.get_walletwithdrawrecord({

                }).then(res=>{
                    zs.$toast.clear();
                    if(res.data.code===0){
                        zs.walletwithdrawrecordlist = res.data.data;
                    }else{
                        zs.$toast(res.data.msg);
                    }
                })
            }
        },
        mounted() {
            // this.get_walletinfo();
            this.pagedata = JSON.parse(this.$route.query.coindata);
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
        font-size: 0.36rem;
        color: rgba(255, 255, 255, 1);
        font-weight: 0.5rem;
        text-align: center;
    }
    .totalbox{
        width:6.9rem;
        // margin:0.2rem auto 0.5rem;
        margin:0.2rem auto 0.68rem;
        display: flex;
        border-radius: 0.26rem;
        // background:linear-gradient(37deg,rgba(58, 8, 45, 1),rgba(13, 6, 67, 1));
        background:rgba(255,255,255,0.2);
        &>div{
            width: 50%;
            padding:0.5rem 0 0.34rem;
            p,span{
                text-align:center;
                display: block;
                font-size: 0.28rem;
                line-height: 0.4rem;
            }
        }
    }
    .entrybox{
        padding:0  0.54rem 0.38rem;
        display: flex;
        justify-content: space-between;
        img{
            cursor: pointer;
            height:0.5rem;
        }
        &>.btn{
            height: 0.5rem;
            width:1.794rem;
            border: 1px solid #fff;
            border-radius: 0.25rem;
            line-height: calc(0.5rem - 2px);
            text-align: center;
            cursor: pointer;
        }
    }
    .historylist{
        // min-height: calc(100vh - 7.88rem);
        min-height: calc(100vh - 6.5rem);
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