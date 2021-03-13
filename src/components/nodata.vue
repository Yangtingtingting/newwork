<!-- 组件说明 -->
<template>
    <div class='nodata'>
        <img class="search" src="@/assets/imgs/common/nodatasearch.png">
        <img class="text" src="@/assets/imgs/common/nodatatxt.png">
    </div>
</template>

<script>
    //import x from ''
    export default {
        name:'nodata',
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
.nodata{
    position:fixed;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    img{
        margin:0 auto;
        &.search{
            width:1.54rem;
            height:1.54rem;
        }
        &.text{
            height:0.56rem;
            margin-top:0.32rem;
        }
    }
}
</style>

<style lang='less'>
//@import url()

</style>