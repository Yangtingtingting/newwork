<!-- 组件说明 -->
<template>
    <div class="haveheaderbar">
        <headerbar :title="'充值详情'" :ifgocenter="false"></headerbar>
        <div class="details_wrap">
            <p>{{pagedata.amount}} VPN</p>
            <div class="li clearfix">
                <p>类型：</p>
                <span>充值</span>
            </div>
            <div class="li clearfix">
                <p>交易号：</p>
                <span>{{pagedata.txid}}</span>
            </div>
            <div class="li clearfix">
                <p>充值地址：</p>
                <span>{{pagedata.address}}</span>
            </div>
            <div class="li clearfix" v-if="false">
                <p>状态：</p>
                <span>已完成</span>
                <span v-if="false">确认中</span>
            </div>
            <div class="li clearfix">
                <p>时间：</p>
                <span>{{pagedata.ctime}}</span>
            </div>
            <div class="li clearfix" v-if="false">
                <p>备注：</p>
                <span>{{pagedata.comment}}</span>
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
                pagedata:'',
            };
        },
        computed: {

        },
        methods: {

        },
        mounted() {
            this.pagedata =JSON.parse(sessionStorage.getItem('payhistoryli'));
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
    .details_wrap{
        min-height: calc(100vh - 0.88rem);
        background-color: #fff;
        padding:0 0.25rem 0.4rem;
        position: relative;
        &>p{
            padding: 0.3rem 0.34rem 0;
            font-size: 0.52rem;
            color:#000;
            font-weight: bold;
            line-height: 0.74rem;
        }
        .li{
            position: relative;
            padding: 0.24rem 0;
            border-bottom:2px solid rgba(204, 203, 203, 1);
            color:rgba(99, 97, 97, 1);
            font-size:0.24rem;
            &:first-child{
                padding-top:0.54rem;
            }
            p{
                float: left;
            }
            span{
                max-width: 5.3rem;
                float: right;
                word-wrap: break-word;
                text-align: right;
            }
        }
    }
}
</style>