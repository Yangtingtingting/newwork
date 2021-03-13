<!-- 组件说明 -->
<template>
    <div class="haveheaderbar">
        <headerbar :title="'提币记录'" :ifgocenter="false"></headerbar>
       
        <div class="historylist">
            <div class="li" v-for="(item,index) in 0" :key="index+'test'" @click="goto('dissavingdetails',item)">
                <!-- <p>充值</p> -->
                <p>提币</p>
                <img src="@/assets/imgs/purse/canclebtn.png">
                <ul>
                    <li>
                        <span>数量</span>
                        <span>+1233123.99</span>
                        <!-- <span>-1233123.99</span> -->
                    </li>
                    <li>
                        <span>转态</span>
                        <!-- <span>8/12区块确认</span> -->
                        <span>待审核</span>
                        <!-- <span>已完成</span> -->
                    </li>
                    <li>
                        <span>时间</span>
                        <span>18:17 11/04</span>
                    </li>
                </ul>
            </div>
            <div class="li" v-for="(item,index) in pagelist" :key="index" @click="goto('dissavingdetails',item)">
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
                        <span>{{item.status===0?'待审核':item.status===1?'已拒绝':item.status===2?'已完成':''}}</span>
                    </li>
                    <li>
                        <span>时间</span>
                        <span>{{item.ctime}}</span>
                    </li>
                </ul>
            </div>
            <div v-if="pagelist.length==0" class="nodata">暂无正在进行的提币记录</div>
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
                sessionStorage.setItem('tibihistoryli',JSON.stringify(data));
                this.$router.push({
                    name,
                    // liid:data.id
                })
            },
            get_walletwithdrawrecord(){
                let zs = this;
                this.api.bussiness.get_walletwithdrawrecord().then(res=>{
                    zs.pagelist = res.data.data;
                })
            }
        },
        mounted() {
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
    .historylist{
        // min-height: calc(100vh - 7.88rem);
        min-height: calc(100vh - 0.88rem);
        background-color: #fff;
        padding:0 0.25rem 0.4rem;
        box-sizing:border-box;
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
                padding-left:0.52rem;
            }
            &>img{
                position: absolute;
                right: 0.28rem;
                bottom:1.24rem;
                height: 0.32rem;
                cursor: pointer;
            }
            ul{
                padding:0 0.32rem 0 0.52rem;
                display: flex;
                justify-content: space-between;
                li{
                    span{
                        color:rgba(99, 97, 97, 1);
                        font-weight:bold;
                        font-size:0.24rem;
                        display: block;
                        // text-align:center;
                        line-height:0.57rem;
                    }
                    &:first-child{
                        text-align: left;
                    }
                    &:last-child{
                        text-align: right;
                    }
                    &:nth-child(2){
                        text-align: center;
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