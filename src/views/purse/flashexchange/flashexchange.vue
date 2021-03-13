<!-- 组件说明 -->
<template>
    <div class="haveheaderbar">
        <headerbar :title="coindata.coin=='ETH'?'核聚变':'闪兑'" :ifgocenter="false"></headerbar>
        <div class="topcontnt">
            <img class="toplj" src="@/assets/imgs/purse/tiao_bai.png">
            <div class="left">
                <img class="coin" :src="coindata.coin_icon">
                <p>{{coindata.coin}}</p>
                <img v-if="coindata.coin!='ETH'" @click="selectdomstatus=true;" class="select" src="@/assets/imgs/purse/selectmore.png">
                <input
                class="numberbox"
                type="number" 
                v-numdybinding="0"
                v-numxybinding="coindata.balance"
                :disabled="coindata.balance==0" 
                v-model.number.lazy="number" 
                :title="'最大值为'+coindata.balance"
                placeholder="数量">
            </div>
            <div class="right">
                <img class="coin" src="@/assets/imgs/purse/purselogo.png">
                <p>{{to}}</p>
                <!-- <input v-model="{number*(coinabout.ratio)}" class="numberbox" disabled type="targetnumber"> -->
                <div class="input numberbox">{{(number*(coinabout.ratio)).toFixed(2)}}</div>
            </div>
            <div class="clearit"></div>
            <div @click="confirmexchange" class="confirmbtn">确定</div>
            <div class="tips">
                <p>参考汇率</p>
                <span>1 {{coinabout.name}} ≈ {{coinabout.ratio}}{{to}}</span>
            </div>
        </div>
        <div class="bottomcontnt">
            <div class="title">币种兑换记录</div>
            <div class="tntli" v-for="(item,index) in exchangerecordlist" :key="index">
                <div class="tntlitop">
                    <p>汇率 {{item.price}}</p>
                    <span class="time">{{item.ctime}}</span>
                </div>
                <div class="tntlibottom">
                    <div class="left">
                        <div>
                            <img :src="item.coin_icon">
                            <span>{{item.from_coin}}</span>
                        </div>
                        <p>{{item.from_amount}}</p>
                    </div>
                    <div class="right">
                        <div>
                            <img src="@/assets/imgs/purse/redlogo.png">
                            <span>{{item.to_coin}}</span>
                        </div>
                        <p>{{item.to_amount}}</p>
                    </div>
                    <img class="centerlj" src="@/assets/imgs/purse/tiao_hei.png">
                </div>
            </div>
            <div @click="morebtnclick" class="morebtn" v-if="bottommore">点击加载更多</div>
            <div class="morebtn" v-if="!bottommore">暂无更多数据</div>
        </div>
        <div v-if="selectdomstatus" class="topfixedwrap" @click.stop="selectdomstatus=false">
            <div class="topfixed" @click.stop="returnfalse">
                <p>选择币种</p>
                <div class="listbox clearfix">
                    <p @click.stop="cointypeindex=index" :class="{select:index==cointypeindex}" v-for="(item,index) in coinlist" :key="index">
                        <!-- {{index}} -->
                        {{item.coin}}
                    </p>
                </div>
                <img class="topfixedwrapbtn" @click.stop="coinconfirm" src="@/assets/imgs/purse/confirmbtn2.png">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {

        },
        data () {
            return {
                maxnumber:0,
                number:'',
                to:'VPN',
                // fee 提币手续费
                // id
                // name
                // min_withdraw  最小提币数量
                // ratio 兑换VPN的比例， 例如 name = BTC, ratio = 9311 表示 1 BTC = 9311 VPN

                // bizhongabout:'',//所以的币种 信息

                cointypeindex:'',

                coindata:'',//个人的当前币种的 资产信息
                coinlist:[],//所有的财产信息
                coinabout:'',//当前 币种的信息 费用相关的一些数据
                coinaboutlist:[],//所有币种的信息 费用相关的一些数据

                selectdomstatus:false,
                pagenumber:1,
                exchangerecordlist:[],//闪兑记录 列表
                bottommore:false,//是否还有更多数据
            };
        },
        watch:{
            // cointypeindex(newval,oldval){
            //     this.coindata=this.coinlist[newval]
            // }
        },
        computed: {

        },
        methods: {
            morebtnclick(){
                this.pagenumber=this.pagenumber+1;
                this.get_walletexchangerecord();
            },
            returnfalse(){
                return false;
            },
            confirmexchange(){
                let zs = this;
                this.$toast.loading({
                    duration:0,
                    forbidClick:true,
                })
                this.api.bussiness.post_walletexchange({
                    from:zs.coindata.coin,
                    to:zs.to,
                    amount:zs.number,
                }).then(res=>{
                    zs.$toast.clear();
                    if(res.data.code===0){
                        zs.$toast('兑换操作成功');
                    }else{
                        zs.$toast(res.data.msg);
                    }
                })
                
            },
            coinconfirm(){
                let zs = this;
                this.coindata=this.coinlist[this.cointypeindex];
                zs.coinabout = zs.coinaboutlist.filter((item)=>{
                    return item.name==zs.coindata.coin;
                })[0];
                this.selectdomstatus= false;
            },
            // 支持的币种列表
            get_walletcoin(){
                let zs = this;
                this.$toast.loading({
                    duration:0,
                    forbidClick:true,
                })
                this.api.bussiness.get_walletcoin().then(res=>{
                    zs.$toast.clear();
                    if(res.data.code===0){
                        let resdata = res.data.data;
                        zs.coinaboutlist = res.data.data;
                        zs.coinabout = resdata.filter((item)=>{
                            return item.name==zs.coindata.coin;
                        })[0];
                    }else{
                        zs.$toast(res.data.msg);
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
                        zs.coinlist = res.data.data;
                    }else{
                        zs.$toast(res.data.msg);
                    }
                })
            },
            // 获取 闪兑记录
            get_walletexchangerecord(){
                let zs = this;
                this.$toast.loading({
                    duration:0,
                    forbidClick:true,
                })
                this.api.bussiness.get_walletexchangerecord({
                    page:this.pagenumber,
                    count:20,
                }).then(res=>{
                    zs.$toast.clear();
                    if(res.data.code===0){
                        zs.exchangerecordlist = zs.exchangerecordlist.concat(res.data.data);
                        
                        if(zs.exchangerecordlist.length<res.data.total){
                            zs.bottommore=true;
                        }else{
                            zs.bottommore=false;
                        }
                    }else{
                        zs.$toast(res.data.msg);
                    }
                })
            },
        },
        mounted() {
            this.coindata=JSON.parse(this.$route.query.coindata);
            this.get_walletcoin();//获取 支持的币种列表
            this.get_walletinfo();//获取 用户的所有财产信息
            this.get_walletexchangerecord();
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
    .topcontnt{
        padding:0.4rem 0.4rem 0.52rem;
        position: relative;
        font-size: 0.36rem;
        color: #fff;
        font-weight:bold;
        .left,.right{
            float: left;
            display: flex;
            flex-wrap: wrap;
            width: 2.2rem;
            position: relative;
            .coin{
                width: 0.72rem;
                height:1.14rem;
                object-fit:contain;
            }
            .select{
                width: 0.2rem;
                height:0.14rem;
                object-fit:contain;
                cursor: pointer;
                padding: 0.1rem;
                position: absolute;
                right: 0;
                top: 0.57rem;
                transform: translateY(-50%);
            }
            p{
                height:1.14rem;
                line-height:1.14rem;
                margin-left: 0.2rem
            }
            input,.input{
                width: 2.2rem;
                height: 0.74rem;
                border: 1px solid rgba(255, 255, 255, 1);
                border-radius: 0.12rem;
                box-sizing: border-box;
                background-color: transparent;
                padding: 0.1rem;
                line-height: calc(0.54rem - 2px);
                text-align: center;
                font-size:0.28rem;
            }
            .numberbox{
                margin:0.26rem auto 0;
            }
        }
        .right{
            float: right;
        }
        // &::after{
        //     content: '';

        //     position: absolute;
        //     left: 50%;
        //     top: 1.9rem;
        //     transform: translateX(-50%);
        // }
        .toplj{
            position: absolute;
            left: 50%;
            top: 2rem;
            transform: translateX(-50%);
            height:0.32rem;
            width:0.62rem;
            object-fit: contain;
        }
        .confirmbtn{
            width: 6.74rem;
            height: 0.74rem;
            line-height: 0.74rem;
            border-radius: 0.12rem;
            background-color: #fff;
            font-size: 0.28rem;
            color: rgba(0, 0, 0, 1);
            font-weight: bold;
            margin: 0.4rem auto 0;
            cursor: pointer;
            text-align: center;
        }
        .tips{
            padding:0.2rem 0 0;
            p{
                font-size:0.2rem;
                color:rgba(255, 255, 255, 1);
                line-height:0.28rem;
                margin-bottom:0.04rem;
            }
            span{
                font-size:0.2rem;
                color:rgba(167, 167, 167, 1);
                line-height:0.28rem;
            }
        }
    }
    .bottomcontnt{
            background-color: #fff;
            min-height:calc(100vh - 6rem);
        .title{
            background-color: rgba(168, 168, 168, 1);
            color:#fff;
            font-size:0.2rem;
            padding:0 0.38rem;
            height:0.6rem;
            line-height:0.6rem;
            margin-bottom:0.16rem;
        }
        .tntli{
            padding: 0 0.3rem 0.04rem 0.7rem;
            // padding: 0 0.7rem 0.04rem;
            .tntlitop{
                text-align:center;
                font-size:0.24rem;
                color:rgba(175, 175, 175, 1);
                line-height:0.34rem;
                padding-bottom:0.22rem;
                position: relative;
                .time{
                    position: absolute;
                    right:0;
                    top:0;
                }
            }
            .tntlibottom{
                position: relative;
                display: flex;
                justify-content: space-between;
                .left,.right{
                    color: #000;
                    font-size:0.28rem;
                    &>div{
                        float: left;
                        img{
                            width:0.72rem;
                            height:0.72rem;
                            object-fit: contain;
                        }
                        span{
                            display: block;
                            margin-top:0.08rem;
                            line-height: 0.4rem;
                            text-align:center;
                        }
                    }
                    &>p{
                        float:left;
                        // width:2rem;
                        text-align:left;
                        height:0.72rem;
                        line-height:0.72rem;
                        font-weight:bold;
                        padding-left:0.24rem;
                        box-sizing:border-box;
                    }
                }
                .centerlj{
                    position: absolute;
                    bottom: 0.4rem;
                    left:50%;
                    transform: translateX(-50%);
                    width:0.62rem;
                    height:0.32rem;
                    object-fit: contain;
                }
            }
        }
    }
    .topfixedwrap{
        position: fixed;
        left: 50%;
        top: 0%;
        z-index: 1001;
        width: 7.5rem;
        transform: translateX(-50%);
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.7);
        .topfixed{
            position: absolute;
            left: 0%;
            top: 0%;
            background:#fff;
            width:100%;
            min-height:4.86rem;
            box-sizing:border-box;
            padding:0.4rem 0.5rem 1.55rem;
            &>p{
                font-size: 0.36rem;
                color:#000;
                font-weight: bold;
                line-height: 0.5rem;
                // margin-bottom: 0.44rem; 
            }
            .listbox{
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                p{
                    color:rgba(0, 0, 0, 1);
                    font-size: 0.28rem;
                    margin-right: 0.9rem;
                    line-height:1.52rem;
                    cursor: pointer;
                    &.select{
                        color: rgba(84, 12, 59, 1);
                        font-weight: bold;
                    }
                }
            }
            .topfixedwrapbtn{
                position: absolute;
                left: 50%;
                bottom:0.74rem;
                transform: translateX(-50%);
                cursor: pointer;
                height:0.74rem;
            }
        }
    }
    .morebtn{
        cursor:pointer;
        text-align:center;
        color:#000;
        padding:0.1rem 0;
    }
}
</style>