<!-- 组件说明 -->
<template>
    <div class="haveheaderbar">
        <headerbar :title="'忘记密码'" :ifgocenter="false"></headerbar>
        <div class="content">
            <input placeholder="请输入手机号" type="number" maxlength="11" v-model.number.lazy="phone" v-phonenumbcheck data-id='phnumb3'>
            <input placeholder="请输入短信验证码" type="text" v-model.lazy="phonecode" data-id='phnumb4'>
            <input placeholder="请输入新密码" type="password" maxlength="11" v-model.lazy="password1" data-id='phnumb5'>
            <input placeholder="请再次输入密码" type="password" maxlength="16" v-model.lazy="password2" v-pswdcheck data-id='phnumb6'>
            <!-- <img class="sendcodebtn" src="@/assets/imgs/login/sendcode.png" @click="sendcode"> -->
            <sendphonecode :canstart="canstart" @_sendcode="sendcode" class="sendcodebtn"></sendphonecode>
            <div class="btnsbox">
                <!-- <img src="@/assets/imgs/login/confirmbtn.png" @click="confirm"> -->
                <div class="img btn black" @click="confirm">确认</div>
            </div>
        </div>
        <imgcode v-if="imgcodestatus" :imgcodeurl="imgcodeurl" @_close="imgcodestatus=false;" @_refreshimg="refreshimg" @_imgcodeconfirm="imgcodeconfirm"></imgcode>
    </div>
</template>

<script>
    //import x from ''
    export default {
        components: {

        },
        data () {
            return {
                phone:'',//手机号
                phonecode:'',//手机 验证码
                password1:'',//密码
                password2:'',//确认密码

                imgcodestatus:false,// 图片验证码模块状态 默认隐藏
                imgcodeurl:'',//给 图片验证码组件使用 以获取数据用
            };
        },
        computed: {
            canstart: function() {
            let zs = this;
            if (zs.phone == "") {
                return false;
            } else {
                return true;
            }
            },
        },
        methods: {
            // 刷新图片验证码
            refreshimg(){
                let zs = this;
                let url = zs.phone+new Date().getTime();
                zs.imgcodeurl = url;
                window.sessionStorage.setItem('imgsessioncode_resetpswd',url);
            },
            // 用户输入的验证码 确认事件
            imgcodeconfirm(data){
                // console.log(data);
                let zs = this;
                this.imgcodestatus=false;
                this.imgcode = data;
                this.$toast.loading({
                    message:'正在获取短信验证码',
                    duration:0,
                    forbidClick:true,
                })
                // get_msgpassword 获取短信验证码-重置密码
                zs.api.userapis.get_msgpassword({
                    phone:Number(zs.phone),
                    key:sessionStorage.getItem('imgsessioncode_resetpswd'),
                    code:data,
                }).then(res=>{
                    console.log(res);
                    if(res.data.code===0){
                        // zs.$toast.clear();
                        zs.$toast('验证码发送成功');
                        // TODO: 测试阶段 直接把返回的code赋值即可
                        // zs.phonecode = res.data.sms_code;//TODO:移除测试验证码模式
                        // if(zs.currenttype==2){
                        //     zs.phonecode = res.data.sms_code;
                        // }else if(zs.currenttype==1){
                        //     zs.phonecode0=res.data.sms_code;
                        // }
                    }else{
                        zs.$toast(res.data.msg);
                    }
                })
            },
            // 底部 修改密码 确认事件
            confirm(){
                let zs = this;
                if(zs.phone==''){
                    zs.$toast('请填写手机号')
                    return;
                };
                if(zs.phonecode==''){
                    zs.$toast('请填写短信验证码')
                    return;
                };
                if(zs.password1==''){
                    zs.$toast('请填写密码')
                    return;
                };
                if(zs.password2==''){
                    zs.$toast('请填写二次确认密码')
                    return;
                };
                if(zs.password2!=zs.password1){
                    zs.$toast('两次输入的密码不一致，请重新输入');
                    zs.password1='';
                    zs.password2='';
                    return;
                };
                console.log(this.phone,this.phonecode,this.password1,this.password2);
                this.$toast.loading({
                    message:'正在重置密码..',
                    duration:0,
                    forbidClick:true,
                })
                // get_msgpassword 获取短信验证码-重置密码
                zs.api.userapis.post_reset_password({
                    phone:Number(zs.phone),
                    new_password:zs.password1,
                    code:zs.phonecode
                }).then(res=>{
                    console.log(res);
                    if(res.data.code===0){
                        zs.$toast('重置密码成功');
                        zs.$router.push({
                            name:'login'
                        })
                    }else{
                        zs.$toast(res.data.msg);
                    }
                })
            },
            sendcode(){
                if(this.phone==''){
                    this.$toast('先输入手机号码');
                    return;
                }
                let zs = this;
                let url = zs.phone+new Date().getTime();
                zs.imgcodeurl = url;
                window.sessionStorage.setItem('imgsessioncode_resetpswd',url);
                zs.imgcodestatus = true;
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
.content{
    // min-height: calc(100vh - 3.12rem);
    min-height: calc(100vh - 0.88rem);
    background-color: #fff;
    box-sizing: border-box;
    padding-top: 1.06rem;
    position: relative;
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
    &>span{
        position: absolute;
        right: 1.26rem;
        top: 2.76rem;
        cursor: pointer;
        color: rgba(59, 8, 44, 1);
        font-size: 0.24rem;
        line-height: 0.34rem
    }
    .btnsbox{
        margin:0.48rem auto 0; 
        img{
            display: block;
            width: auto;
            height: 0.72rem;
            margin: 0 auto 0.38rem;
            cursor: pointer;
        }
      .img{
        width:3.56rem;
        height: 0.72rem;
        margin: 0 auto 0.38rem;
        cursor: pointer;
        text-align: center;
        line-height: 0.72rem;
        border-radius: 0.1rem;
        border: 1px solid #4c4c4c;
        color:#4c4c4c;
        &.black{
          color:#fff;
          background-color: #600e3f;
        }
      }
    }


    // 注册部分
    .sendcodebtn{
        position: absolute;
        right: 1.26rem;
        top:2.68rem;
        width:1.86rem;
        height:0.48rem;
        cursor: pointer;
    }
}
.sendcodebtn {
    position: absolute;
    right: 1.26rem;
    top: 2.68rem;
    width: 1.86rem;
    height: 0.48rem;
    cursor: pointer;
}
</style>