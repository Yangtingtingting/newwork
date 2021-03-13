<!-- 组件说明 -->
<template>
    <div class="inviterigist_wrap">
        <div class="top">
            <img src="@/assets/imgs/percenter/headerpic.png">
            <div class="right">
                <p>网络共生</p>
                <span>邀请人：{{phoneshow(invitephone)}}</span>
            </div>
        </div>
        <div class="content">
            <input placeholder="请输入手机号" type="text" maxlength="11" v-model.lazy="phone" v-phonenumbcheck data-id='phnumb0'>
            <input placeholder="请输入短信验证码" type="text" v-model.lazy="phonecode" data-id='phnumb1'>
            <input placeholder="6-16位含大小写字母及数字码" type="password" maxlength="16" v-model.lazy="password" v-pswdcheck data-id='phnumb3'>
            <img class="sendcodebtn" src="@/assets/imgs/login/sendcode.png" @click="sendcode">
            <div class="btnsbox">
                <img src="@/assets/imgs/login/zhucebtn.png" @click="regist">
            </div>
        </div>
        <div class="bottom">
            <a href="http://www.baidu.com" target="_blank">立即下载</a>
        </div>
        <imgcode v-if="imgcodestatus" :imgcodeurl="imgcodeurl" @_close="imgcodestatus=false;" @_refreshimg="refreshimg" @_imgcodeconfirm="imgcodeconfirm"></imgcode>
    
    </div>
</template>

<script>
    import {phoneshow} from '@/utils/index'
    export default {
        components: {

        },
        data () {
            return {
                invitephone:'',
                phone:'',
                phonecode:'',
                password:'',
                invitecode:'',

                imgcodestatus:false,// 图片验证码模块状态 默认隐藏
                imgcodeurl:'',//给 图片验证码组件使用 以获取数据用
            };
        },
        computed: {

        },
        methods: {
            // 刷新图片验证码
            refreshimg(){
                let zs = this;
                let url = zs.phone+new Date().getTime();
                zs.imgcodeurl = url;
                window.sessionStorage.setItem('imgsessioncode_invite',url);
            },
            phoneshow(data){
                return phoneshow(data);
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
                // post_msg_register 获取短信验证码-注册
                zs.api.userapis.post_msg_register({
                    phone:Number(zs.phone),
                    key:sessionStorage.getItem('imgsessioncode_invite'),
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
            // 发送验证码
            sendcode(){
                if(this.phone==''){
                    this.$toast('先输入手机号码');
                    return;
                }
                let zs = this;
                let url = zs.phone+new Date().getTime();
                zs.imgcodeurl = url;
                window.sessionStorage.setItem('imgsessioncode_invite',url);
                zs.imgcodestatus = true;
            },
            // 注册操作
            regist(){
                let zs = this;
                zs.api.userapis.post_register({
                    phone:Number(zs.phone),
                    sms_code:zs.phonecode,
                    password:zs.password,
                    invite_code:zs.invite_code,
                }).then(res=>{
                    console.log(res);
                    if(res.data.code===0){
                        zs.$toast(res.data.msg);
                        // zs.$toast('注册成功');
                        // zs.$router.push({
                        //     name:'login'
                        // })
                    }else{
                        zs.$toast(res.data.msg);
                    }
                })
            },
            // 获取 邀请人信息
            get_userinfobycode(){
                let zs = this;
                this.$toast.loading({
                    duration:0,
                    forbidClick:true,
                })
                this.api.userapis.get_userinfobycode({
                    code : zs.invitecode
                }).then(res=>{
                    zs.$toast.clear();
                    if(res.data.code===0){
                        zs.invitephone= res.data.data.phone;
                    }else{
                        zs.$toast(res.data.msg);
                    }
                })
            }
        },
        mounted() {
            this.invitecode = this.$route.query.code;
            this.get_userinfobycode();  
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
.inviterigist_wrap{
    .top{
        height: 3.12rem;
        box-sizing:border-box;
        padding:1.4rem 0 0.78rem 0.66rem;
        img{
            padding-top: 0.04rem;
            width: 0.98rem;
            height:0.98rem;
            object-fit: contain;
            float: left;
            margin-right: 0.28rem;
        }
        .right{
            float: left;
            p{
                font-size:0.28rem;
                color:rgba(255, 255, 255, 1);
                line-height: 0.4rem;
                margin-bottom: 0.14rem; 
                font-weight:bold;
            }
            span{
                font-size:0.28rem;
                color:rgba(255, 255, 255, 1);
                line-height: 0.4rem;
            }
        }
    }
    .content{
        min-height: calc(100vh - 3.12rem - 1.66rem);
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
    .bottom{
        height: 1.66rem;
        position: relative;
        a{
            position: absolute;
            right:0.5rem;
            top:50%;
            transform:translateY(-50%);
            padding:0 0.26rem;
            height:2.5em;
            line-height:2.5em;
            border:1px solid #fff;
            border-radius:0.52rem;
            font-size:0.2rem;
            color:#fff;
        }
    }
}
</style>