<!-- 组件说明 -->
import { Z_TREES } from 'zlib';
<template>
    <div class='loginwrap'>
        <div class="topcenter">
            <img src="@/assets/imgs/percenter/headerpic.png">
            <p>网络共生</p>
        </div>
        <div class="tabwrap">
            <p :class="{active:currenttype==1}" @click="tabto(1)">登录</p>
            <p :class="{active:currenttype==2}" @click="tabto(2)">注册</p>
        </div>
        <div class="content" v-if="currenttype==1">
            <input placeholder="请输入手机号" type="text" maxlength="11" v-model.lazy="phone" v-phonenumbcheck data-id='phnumb1'>
            <input v-if="logintype==1" placeholder="请输入密码" type="password" maxlength="16" v-model.lazy="password" v-pswdcheck data-id='phnumb2'>
            <input v-if="logintype==2" placeholder="请输入短信验证码" type="text" v-model.lazy="phonecode0" data-id='phnumb7'>
            <!-- <img v-if="logintype==2" class="sendcodebtn" src="@/assets/imgs/login/sendcode.png" @click="sendcode0"> -->
            <sendphonecode v-if="logintype==2" :canstart="canstart" @_sendcode="sendcode0" class="sendcodebtn"></sendphonecode>
            <span v-if="logintype==1" @click="forgetpswd">忘记密码？</span>
            <div class="btnsbox">
                <!-- <img src="@/assets/imgs/login/loginbtn.png" @click="login">
                <img v-if="logintype==1" src="@/assets/imgs/login/phcodebtn.png" @click="phcodelogincheck">
                <img v-if="logintype==2" src="@/assets/imgs/login/pswordbtn.png" @click="pswordlogincheck"> -->

                <div class="img btn black" @click="login">登录</div>
                <div v-if="logintype==1" class="img btn" @click="phcodelogincheck">短信登录</div>
                <div v-if="logintype==2" class="img btn" @click="pswordlogincheck">密码登录</div>
            </div>
        </div>
        <div class="content" v-if="currenttype==2">
            <input autocomplete="new-password" placeholder="请输入手机号" type="text" maxlength="11" v-model.lazy="phone2" v-phonenumbcheck data-id='phnumb3'>
            <input autocomplete="new-password" placeholder="请输入短信验证码" type="text" v-model.lazy="phonecode" data-id='phnumb4'>
            <input autocomplete="new-password" placeholder="请输入分裂码" type="text" maxlength="11" v-model.lazy="fissioncode" data-id='phnumb5'>
            <input autocomplete="new-password" placeholder="6-16位含大小写字母及数字码" type="password" maxlength="16" v-model.lazy="password2" v-pswdcheck data-id='phnumb6'>
            <!-- <img class="sendcodebtn" src="@/assets/imgs/login/sendcode.png" @click="sendcode"> -->
            <sendphonecode :canstart="canstart" @_sendcode="sendcode" class="sendcodebtn"></sendphonecode>
            <div class="btnsbox">
                <!-- <img src="@/assets/imgs/login/zhucebtn.png" @click="regist"> -->
                <div class="img btn black" @click="regist">注册</div>
            </div>
        </div>
        <imgcode v-if="imgcodestatus" :imgcodeurl="imgcodeurl" @_close="imgcodestatus=false;" @_refreshimg="refreshimg" @_imgcodeconfirm="imgcodeconfirm"></imgcode>
    </div>
</template>

<script>
//import x from ''
export default {
  components: {},
  data() {
    return {
      phone: "", //登录手机号
      password: "", //登录密码
      phonecode0: "", //登录短信验证码
      logintype: 1, //密码登录：1 短信登录：2

      currenttype: 1, //登录模块：1   注册模块：2

      phone2: "", //注册用 手机号
      password2: "", //注册用 密码
      phonecode: "", // 注册用 验证码
      imgcode: "", // 注册用 图形验证码
      fissioncode: "", // 注册用 分裂码

      imgcodestatus: false, // 图片验证码模块状态 默认隐藏
      imgcodeurl: "", //给 图片验证码组件使用 以获取数据用
    };
  },
  computed: {
    canstart: function() {
      let zs = this;
      if (zs.phone2 == "" && zs.currenttype == 2) {
        return false;
      } else if (zs.phone == "" && zs.currenttype == 1) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    // 刷新图片验证码
    refreshimg(){
        let zs = this;
        let url = zs.phone+new Date().getTime();
        zs.imgcodeurl = url;
        window.sessionStorage.setItem('imgsessioncode',url);
    },
    // 用户输入的验证码 确认事件
    imgcodeconfirm(data) {
      console.log(data);
      let zs = this;
      this.imgcodestatus = false;
      this.imgcode = data;
      this.$toast.loading({
        message: "正在获取短信验证码",
        duration: 0,
        forbidClick: true,
      });
      if (zs.currenttype == 2) {
        // post_msg_register 注册获取验证码
        zs.api.userapis
          .post_msg_register({
            phone: Number(zs.phone2),
            key: sessionStorage.getItem("imgsessioncode"),
            code: data,
          })
          .then(res => {
            console.log(res);
            if (res.data.code === 0) {
              // zs.$toast.clear();
              zs.$toast("验证码发送成功");
              // TODO: 测试阶段 直接把返回的code赋值即可
              zs.phonecode = res.data.sms_code;
              // if(zs.currenttype==2){
              //     zs.phonecode = res.data.sms_code;
              // }else if(zs.currenttype==1){
              //     zs.phonecode0=res.data.sms_code;
              // }
            } else {
              zs.$toast(res.data.msg);
            }
          });
      } else if (zs.currenttype == 1) {
        // get_loginneedmsg 登录获取验证码
        zs.api.userapis
          .get_loginneedmsg({
            phone: Number(zs.phone),
            key: sessionStorage.getItem("imgsessioncode"),
            code: data,
          })
          .then(res => {
            console.log(res);
            if (res.data.code === 0) {
              // zs.$toast.clear();
              zs.$toast("验证码发送成功");
              // TODO: 测试阶段 直接把返回的code赋值即可
              // zs.phonecode0 = res.data.sms_code;//TODO:移除测试验证码模式
              // if(zs.currenttype==2){
              //     zs.phonecode = res.data.sms_code;
              // }else if(zs.currenttype==1){
              //     zs.phonecode0=res.data.sms_code;
              // }
            } else {
              zs.$toast(res.data.msg);
            }
          });
      }
    },
    // 登录操作
    login() {
      let zs = this;
      if (this.logintype == 1) {
        // 密码登录
        // alert('密码登录')
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
        });
        this.api.userapis
          .post_userlogin({
            phone: Number(zs.phone),
            password: zs.password,
          })
          .then(res => {
            zs.$toast.clear();
            if (res.data.code === 0) {
              // zs.$toast.clear();
              zs.$toast("登陆成功");
              zs.loginsuccess(res.data.data);
            } else {
              zs.$toast(res.data.msg);
            }
          });
      } else if (this.logintype == 2) {
        // 短信登录
        // alert("短信登录");
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
        });
        this.api.userapis
          .post_smslogin({
            phone: Number(zs.phone),
            code: Number(zs.phonecode0),
          })
          .then(res => {
            zs.$toast.clear();
            if (res.data.code === 0) {
              // zs.$toast.clear();
              zs.$toast("登陆成功");
              zs.loginsuccess(res.data.data);
            } else {
              zs.$toast(res.data.msg);
            }
          });
      }
    },
    // 登陆成功后的数据处理
    loginsuccess(resdata) {
      // phone: "15901105257"
      // token: "aWmwjVqrWikNgo1dET9f+IWQ6VStRmUJu4XWrfin8b8="
      // user_id: 3
      let zs = this;
      let user = {
        isLogin: true,
        phone: resdata.phone, //用户名 手机号或者字符串
        token: resdata.token,
        user_id: resdata.user_id,
      };
      zs.$store.commit("saveuserdata", user);
      setTimeout(() => {
        zs.$router.push({ name: "index" });
      }, 0);
    },
    // 登录 发送验证码
    sendcode0() {
      // alert('登录发送验证码')
      if (this.phone == "") {
        this.$toast("先输入手机号码");
        return;
      }
      let zs = this;
      let url = zs.phone+new Date().getTime();
      zs.imgcodeurl = url;
      window.sessionStorage.setItem("imgsessioncode",url);
      zs.imgcodestatus = true;
    },
    // 切换为短信验证码登录
    phcodelogincheck() {
      this.logintype = 2;
    },
    // 切换为密码登陆
    pswordlogincheck() {
      this.logintype = 1;
    },

    // 切换 登录 或者 注册模块
    tabto(type) {
      this.currenttype = type;
      this.datareset();
      if (type == 1) {
        // 登录模块
      } else if (type == 2) {
        // 注册模块
      }
    },
    datareset() {
      this.phone = ""; //登录手机号
      this.password = ""; //登录密码
      this.phonecode0 = ""; //登录短信验证码
      (this.logintype = 1), //密码登录：1 短信登录：2
        // this.currenttype=1,//登录模块：1   注册模块：2
        (this.phone2 = ""); //注册用 手机号
      this.password2 = ""; //注册用 密码
      this.phonecode = ""; // 注册用 验证码
      this.imgcode = ""; // 注册用 图形验证码
      this.fissioncode = ""; // 注册用 分裂码
      (this.imgcodestatus = false), // 图片验证码模块状态 默认隐藏
        (this.imgcodeurl = ""); //服务端获取的
    },

    // 注册模块
    // 注册发送验证码
    sendcode() {
      if (this.phone2 == "") {
        this.$toast("先输入手机号码");
        return;
      }
      let zs = this;
      zs.imgcodeurl = zs.phone2 + new Date().getTime();
      window.sessionStorage.setItem(
        "imgsessioncode",
        zs.phone2 + new Date().getTime()
      );
      zs.imgcodestatus = true;
    },
    // 注册点击事件
    regist() {
      // 注册
      // alert('注册操作');
      let zs = this;
      if (zs.phone2 == "") {
        zs.$toast("请填写手机号");
        return;
      }
      if (zs.phonecode == "") {
        zs.$toast("请填写短信验证码");
        return;
      }
      if (zs.password2 == "") {
        zs.$toast("请填写密码");
        return;
      }
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      this.api.userapis
        .post_register({
          phone: Number(zs.phone2),
          sms_code: zs.phonecode,
          password: zs.password2,
          invite_code: zs.fissioncode,
        })
        .then(res => {
          zs.$toast.clear();
          if (res.data.code === 0) {
            // zs.$toast.clear();
            zs.$toast("注册成功");
            zs.currenttype = 1;
          } else {
            zs.$toast(res.data.msg);
          }
        });
    },
    // 忘记密码
    forgetpswd() {
      this.$router.push({
        name: "forgetpswd",
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import url("./../../assets/css/common.less");

.loginwrap {
  .topcenter {
    padding: 1.14rem 0 0;
    margin: 0 auto;
    img {
      width: 0.9rem;
      height: 0.9rem;
      border-radius: 50%;
      margin: 0 auto 0.2rem;
    }
    p {
      height: 0.4rem;
      line-height: 0.4rem;
      color: #fff;
      font-size: 0.28rem;
      font-weight: bold;
      text-align: center;
    }
  }
  .tabwrap {
    margin-top: -0.2rem;
    padding: 0 1.28rem 0.28rem;
    display: flex;
    justify-content: space-between;
    p {
      height: 0.4rem;
      line-height: 0.4rem;
      color: #fff;
      position: relative;
      cursor: pointer;
      &.active::after {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        // bottom: -0.28rem;
        bottom: -0.31rem;
        content: "";
        background: url("./../../assets/imgs/login/sjx.png") no-repeat center
          center;
        width: 0.44rem;
        height: 0.22rem;
      }
    }
  }
  .content {
    min-height: calc(100vh - 3.12rem);
    background-color: #fff;
    box-sizing: border-box;
    padding-top: 1.06rem;
    position: relative;
    input {
      color: rgba(0, 0, 0, 0.5);
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
    & > span {
      position: absolute;
      right: 1.26rem;
      top: 2.76rem;
      cursor: pointer;
      color: rgba(59, 8, 44, 1);
      font-size: 0.24rem;
      line-height: 0.34rem;
    }
    .btnsbox {
      margin: 0.48rem auto 0;
      img {
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
    .sendcodebtn {
      position: absolute;
      right: 1.26rem;
      top: 2.68rem;
      width: 1.86rem;
      height: 0.48rem;
      cursor: pointer;
    }
  }
}
</style>
