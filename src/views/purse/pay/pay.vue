<!-- 组件说明 -->
<template>
    <div class="haveheaderbar havebottombar">
        <headerbar :title="'充值'" :ifgocenter="false" :rightentry="'充值记录'"></headerbar>
        <!-- <p class="entry" @click="goto('payhistory')">充值记录</p> -->
        <div class="topcontnt">
            <span class="title">{{$route.query.coin}}</span>
            <img :src="erweima">
            <p class="code">{{pay_address}}</p>
            <!-- <img src="@/assets/imgs/purse/fuzhidizhi.png"> -->
            <span @click="copyfn" class="btn">复制地址</span>
        </div>
        <div class="bottomcontnt">
            <p>请勿向上述地址充值任何非 {{coinabout.name}} 资产，否则资产将不可找回。您充值至上述地址后，需要整个网络节点达6个确认后到账。</p>
            <p>最小充值金额: {{coinabout.min_withdraw}} {{coinabout.name}} ,小于最小金额的充值将不会记录且无法退回。</p>
            <p>目前不支持使用智能合约或区块奖励(Coinbase)的转账充值，智能合约或区块奖励的转账将不会入账，请您谅解。</p>
            <p>您的充值地址不会经常改变，可以重复充值;如有更改，我们会尽量通过网站公告或邮件通知您。</p>
            <p>请务必确认电脑及浏览器安全，防止信息被篡改或泄露。 </p>
        </div>
    </div>
</template>

<script>
    import QRCode from 'qrcode'
    import { copy } from '@/utils/copy'
    export default {
        components: {

        },
        data () {
            return {
                erweima:'',
                pay_address:'',
                coinabout:'',
            };
        },
        computed: {

        },
        methods: {
            // 复制到剪切板
            copyfn(){
                copy(this.pay_address);
                this.$toast('复制成功');
            },
            // 获取充币地址
            post_walletrechargeaddress(){
                let zs = this;
                this.$toast.loading({
                    duration:0,
                    forbidClick:true,
                })
                this.api.bussiness.post_walletrechargeaddress({
                    // coin :'BTC'
                    coin :zs.$route.query.coin
                }).then(res=>{
                    zs.$toast.clear();
                    if(res.data.code===0){
                        zs.pay_address=res.data.data.address;
                        QRCode.toDataURL(res.data.data.address)
                        .then(url => {
                            console.log(url)
                            zs.erweima= url;
                        })
                        .catch(err => {
                            console.error(err)
                        })
                    }else{
                        zs.$toast(res.data.msg)
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
                        // zs.coinaboutlist = res.data.data;
                        zs.coinabout = resdata.filter((item)=>{
                            return item.name==zs.$route.query.coin;
                        })[0];
                    }else{
                        zs.$toast(res.data.msg);
                    }
                })
            },
        },
        mounted() {
            this.post_walletrechargeaddress();
            this.get_walletcoin();
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
    .entry{
        cursor: pointer;
        position: fixed;
        right:0.32rem;
        top:0.2rem;
        line-height:0.48rem;
        color:#fff;
        font-size:0.34rem;
        z-index: 1000;
    }
    .topcontnt{
        margin: 0.5rem auto 0;
        background: url('./../../../assets/imgs/purse/erweimabg.png') center top;
        background-size: cover;
        width: 7.5rem;
        height:7.94rem;
        span{
            display: block;
        }
        .title{
            padding:0.32rem 0 0.6rem;
            text-align:center;
            font-weight:bold;
            font-size:0.5rem;
        }
        &>img{
            width:2.34rem;
            height:2.34rem;
            padding:0.15rem;
            border: 0.15rem dashed rgba(255, 255, 255, 0.5);
            margin:0 auto 0.32rem;
        }
        .code{
            color:#fff;
            font-size: 0.28rem;
            line-height: 0.51rem;
            margin:0.32rem auto 0.28rem;
            width:6.28rem;
            height: 1.02rem;
            word-wrap: break-word;
            letter-spacing: 0.014rem;
            text-align:center;
        }
        .btn{
            height: 0.56rem;
            line-height: 0.56rem;
            color:#fff;
            background-color: rgba(199,122,170,0.6);
            font-size: 0.24rem;
            width:2.16rem;
            text-align: center;
            border-radius: 0.08rem;
            margin:0 auto;
            letter-spacing: 0.03rem;
            cursor: pointer;
            font-weight: bold;
        }
    }
    .bottomcontnt{
        margin: -0.5rem auto 0;
        background: url('./../../../assets/imgs/purse/czshuomingbg.png') center top;
        background-size: cover;
        width: 7.5rem;
        height:6rem;
        box-sizing: border-box;
        padding: 0.5rem 0.56rem 1.4rem;
        p{
            font-size:0.2rem;
            color:#fff;
            // line-height:0.29rem;
            line-height:1.5em;
            margin-bottom:1em;
        }
    }
}
</style>