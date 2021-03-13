<!-- 组件说明 -->
<template>
    <div class="haveheaderbar havebottombar">
        <headerbar :title="'网络共生'" :ifgocenter="true"></headerbar>
        <div class="container clearfix" v-if="userjhstatus==1">
            <div class="tabnav">
                <p class="active">繁殖</p>
                <p>分裂</p>
            </div>
            <span class="tips" @click="goto('rulers')">规则</span>
            <div class="contnt1top">
                <span>充值2000 VPN 即可激活</span>
                <span>繁衍及分裂权限</span>
                <!-- <img @click="$router.push({name:'pay',query:{coin:'VPN'}})" src="@/assets/imgs/index/jihuo.png" class="btn"> -->
                <div @click="$router.push({name:'pay',query:{coin:'VPN'}})" class="btn">立即激活</div>
                <div class="fixeddom">
                    <p>距离下次分红剩余</p>
                    <lasttime></lasttime>
                </div>
            </div>
            <div class="contnt1bottom">
                <p>本轮奖励TOP 10</p>
                <ol>
                    <li class="clearfix" v-for="(item,index) in top10list" :key="index">
                        <span class="xh">{{index+1}}</span>
                        <span class="left">{{phoneshow(item.phone)}}</span>
                        <span class="right">
                            {{item.amount}} VPN
                        </span>
                    </li>
                    <li v-if="top10list.length==0" style="color:#ccc;text-align:center;">暂无数据</li>
                </ol>
            </div>
        </div>
         <div class="container container2 clearfix" v-if="userjhstatus==2">
            <div class="contnt2top">
                <div class="timerwrap">
                    <span class="sp1">距离次轮分红剩余</span>
                    <lasttime @getnewlist="get_inforewardtop10"></lasttime>
                    <span class="sp2">VPN当前共振价格 ≈ {{gzjg.toFixed(2)}}CNY</span>
                </div>
                <!-- <div class="tabswrap">
                    <img @click="indextabchange(index)" :class="{active:index == currentindex}" v-for="(item,index) in indextabs" :src="item" :key="index">
                    <img @click.stop="tipswrap=true" class="wh" src="@/assets/imgs/index/wh.png">
                </div> -->
                <div class="tabswrap">
                    <p @click="indextabchange(0)" :class="{active:0 == currentindex}" class="img">总收益</p>
                    <p @click="indextabchange(1)" :class="{active:1 == currentindex}" class="img">次轮收益</p>
                    <p @click="indextabchange(2)" :class="{active:2 == currentindex}" class="img">我的算力</p>
                    <p @click="indextabchange(3)" :class="{active:3 == currentindex}" class="img">次轮产币</p>
                    <p @click="indextabchange(4)" :class="{active:4 == currentindex}" class="img">全网算力</p>
                    <img @click.stop="tipswrap=true" class="wh" src="@/assets/imgs/index/wh.png">
                </div>
            </div>
            <div class="contnt2center">
              <!-- 总收益 -->
              <template v-if="currentindex == 0">
                <div class="contnt">
                    <!-- <img src="@/assets/imgs/index/wdhjbzsy.png"> -->
                    <div class="title">我的繁殖总收益</div>
                    <p>{{static_reward_total}} VPN</p>
                </div>
                <div class="contnt">
                    <!-- <img src="@/assets/imgs/index/wdhlbzsy.png"> -->
                    <div class="title">我的分裂总收益</div>
                    <p>{{invite_reward_total}} VPN</p> 
                </div>
              </template>
              <!-- 上轮收益 -->
              <template v-if="currentindex == 1">
                <div class="contnt">
                    <!-- <img src="@/assets/imgs/index/wdhjbslsy.png"> -->
                    <div class="title">我的繁殖上轮收益</div>
                    <p>{{last_static_reward}} VPN</p>
                </div>
                <div class="contnt">
                    <!-- <img src="@/assets/imgs/index/wdhlbslsy.png"> -->
                    <div class="title">我的分裂上轮收益</div>
                    <p>{{last_invite_reward}} VPN</p> 
                </div>
              </template>
              <!-- 我的算力 -->
              <template v-if="currentindex == 2">
                <div class="contnt">
                    <!-- <img src="@/assets/imgs/index/wdhjbzsy.png"> -->
                    <div class="title">我的繁殖算力</div>
                    <p>{{my_hashrate_static}}</p>
                </div>
                <div class="contnt">
                    <!-- <img src="@/assets/imgs/index/wdhlbzsy.png"> -->
                    <div class="title">我的分裂算力</div>
                    <p>{{my_hashrate_invite}}</p> 
                </div>
              </template>
              <!-- 我的算力 -->
              <!-- <template v-if="currentindex == 2">
                <div class="contnt big">
                    <img src="@/assets/imgs/index/wdslbig.png">
                    <p>{{my_hashrate}}</p>
                </div>
              </template> -->
              <!-- 次轮产币 -->
              <template v-if="currentindex == 3">
                <div class="contnt">
                    <!-- <img src="@/assets/imgs/index/wdhjbzsy.png"> -->
                    <div class="title">次轮繁殖总产出</div>
                    <p>{{total_out_static}} VPN</p>
                </div>
                <div class="contnt">
                    <!-- <img src="@/assets/imgs/index/wdhlbzsy.png"> -->
                    <div class="title">次轮分裂总产出</div>
                    <p>{{total_out_invite}} VPN</p> 
                </div>
              </template>
              <!-- 次轮产币 -->
              <!-- <template v-if="currentindex == 3">
                <div class="contnt big">
                    <img src="@/assets/imgs/index/clcb.png">
                    <p>{{total_out}} VPN</p>
                </div>
              </template> -->
              <!-- 全网算力 -->
              <!-- <template v-if="currentindex == 4">
                <div class="contnt big">
                    <img src="@/assets/imgs/index/qwsl.png">
                    <p>{{total_hashrate}}</p>
                </div>
              </template> -->
              <!-- 我的算力 -->
              <template v-if="currentindex == 4">
                <div class="contnt">
                    <!-- <img src="@/assets/imgs/index/wdhjbzsy.png"> -->
                    <div class="title">全网繁殖算力</div>
                    <p>{{total_hashrate_static}}</p>
                </div>
                <div class="contnt">
                    <!-- <img src="@/assets/imgs/index/wdhlbzsy.png"> -->
                    <div class="title">全网分裂算力</div>
                    <p>{{total_hashrate_invite}}</p> 
                </div>
              </template>
            </div>
            <div class="contnt1bottom contnt2bottom">
                <!-- <div class="contnt1bottom contnt2bottom" v-if="top10list.length>0"> -->
                <p>本轮奖励TOP 10</p>
                <ol>
                    <li class="clearfix" v-for="(item,index) in top10list" :key="index">
                        <span class="xh">{{index+1}}</span>
                        <span class="left">{{phoneshow(item.phone)}}</span>
                        <span class="right">
                            {{Number(item.amount)}} VPN
                        </span>
                    </li>
                    <li v-if="top10list.length==0" style="color:#ccc;text-align:center;">暂无数据</li>
                </ol>
            </div>

            <div class="tipswrap" @click.stop="tipswrap=false" v-if="tipswrap">
              <div class="tiptxt" @click.stop="fnstop">
                <p>全网日产出vpn量：全网用户钱包激活总量 * 2vpn</p>
                <p class="margintop">我的算力值：我的钱包持币vpn总量^0.5</p>
                <p class="margintop">裂变总收益：</p>
                <p>每轮推广收益总产出*个人推广算力/全网推广算力总和</p>

                <p class="margintop">聚变总收益：</p>
                <p>正常聚变收益+加速聚变收益</p>

                <p class="margintop">正常聚变收益（全网产出vpn总量<500000）：</p>
                <p>2*全网用户钱包激活总量*个人持币算力值/全网用户持币算力值</p>

                <p class="margintop">正常聚变收益（全网产出vpn总量>500000）：</p>
                <p>500000*个人持币算力值/全网用户持币算力值</p>

                <p class="margintop">加速聚变收益（闪兑vpn量*2<充值vpn总量）：</p>
                <p>2*全网用户钱包激活总量*【（兑换获得的VPN量*2+兑换获得的VPN量）^0.5】/全网用户持币算力值*50%</p>

                <p class="margintop">加速聚变收益（闪兑vpn量*2=充值vpn量）：</p>
                <p>2*全网用户钱包激活总量*【（充值vpn量+兑换获得的vpn量）^0.5】/ 全网用户持币算力值*50%</p>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import {phoneshow} from '@/utils/index'
export default {
  components: {},
  data() {
    return {
      // enable 是否激活核聚变, 0 否, 1 是
      invite_reward_total: '',//核裂变总收益
      static_reward_total: '',//核聚变总收益
      last_invite_reward : '',//上轮裂变收益
      last_static_reward: '',//上轮聚变收益
      my_hashrate: '',//我的算力
      my_hashrate_static: '',//我的算力 聚变
      my_hashrate_invite: '',//我的算力 裂变
      total_hashrate: '',//全网算力
      total_hashrate_static: '',//全网算力 聚变
      total_hashrate_invite: '',//全网算力 裂变
      total_out: '',// 上轮产币
      total_out_static:'', //上轮产币 聚变
      total_out_invite:'',//上轮产币 裂变

      top10list:[],

      userjhstatus: -1, //默认为非激活状态  1 未激活 2 已激活
      indextabs: [
        require("@/assets/imgs/index/zsy.png"),
        require("@/assets/imgs/index/clsy.png"),
        require("@/assets/imgs/index/wdsl.png"),
        require("@/assets/imgs/index/clcb.png"),
        require("@/assets/imgs/index/qwsl.png"),
      ],
      currentindex: 0, //默认tab 项为 总收益

      tipswrap:false,//首页提示弹窗 默认状态 false
      gzjg:'',//共振价格
    };
  },
  computed: {},
  methods: {
    phoneshow(val){
      return phoneshow(val);
    },
    pageinit(){
      this.get_inforeward();
      this.get_inforewardtop10();
    },
    // 奖励信息获取
    get_inforeward(){
      let zs = this;
      this.$toast.loading({
          duration:0,
          forbidClick:true,
      })
      this.api.bussiness.get_inforeward({

      }).then(res=>{
        zs.$toast.clear();
        if(res.data.code===0){
          zs.userjhstatus = res.data.data.enable==1?2:1;
          zs.invite_reward_total= res.data.data.invite_reward_total;
          zs.static_reward_total= res.data.data.static_reward_total;
          zs.last_invite_reward= res.data.data.last_invite_reward;
          zs.last_static_reward= res.data.data.last_static_reward;
          zs.my_hashrate= res.data.data.my_hashrate;
          zs.my_hashrate_static= res.data.data.my_hashrate_static;
          zs.my_hashrate_invite= res.data.data.my_hashrate_invite;
          zs.total_hashrate= res.data.data.total_hashrate;
          zs.total_hashrate_static= res.data.data.total_hashrate_static;
          zs.total_hashrate_invite= res.data.data.total_hashrate_invite;
          zs.total_out= res.data.data.total_out;
          zs.total_out_static= res.data.data.total_out_static;
          zs.total_out_invite= res.data.data.total_out_invite;
          zs.gzjg= res.data.data.price;

          // invite_reward_total: '',//核裂变总收益
          // static_reward_total: '',//核聚变总收益
          // last_invite_reward : '',//上轮裂变收益
          // last_status_reward: '',//上轮聚变收益
          // my_hashrate: '',//我的算力
          // total_hashrate: '',//全网算力
          // total_out: '',// 上轮产币
        }else{
          zs.$toast(res.data.msg)
        }
      })
    },
    // 奖励top10获取
    get_inforewardtop10(){
      this.$toast.loading({
          duration:0,
          forbidClick:true,
      })
      let zs = this;
      this.api.bussiness.get_inforewardtop10({

      }).then(res=>{
        zs.$toast.clear();
        if(res.data.code===0){
          zs.top10list = res.data.data;
        }else{
          zs.$toast(res.data.msg)
        }
      })
    },
    // 路有跳转
    goto(name) {
      this.$router.push({
        name,
      });
    },
    // tab点击事件
    indextabchange(index){
      this.currentindex = index;
    },
    fnstop(){
      return false;
    }
  },
  mounted() {
    this.pageinit();
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
  .container {
    position: relative;
    .tabnav {
      position: absolute;
      top: 0.24rem;
      display: flex;
      justify-content: center;
      width: 100%;
      cursor: pointer;
      z-index: 100;
      p {
        margin: 0 0.28rem;
        font-size: 0.28rem;
        line-height: 0.4rem;
        height: 0.4rem;
        padding-bottom: 2px;
        font-weight: bold;
        cursor: pointer;
        &.active {
          border-bottom: 2px solid #fff;
        }
      }
    }
    .tips {
      position: absolute;
      right: 0.3rem;
      top: 0.24rem;
      font-size: 0.28rem;
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
      z-index: 100;
    }
    .contnt1top {
      padding-top: 2.22rem;
      box-sizing: border-box;
      height: 8.6rem;
      position: relative;
      span {
        display: block;
        line-height: 0.5rem;
        color: #fff;
        font-size: 0.36rem;
        margin-bottom: 1px;
        text-align: center;
      }
      .btn {
        cursor: pointer;
        position: absolute;
        left: 50%;
        bottom: 3.62rem;
        transform: translateX(-50%);
        height: 0.72rem;
        width: 2.58rem;
        border-radius: 0.1rem;
        color: #fff;
        border: 1px solid #fff;
        font-size: 0.25rem;
        text-align: center;
        line-height: 0.72rem;
      }
      .fixeddom {
        position: absolute;
        left: 50%;
        bottom: -1.68rem;
        transform: translateX(-50%);
        width: 7.5rem;
        height: 2.54rem;
        background: url("./../../../assets/imgs/index/topshadowbg.png")
          no-repeat center center;
        background-size: cover;
        box-sizing: border-box;
        padding: 0.36rem 0 1.26rem;
        text-align: center;
        p {
          font-size: 0.24rem;
          line-height: 0.34rem;
          margin-bottom: 0.08rem;
          color: #fff;
        }
      }
    }
    .contnt1bottom {
      //   padding: 1.06rem 0.3rem 0;
      padding: 1.06rem 0.3rem 0.78rem;
      // min-height:2.36rem;
      min-height:3.3rem;
      background-color: #fff;
      & > p {
        font-size: 0.36rem;
        color: rgba(0, 0, 0, 1);
        font-weight: bold;
        margin-bottom: 0.14rem;
      }
      ol {
        li {
          span {
            color: rgba(0, 0, 0, 1);
            font-size: 0.24rem;
            line-height: 0.34rem;
            margin-bottom: 0.24rem;
            float: left;
            &.right {
              float: right;
              padding-right: 0.04rem;
            }
          }
          .xh {
            margin-right: 0.36rem;
          }
        }
      }
    }
  }
  .container2 {
      position: relative;
    .contnt2top {
      .timerwrap {
        background: linear-gradient(
          41deg,
          rgba(2, 2, 113, 0.18),
          rgba(203, 31, 163, 0.18)
        );
        padding: 18px 0 20px;
        padding: 0.18rem 0 0.20rem;
        span {
          color: rgba(255, 255, 255, 1);
          display: block;
          text-align: center;
          &.sp1 {
            line-height: 22px;
            margin-bottom: 0.08rem;
            font-size: 16px;
          }
          &.sp2 {
            line-height: 16px;
            margin-top: 0.12rem;
            font-size: 12px;
          }
        }
        .lasttimewrap {
          line-height: 40px;
          font-size: 28px;
        }
      }
      .tabswrap {
        padding: 0.18rem 0 0.34rem;
        display: flex;
        justify-content: space-around;
        img {
          height: 0.34rem;
          width: auto;
          position: relative;
          &.active {
            padding-bottom: 0.04rem;
            border-bottom: 2px solid rgba(255, 255, 255, 0.726);
          }
          cursor: pointer;
        }
        .img{
          cursor: pointer;
          height: 0.34rem;
          line-height: 0.34rem;
          font-size: 0.23rem;
          color: #ffffffe0;
          &.active {
            padding-bottom: 0.04rem;
            border-bottom: 2px solid rgba(255, 255, 255, 0.726);
          }
        }
        .wh {
          height: 0.34rem;
          width: 0.34rem;
          cursor: pointer;
        }
      }
    }
    .contnt2center {
      padding-bottom: 0.58rem;
      .contnt {
        width: 6.78rem;
        border-radius: 0.16rem;
        margin: 0 auto 0.26rem;
        padding: 0.6rem 0 0.5rem;
        background-color: rgba(255, 255, 255, 0.4);
        &:last-child {
          margin-bottom: 0;
        }
        img {
          height: 0.56rem;
          width: auto;
          display: block;
          margin: 0 auto 0.06rem;
        }
        .title{
          letter-spacing: 2px;
          font-size: 0.36rem;
          text-align: center;
          line-height: 0.56rem;
          color: #fffffff0;
        }
        p {
          height: 0.96rem;
          line-height: 0.96rem;
          font-size: 0.68rem;
          font-weight: bold;
          text-align: center;
          color: #fff;
        }

        &.big{
          padding:1.56rem 0 2.08rem;
          margin-bottom: 0.42rem;
        }
      }
    }
    .contnt2bottom {
      //   padding-top: 1rem;
      //   padding-bottom: 0.78rem;
      padding: 1rem 0.3rem 0.78rem;
      // min-height:2.66rem;
      min-height:2.67rem;
    }


    .tipswrap{
      position: absolute;
      left: 50%;
      top: -0.88rem;
      transform: translate(-50%,0);
      z-index: 1001;
      width:7.5rem;
      height: 100vh;
      background: transparent;
      .tiptxt{
        position: absolute;
        left: 0.15rem;
        // top:calc(1.98rem + 78px);
        top:calc(1.98rem + 78px + 0.14rem + 8px);
        width:7.2rem;
        box-sizing:border-box;
        padding:0.5rem 0.3rem 0.2rem;
        background:#000;
        color:#fff;
        font-size:0.22rem;
        .margintop{
          margin-top:0.3rem;
        }
        &::after{
          content:'';
          position: absolute;
          right: 0.07rem;
          bottom: 100%;
          width: 0;
          height: 0;
          border: 0.14rem solid transparent;
          border-bottom-color: #000;
        }
      }
    }
  }
}
</style>