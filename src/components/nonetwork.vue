<!-- 组件说明 -->
<template>
    <div class='nonetworkwrap'>
        <img class="nonetwork" src="@/assets/imgs/common/nonetwork.png">
        <p>网络错误</p>
        <img @click="$router.go(0)" class="btn" src="@/assets/imgs/common/trybtn.png">
    </div>
</template>

<script>
    //import x from ''
    export default {
        name:'nonetwork',
        props:{
            pagetype:{
                type:String,
                value:'searchdata'//默认搜索结果页
            },
        },
        components: {

        },
        data () {
            return {

            };
        },
        computed: {

        },
        methods: {

        },
        mounted() {

        },
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang='less' scoped>
@import url('./../assets/css/common.less');
.nonetworkwrap{
    background: #fff;
    position:fixed;
    left:50%;
    top:50%;
    z-index: 100;
    transform:translate(-50%,-50%);
    img{
        margin:0 auto;
        &.nonetwork{
            width:auto;//2.0655
            height:1.64rem;
        }
        &.btn{
            cursor: pointer;
            width: 2.6rem;
            height: 0.72rem;
        }
    }
    p{
        margin: 0.21rem auto 0.78rem;
        font-size: 0.4rem;
        color: #000000;
        text-align: center;
    }
}
</style>

<style lang='less'>
//@import url()

</style>