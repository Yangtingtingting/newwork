<!-- 组件说明 -->
<template>
    <div class="percenterwrap haveheaderbar">
        <headerbar :title="'个人信息'" :ifgocenter="false"></headerbar>
        <div class="container">
            <img src="@/assets/imgs/percenter/headerpic.png">
            <p class="phone">{{userphoneshow}}</p>
            <span>联系客服：potato@outlook.com </span>
        </div>
        <!-- <img src="@/assets/imgs/percenter/logout.png" class="btn" @click="logoutfn"> -->
        <div @click="bgwrapstatus=true" class="imgbtn">退出登录</div>
        <div class="bgwrap" v-if="bgwrapstatus">
            <div class="confirmbox">
                <p>确定要退出登录吗？</p>
                <div class="btnsbox">
                    <div @click="bgwrapstatus=false" class="imgbtncal">取消</div>
                    <div @click="logoutfn" class="imgbtnconfirm">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {phoneshow} from '@/utils/index'
    export default {
        components: {

        },
        data () {
            return {
                userphoneshow:phoneshow(this.$store.state.user.phone),
                bgwrapstatus:false,
            };
        },
        computed: {

        },
        methods: {
            logoutfn(){
                let zs = this;
                // let confirmfn = window.confirm("确定要退出登录吗？");
                // if (confirmfn) {
                //     zs.$store.commit("resetuserdata");
                //     window.sessionStorage.clear();
                //     window.localStorage.clear();
                //     zs.$router.push({ name: "login" });
                // }
                zs.bgwrapstatus=false;
                zs.$store.commit("resetuserdata");
                window.sessionStorage.clear();
                window.localStorage.clear();
                zs.$router.push({ name: "login" });
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
@import url('./../../assets/css/common.less');
.percenterwrap{
    background-color: #fff;
    .container{
        &>img{
            width: 1.26rem;
            height:1.26rem;
            margin:0.44rem auto 0.28rem;
        }
        .phone,&>span{
            font-size: 0.24rem;
            color: rgba(0, 0, 0, 1);
            text-align: center;
            line-height: 0.34rem;
            margin-bottom:0.2rem;
            display: block;
        }
    }
    &>.btn{
        position: fixed;
        cursor: pointer;
        bottom: 1.68rem;
        left: 50%;
        transform: translateX(-50%);
    }
    &>.imgbtn{
        position: fixed;
        cursor: pointer;
        bottom: 1.68rem;
        left: 50%;
        transform: translateX(-50%);
        width:3.48rem;
        height:0.72rem;
        line-height:0.72rem;
        border-radius: 0.1rem;
        border: 1px solid #A4A4A4;
        color: #1C1D1E;
        text-align: center;
    }

    .bgwrap{
        position: fixed;
        left: 0;
        top:0;
        z-index: 1001;
        width:100vw;
        height:100vh;
        background-color: rgba(0,0,0,0.4);
        .confirmbox{
            background-color: #fff;
            border-radius:0.1rem;
            width:5.6rem;
            padding:0.5rem 0;
            position: relative;
            left: 50%;
            top:50%;
            transform:translate(-50%,-50%);
            color:#000;
            p{
                font-size:0.3rem;
                font-weight: bold;
                text-align: center;
            }
            .btnsbox{
                display: flex;
                justify-content: space-around;
                padding:0.3rem 0 0;
                &>div{
                    cursor: pointer;
                    border:1px solid #000;
                    color:#000;
                    padding:0 0.3rem;
                    border-radius:0.1rem;
                    line-height:1.5em;
                }
            }
        }
    }
}
</style>