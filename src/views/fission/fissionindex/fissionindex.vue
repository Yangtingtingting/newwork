<!-- 组件说明 -->
<template>
    <!-- <div class="haveheaderbar"> -->
    <div class="haveheaderbar havebottombar">
        <headerbar :title="'核裂变'" :ifgocenter="true"></headerbar>
        <div class="topwrap" v-if="userjhstatus==1">
            <div class="top">
                <div class="left">
                    <span>0</span>
                    <p>分裂数</p>
                </div>
                <div class="right">
                    <span>0</span>
                    <p>分裂收益</p>
                </div>
            </div>
        </div>
        <div class="topwrap" v-if="userjhstatus==2">
            <div class="top">
                <div class="left" @click="goto('fenlie_percen')">
                    <span>{{fenlie_numb}}</span>
                    <p>分裂数</p>
                </div>
                <div class="right" @click="goto('fenlie_val')">
                    <span>{{fenlie_val}}</span>
                    <p>分裂收益</p>
                </div>
            </div>
        </div>
        <div class="contentwrap" :class="{bgtransparent:userjhstatus==-1}">
            <div class="content" v-if="userjhstatus==1">
                <span>充值2000 VPN 即可激活</span>
                <span>繁衍及分裂权限</span>
                <!-- <img @click="$router.push({name:'pay',query:{coin:'VPN'}})" src="@/assets/imgs/fission/jhbtn.png" class="btn"> -->
                <div @click="$router.push({name:'pay',query:{coin:'VPN'}})" class="btn">立即激活</div>
            </div>
            <div class="content2" v-if="userjhstatus==2">
                <div class="cvswrap0">
                    <div class="cvswrap1"  @click="copyfn">
                        <div class="top clearfix">
                            <img src="@/assets/imgs/percenter/headerpic.png">
                            <p>网络共生</p>
                        </div>
                        <div class="other">
                            <p>只为价值而生</p>
                            <img :src="erweima">
                            <span>{{fenliema}}</span>
                        </div>
                    </div>
                </div>
                <span>点击海报保存</span>
                <p @click="copyfn">复制分裂码</p>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcode'
import { copy } from '@/utils/copy'
export default {
  components: {},
  data() {
    return {
      userjhstatus: -1,//是否激活核裂变, 1 否，2 是
      fenliema: "",
      // erweima: require("@/assets/imgs/fission/erweima.png"),
      erweima: '',

      fenlie_numb: '', //分裂数
      fenlie_val: '', //分裂收益
    };
  },
  computed: {},
  methods: {
    // 复制到剪切板
    copyfn(){
      copy(this.fenliema);
      this.$toast('复制成功');
    },
    // 路由跳转对应的 name
    goto(name) {
      let zs = this;
      this.$router.push({
        name,
        query:{
          invite_number:zs.fenlie_numb,
          invite_reward:zs.fenlie_val,
        }
      });
    },
    // 获取分裂首页数据信息
    get_userinvite_info(){
      let zs = this;
      this.$toast.loading({
          duration:0,
          forbidClick:true,
      })
      this.api.userapis.get_userinvite_info({

      }).then(res=>{
        zs.$toast.clear();
        if(res.data.code===0){
          window.sessionStorage.setItem('invite_code',res.data.data.invite_code);
          zs.userjhstatus=res.data.data.invite_enable==1?2:1;
          zs.fenlie_numb=res.data.data.invite_number;//裂变人数
          zs.fenlie_val=res.data.data.invite_reward;//裂变收益
          zs.fenliema=res.data.data.invite_code;//邀请码
          QRCode.toDataURL(res.data.data.invite_code)
          .then(url => {
            console.log(url)
            zs.erweima= url;
          })
          .catch(err => {
            console.error(err)
          })
        }else{
          zs.$toast(res.data.msg);
        }
      })
    }
  },
  mounted() {
    this.get_userinvite_info();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
@import url("./../../../assets/css/common.less");
.haveheaderbar {
  .topwrap {
    padding: 0.34rem 0.3rem 0.26rem;
    .top {
      border-radius: 0.26rem;
      height: 1.64rem;
      background: linear-gradient(
        37deg,
        rgba(58, 8, 45, 1),
        rgba(13, 6, 67, 1)
      );
      display: flex;
      justify-content: space-between;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateY(-50%);
        width: 2px;
        height: 1.06rem;
        background: #fff;
      }
      & > div {
        cursor: pointer;
        width: 50%;
        padding: 0.32rem 0 0.42rem;
        span,
        p {
          display: block;
          text-align: center;
        }
        span {
          font-size: 0.28rem;
          line-height: 0.4rem;
          margin-bottom: 0.1rem;
        }
        p {
          font-size: 0.28rem;
          line-height: 0.4rem;
          font-weight: bold;
        }
      }
    }
  }
  .contentwrap {
    min-height: calc(100vh - 4.6rem);
    background-color: #fff;
    position: relative;
    &.bgtransparent{
      background-color: transparent;
    }
    .content {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      span {
        display: block;
        color: rgba(0, 0, 0, 1);
        font-size: 0.36rem;
        line-height: 0.5rem;
        text-align: center;
      }
      .btn {
        cursor: pointer;
        margin: 1.08rem auto 0;
        cursor: pointer;
        height: 0.72rem;
        width: 2.58rem;
        border-radius: 0.1rem;
        color: #fff;
        border: 1px solid #35072B;
        background-color: #35072B;
        font-size: 0.25rem;
        text-align: center;
        line-height: 0.72rem;
      }
    }
    .content2 {
      // padding: 0.66rem 0.28rem 0;
      // padding: 0.66rem 0.28rem;
      padding: 0.26rem 0.28rem 0.66rem;
      .cvswrap0 {
        cursor: pointer;
        background: url("./../../../assets/imgs/fission/bg1.png") no-repeat
          center center;
        background-size: cover;
        // padding: 0.1rem 0.58rem 1rem;
        padding: 0.1rem 0.58rem;
        .cvswrap1 {
          background: url("./../../../assets/imgs/fission/bg2.png") no-repeat
            center center;
          background-size: cover;
          width: 5.8rem;
          height: 6.7rem;
          .top {
            padding: 0.34rem 0 0.56rem 0.42rem;
            img {
              width: 0.68rem;
              height: 0.68rem;
              margin-right: 0.28rem;
              float: left;
            }
            p {
              float: left;
              height: 0.68rem;
              // line-height:0.68rem;
              line-height: 0.7rem;
              font-weight: bold;
              color: #fff;
              font-size: 0.2rem;
              letter-spacing: 0.2em;
            }
          }
          .other {
            p {
              text-align: center;
              margin-bottom: 0.14rem;
              line-height: 0.44rem;
              font-weight: bold;
              font-size: 0.32rem;
              letter-spacing: 0.2em;
            }
            img {
              width: 1.8rem;
              height: 1.8rem;
              padding: 0.15rem;
              border: 0.15rem dashed rgba(255, 255, 255, 0.5);
              display: block;
              margin: 0.14rem auto 0.64rem;
            }
            span {
              display: block;
              text-align: center;
            }
          }
        }
      }
      & > span {
        font-size: 0.28rem;
        color: rgba(0, 0, 0, 0.6);
        line-height: 0.4rem;
        margin-bottom: 0.32rem;
        display: block;
        text-align: center;
      }
      & > p {
        font-size: 0.36rem;
        color: rgba(0, 0, 0, 1);
        line-height: 0.5rem;
        display: block;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>