<!-- 组件说明 -->
<template>
    <div class="haveheaderbar">
        <headerbar :title="'规则'" :ifgocenter="false"></headerbar>
        <div class="contnt">
            <span>1、用户可以通过分裂海报或分裂码直接分裂用户注册，绑定分裂关系。绑定后为永久分裂关系。</span>

            <span>2、注册时，未通过分裂海报或填写分裂码，不产生分裂关系，且暂不支持补填。</span>

            <span>3、每日分红时，系统会按你的直邀用户账户的vpn数量，换算成算力，并按算力奖励vpn进行奖励。</span>

            <span>4、当账户余额第一次大于2000 VPN时，才能激活繁衍及分裂权限，激活后，账户余额不限。</span>

            <span>5、每日奖励数量会随系统vpn产生数量，持币人数不同而变化，具体以每日到账数量为准。</span>


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

            };
        },
        computed: {

        },
        methods: {

        },
        mounted() {

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
    .contnt{
        padding:0.62rem 0.56rem 0;
        box-sizing: border-box;
        height:calc(100vh - 0.88rem);
        background-color: #fff;
        color:rgba(0, 0, 0, 1);
        font-size: 0.24rem;
        font-weight: 500;
        line-height: 0.34rem;
        span{
            display:block;
            margin-bottom:1.5em;
        }
    }
</style>