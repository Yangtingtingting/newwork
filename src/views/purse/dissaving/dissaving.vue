<!-- 组件说明 -->
<template>
    <div class="haveheaderbar havebottombar">
        <headerbar :title="'提币'" :ifgocenter="false" :rightentry="'提币记录'"></headerbar>
        <div class="center">
            <div class="liswrap">
                <div class="li">
                    <p>提币地址</p>
                    <input type="text" v-model="url" placeholder="输入或长按粘贴地址">
                </div>
                <div class="li">
                    <p>数量</p>
                    <!-- v-numdybinding="coinabout.min_withdraw" 
                    v-numxybinding="vpncandissavingtotal"  -->
                    <input type="number" 
                    v-numdybinding="coinabout.min_withdraw"
                    v-numxybinding="vpncandissavingtotal"
                    :disabled="iftb_all||vpncandissavingtotal-number<coinabout.min_withdraw" 
                    v-model.number.lazy="number" 
                    :placeholder="number<coinabout.min_withdraw?'可用数量低于最小提币数量'+coinabout.min_withdraw:'最小提币数量'+coinabout.min_withdraw">
                    <div class="typeselect">
                        <p @click="iftb_all=false" :class="{active:!iftb_all}">{{coindata.coin}}</p>
                        <p @click="iftb_all=true;number=vpncandissavingtotal;" :class="{active:iftb_all}">全部</p>
                    </div>
                    <div class="vpntips">
                        <p>可用{{vpncandissavingtotal-number}} {{coindata.coin}}</p>
                        <p>今日可提{{vpncandissavingtotal}} {{coindata.coin}}</p>
                    </div>
                </div>
                <div class="li">
                    <p>手续费</p>
                    <!-- <input type="number" v-model="sxf"> -->
                    <div v-if="number<coinabout.min_withdraw" class="inputshow">0</div>
                    <div v-if="number>=coinabout.min_withdraw" class="inputshow">{{coinabout.fee}}</div>
                    <!-- <div v-if="number>=coinabout.min_withdraw" class="inputshow">{{number*coinabout.fee}}</div> -->
                    <div class="typeselect typeselect2">
                        <p>{{coindata.coin}}</p>
                    </div>
                </div>
            </div>
            <div class="tips">
                <p>最小提币数量为: {{coinabout.min_withdraw}} {{coindata.coin}} 。</p>
                <p>为保障资金安全，我们会对提币进行人工审核，请耐心等待工作人员审核结果。</p>
                <p>请务必确认网络环境安全，防止信息被篡改或泄露。</p>
            </div>
        </div>
        <div class="bottom">
            <p v-if="number>=coinabout.min_withdraw">到账数量
                <span>{{number-coinabout.fee}} {{coindata.coin}}</span>
                <!-- <span>{{number-number*coinabout.fee}} {{coindata.coin}}[总-总*fee]</span> -->
            </p>
            <p v-if="number<coinabout.min_withdraw">
                <span v-if="number<coinabout.min_withdraw">可用数量低于最少提币数量 {{coinabout.min_withdraw}}</span>
            </p>
            <!-- <img @click="showsubmitiptsstatus=true;(number-(sxf=='暂无参考值或者接口'?0:sxf))>0?number-(sxf=='暂无参考值或者接口'?0:sxf):''" class="confirmbtn" src="@/assets/imgs/purse/confirmbtn.png"> -->
            <img  v-if="number>=coinabout.min_withdraw" @click="tibiconfirmfn" class="confirmbtn" src="@/assets/imgs/purse/confirmbtn.png">
            <img v-if="number!==0 && number<coinabout.min_withdraw" @click="$toast(`要提币的数量为0，请输入再试`)" class="confirmbtn" src="@/assets/imgs/purse/confirmbtn.png">
            <img v-if="number>0 && number<coinabout.min_withdraw" @click="$toast(`要提币的数量低于最少提币数量 ${coinabout.min_withdraw}`)" class="confirmbtn" src="@/assets/imgs/purse/confirmbtn.png">
        </div>
        <div class="submitwrap" v-if="false">
        <!-- <div class="submitwrap" v-if="showsubmitiptsstatus"> -->
            <img @click="showsubmitiptsstatus=false" src="@/assets/imgs/purse/close.png">
            <div class="phonecode">
                <img src="@/assets/imgs/purse/phonecode.png">
                <input type="number" v-model="phonecode" placeholder="请输入验证码">
                <img src="@/assets/imgs/login/sendcode.png">
            </div>
            <div class="pswdwrap">
                <img src="@/assets/imgs/purse/loginpswd.png">
                <input type="password" v-model="pswd" placeholder="请输入登录密码">
            </div>
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
                url:'',
                number:'',
                sxf:'暂无参考值或者接口',
                showsubmitiptsstatus:true,
                phonecode:'',
                pswd:'',

                iftb_all:false,
                vpncandissavingtotal:'',//可提现总额
                bizhongabout:[],//所有币种信息
                coinabout:'',//vpn币种信息

                coindata:'',

                numdyxybindingdata:''
            };
        },
        computed: {

        },
        methods: {
            // 提币 确认操作
            tibiconfirmfn(){
                if(this.url==''){
                    this.$toast('请输入提币地址再操作');
                    return;
                };
                if(this.amount==''){
                    this.$toast('请输入提币数量再操作');
                    return;
                };
                let zs = this;
                this.$toast.loading({
                    duration:0,
                    forbidClick:true,
                })
                this.api.bussiness.post_walletwithdraw({
                    coin:zs.coindata.coin,
                    amount:zs.number,
                    address:zs.url,
                }).then(res=>{
                    zs.$toast.clear();
                    if(res.data.code===0){
                        zs.$toast('申请成功,等待审核');
                    }else{
                        zs.$toast(res.data.msg);
                    }
                })
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
                        zs.bizhongabout = res.data.data;
                        zs.coinabout = resdata.filter((item)=>{
                            return item.name==zs.coindata.coin;
                        })[0];

                        // zs.numdyxybindingdata=JSON.parse({
                        //     big:zs.vpncandissavingtotal,
                        //     sm:zs.coinabout.min_withdraw,
                        // });
                    }else{
                        zs.$toast(res.data.msg);
                    }
                })
            },
        },
        mounted() {
            this.get_walletcoin();
            this.coindata = JSON.parse(this.$route.query.coindata);
            this.vpncandissavingtotal = this.coindata.balance;
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
    .center{
        min-height:calc(100vh - 2.68rem);
        background:#fff;
        .liswrap{
            padding:0 0.42rem;
            .li{
                padding: 0.9rem 0 0;
                border-bottom: 2px solid rgba(204, 203, 203, 1);
                position: relative;
                &>p{
                    font-size: 0.28rem;
                    color:rgba(99, 97, 97, 1);
                    font-weight:bold;
                    margin-bottom:0.3rem;
                }
                input{
                    height:0.44rem;
                    border:none;
                    outline: none;
                    color:rgba(172, 172, 172, 1);
                    font-size:0.24rem;
                    font-weight:bold;
                    width:100%;
                }
                .inputshow{
                    height:0.44rem;
                    color:rgba(172, 172, 172, 1);
                    font-size:0.24rem;
                    font-weight:bold;
                    width:100%;
                }
                .typeselect{
                    position: absolute;
                    right:0;
                    bottom:0;
                    padding-bottom:0.1rem;
                    background: #fff;
                    // transform: translateY(-50%);
                    color:rgba(172, 172, 172, 1);
                    display: flex;
                    // width:1.24rem;
                    width:1.7rem;
                    justify-content: space-between;
                    line-height: 0.34rem;
                    &::after{
                        content:'';
                        position: absolute;
                        right:50%;
                        top:50%;
                        transform:translate(-50%,-50%);
                        width:1px;
                        height:0.3rem;
                        background:rgba(172, 172, 172, 1);
                    }
                    p{
                        font-weight:bold;
                        &.active{
                            color:rgba(0, 0, 0, 1);
                        }
                        cursor: pointer;
                    }
                }
                .typeselect2{
                    width:0.5rem;
                    color:rgba(0, 0, 0, 1);
                    &::after{
                        content:'';
                        position: absolute;
                        right:50%;
                        top:50%;
                        transform:translate(-50%,-50%);
                        width:0px;
                        height:0.3rem;
                        background:transparent;
                    }
                }
                .vpntips{
                    position: absolute;
                    left:0;
                    top:2.12rem;
                    color:rgba(172, 172, 172, 1);
                    width:100%;
                    display: flex;
                    justify-content: space-between;
                }
                &:last-child{
                    padding-top: 1.34rem;
                }
            }
        }
        .tips{
            margin: 0.54rem auto 0;
            padding:0.2rem 0.3rem;
            color:rgba(255, 255, 255, 1);
            font-size: 0.2rem;
            width:7rem;
            box-sizing: border-box;
            border-radius: 0.26rem;
            background: linear-gradient(45deg,rgba(8, 4, 40, 1),rgba(61, 8, 44, 1));
            p{
                // line-height:0.3rem;
                line-height:2.2em;
                margin-bottom:1em;
            }
        }
    }
    .bottom{
        position: fixed;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 7.5rem;
        height: 1.8rem;
        background-color: rgba(249, 249, 249, 0.94);
        p{
            padding:0.22rem 0.4rem 0.14rem;
            font-size:0.28rem;
            color:rgba(99, 97, 97, 1);
            line-height: 0.4rem;
            span{
                font-size:0.28rem;
                color:rgba(99, 97, 97, 1);
                line-height: 0.4rem;
                float: right;
            }
        }
        .confirmbtn{
            height: 0.72rem;
            width:auto;
            margin:0 auto;
            cursor: pointer;
        }
    }
    .submitwrap{
        position: fixed;
        left:50%;
        bottom: 0;
        transform: translateX(-50%);
        width:7.5rem;
        height:3.34rem;
        padding: 1.12rem 0.42rem 0;
        box-sizing: border-box;
        background: url('./../../../assets/imgs/purse/confirmfixed2.png') center top;
        background-size: 100% 100%;
        &>img{
            cursor: pointer;
            width:0.24rem;
            height:0.24rem;
            position: absolute;
            right:0.44rem;
            top:0.62rem;
        }
        .phonecode,.pswdwrap{
            border-bottom:2px dashed rgba(204, 203, 203, 1);
            position: relative;
            height: 0.36rem;
            padding:0.1rem 0;
            width:6.65rem;
            &>*{
                float: left;
                height:0.36rem;
                width:auto;
            }
            input{
                outline: none;
                border:none;
                color:#000;
                width:3.4rem;
                font-size:0.2rem;
                box-sizing:border-box;
                padding:1px 3px;
                background-color: transparent;
            }
        }
        .pswdwrap{
            margin-top: 0.58rem;
            input{
                width:5rem;
            }
        }
    }
}
</style>