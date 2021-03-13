<!-- 组件说明 -->
<template>
    <div class="imgcodewrap">
        <div class="imgcode">
            <p>图形验证码</p>
            <img @click="refreshimg" class="imgcodeurl" :src="`${base.yxf}/api/msg/img_code?key=${imgcodeurl}`">
            <input placeholder="请输入图片验证码" type="text" v-model.lazy="imgcodeval">
            
            <img class="btn" src="@/assets/imgs/login/confirmbtn.png" @click="imgcodeconfirm">
            <img @click="close" class="close" src="@/assets/imgs/purse/close.png">
        </div>
    </div>
</template>

<script>
    import base from '@/api/base'; // 导入接口域名列表
    export default {
        name:'imgcode',
        components: {

        },
        props: {
            imgcodeurl: {
                type: String,
                default: "",
            },
        },
        data () {
            return {
                imgcodeval:'',
            };
        },
        computed: {
            base:function(){
                return base
            }
        },
        methods: {
            // 图片验证码确认事件
            imgcodeconfirm(){
                if(this.imgcodeval==''){
                    this.$toast('请输入验证码');
                    return;
                }
                this.$emit('_imgcodeconfirm',this.imgcodeval)
            },
            // 图片 点击刷新事件
            refreshimg(){
                // this.$toast('正在重新获取图片验证码');
                this.$toast({
                    duration:700,
                    message:'正在重新获取图片验证码',
                    forbidClick:true
                })
                this.$emit('_refreshimg')
            },
            close(){
                this.imgcodeval='';
                this.$emit('_close');
            }
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
    .imgcodewrap{
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        min-height: 100vh;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        .imgcode{
            position: absolute;
            left: 50%;
            top:50%;
            transform:translate(-50%,-50%);
            padding:0.4rem 0.3rem;
            background:#fff;
            border-radius:0.1rem;
            p{
                font-size: 0.28rem;
                line-height: 0.38rem;
                color: #000;
                text-align: center;
                margin-bottom: 0.1rem;
            }
            .imgcodeurl{
                width: 3.56rem;
                height:auto;
                min-height:1.335rem;
                background-color: #ccc;
                margin: 0.2rem auto;
            }
            input{
                color:rgba(0, 0, 0, 0.5);
                display: block;
                margin: 0 auto 0.48rem;
                width: 5.86rem;
                height: 0.92rem;
                line-height: 0.92rem;
                background-color: rgba(238, 238, 238, 1);
                border: none;
                outline: none;
                padding: 0 0.62rem;
                box-sizing: border-box;
                border-radius: 0.46rem;
            }
            .btn{
                width: 66%;
                height:auto;
                cursor: pointer;
                margin: 0 auto;
            }
            .close{
                cursor: pointer;
                width:0.24rem;
                height:0.24rem;
                position: absolute;
                right:0.44rem;
                top:0.62rem;
            }
        }
    }
</style>