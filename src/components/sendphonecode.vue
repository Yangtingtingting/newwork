<!-- 组件说明 -->
<template>
    <div class='getphonecodewrap'>
        <img @click="getphonecodefn" v-if="lastnumber==-1 && iffirstget" class="nonetwork" src="@/assets/imgs/login/sendcode.png">
        <p class="lastnumber" v-if="lastnumber!=-1">{{waittime}} 秒</p>
        <img @click="getphonecodefn" v-if="lastnumber==-1 && !iffirstget" class="btn" src="@/assets/imgs/login/sendcodeagain.png">
    </div>
</template>

<script>
    //import x from ''
    export default {
        name:'sendphonecode',
        props:{
            canstart:{
                type:Boolean,
                value:false
            },
        },
        components: {

        },
        data () {
            return {
                lastnumber:-1,//默认 是-1 即为最初始状态
                iffirstget:true,
                lastnumberchangestatrtimer:'',
                waittime:60,
            };
        },
        computed: {

        },
        methods: {
            getphonecodefn(){
                if(!this.canstart){
                    this.$toast('请先输入手机号码')
                    return;
                }
                this.iffirstget=false;
                this.waittime=60;
                this.lastnumberchangestatr();
                this.$emit('_sendcode');
            },
            lastnumberchangestatr(){
                let zs = this;
                // if(this.lastnumberchangestatrtimer!=null){
                    clearInterval(zs.lastnumberchangestatrtimer);
                    zs.lastnumberchangestatrtimer = window.setInterval(()=>{
                        if(zs.waittime>-1){
                            zs.waittime=zs.waittime-1;
                        }
                        zs.lastnumber = zs.waittime;
                    },1000)
                // }
            }
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
.getphonecodewrap{
    position: relative;
    &>*{
        position: absolute;
        right: 0;
        top:50%;
        transform:translateY(-50%);
        height: 0.48rem;
        line-height: calc(0.48rem - 2px);
        width: 1.86rem;
        text-align: center;
        cursor: pointer;
        object-fit: contain;
        box-sizing: border-box;
        border-radius: 0.24rem;
        background-color: #fff;
        color:#636161;
        &.lastnumber{
            border: 1px solid #636161;
            cursor: auto;
        }
    }
}
</style>