<template>
  <!-- <div id="app" @mousemove="appmousemove" @mouseover="appmousemove"> -->
  <div id="app">
    <template v-if="!launchdomstatus">
      <router-view/>
      <div class="bottomnav" v-show="bottomnavifshow">
        <router-link :to="{name:'index'}">
          <div class="default">
            <img src="@/assets/imgs/bottomnav/index.png" alt="" srcset="">
            <span>首页</span>
          </div>
          <div class="active homeicon">
            <img src="@/assets/imgs/bottomnav/indexactive.png" alt="" srcset="">
            <span>首页</span>
          </div>
        </router-link>
        <router-link :to="{name:'fissionindex'}">
          <div class="default">
            <img src="@/assets/imgs/bottomnav/fission.png" alt="" srcset="">
            <span>分裂</span>
          </div>
          <div class="active">
            <img src="@/assets/imgs/bottomnav/fissionactive.png" alt="" srcset="">
            <span>分裂</span>
          </div>
        </router-link>
        <router-link :to="{name:'purseindex'}">
          <div class="default">
            <img src="@/assets/imgs/bottomnav/purse.png" alt="" srcset="">
            <span>钱包</span>
          </div>
          <div class="active">
            <img src="@/assets/imgs/bottomnav/purseactive.png" alt="" srcset="">
            <span>钱包</span>
          </div>
        </router-link>
      </div>
    </template>
    <template v-if="launchdomstatus">
      <div class="launchdom">
        <img src="@/assets/logo.png">
        <p>网络共生</p>
        <span>只为价值而生</span>
      </div>
    </template>
  </div>
</template>
<script>

    import {remset} from './utils/remset.js';
    export default {
        components: {
        
        },
        data () {
            return {
                // 响应式类别
                showtype:'normal',
                // 底部主导航是否显示，默认为显示
                bottomnavifshow:false,

                lastTime:'',
                currentTime:'',
                timeOut:29*60*1000,
                setIntervaltestTime:'',//检测操作状态的计时器

                launch_time:'',//启动时刻的时间
                launchdomstatus:true,
            };
        },
        computed: {

        },
        methods: {
          // 超时检测
          testTime:function(){
            // console.log('超时检测方法执行');
            let that = this;
            that.currentTime = new Date().getTime(); //更新当前时间
            if(that.currentTime - that.lastTime > that.timeOut){ //判断是否超时
                // console.log("超时");
                this.logout();
            }
          },
          appmousemove:function(){
            this.lastTime = new Date().getTime();
          },
          // 退出登录
          logout() {
            this.$store.commit("resetuserdata");
            this.$router.push({ path: "/login" });
          },



          showtypeset:function(){
            let w = document.documentElement.offsetWidth || document.body.offsetWidth;
            // console.log(w);
            if(w >= 1190){
                this.showtype = 'normal';
                // console.log('大于等于1190的正常屏幕===参考1190设计稿')
            }else if(990 <= w && w < 1190){
                this.showtype = 'middle';
                // console.log('大于等于990小于1190的中等屏幕===参考990设计稿')
            }else if(w < 990){
                this.showtype = 'small'
                // console.log('小于990的小屏幕 用rem适配移动端===参考移动端设计稿')
            }
          }
        },
        created(){
          this.launch_time=new Date().getTime();
          // console.log(this.launch_time);
        },
        mounted() {
            remset(750);
            let that = this;
            this.showtypeset();
            window.onresize = () => {
              that.showtypeset();
              remset(750);
            };
            
            // 加载完成后添加session保存启动状态
            // console.log(sessionStorage.getItem("createdtime"));
            
            let setcreatedtime = Number(sessionStorage.getItem("createdtime")===null?0:sessionStorage.getItem("createdtime"));
            // console.log(setcreatedtime);
            
            sessionStorage.setItem("createdtime" , setcreatedtime+1);
        },
        watch:{
          $route(to,from){
            // console.log(to,+'-----',from);
            if(to.meta.navstatus==true){
              this.bottomnavifshow = true;
            }else{
              this.bottomnavifshow = false;
            }
          }
        },
        // beforeCreate() {
        // }, //生命周期 - 创建之前
        beforeMount() {
          let zs = this;
          if(sessionStorage.getItem("createdtime")>0){
            zs.launchdomstatus=false;
          }else{
            setTimeout(() => {
              zs.launchdomstatus=false;
            }, 2000-(new Date().getTime()-zs.launch_time));//TODO:默认展示启动页两秒时间
          }
        }, //生命周期 - 挂载之前
        // beforeUpdate() {}, //生命周期 - 更新之前
        // updated() {}, //生命周期 - 更新之后
        // beforeDestroy() {}, //生命周期 - 销毁之前
        // destroyed() {}, //生命周期 - 销毁完成 
        // activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>


<style lang="less" scoped>
@import url('./assets/css/reset.css');
@import './assets/css/common.less';
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width:7.5rem;
  min-height: 100vh;
  margin: 0 auto;
  box-shadow: 0 0 5px #ccc;
  background:linear-gradient(135deg, #040217, #600E3F,#000002); 
  .bottomnav{
    position: fixed;
    left: 50%;
    bottom: 0px;
    transform: translateX(-50%);
    height: 1.66rem;
    width: 7.5rem;
    background-color: @bgcolor;
    z-index: 1000;
    display: flex;
    justify-content: space-around;
    box-shadow: 0 0 0 1px @bgcolor;
    a{
      position: relative;
      width: 1.1rem;
      .default,.active{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 100%;
        img{
          height: 0.48rem;
          width: auto;
          display: block;
          margin: 0 auto 0.08rem;
        }
        span{
          font-size: 0.24rem;
          font-weight:500;
          color: #000;
          line-height: 0.34rem;
          display: block;
          text-align: center;
        }
      }
      .active{
        display: none;
        span{
          color: #000;
        }
      }

      &.router-link-exact-active{
        .default{
          display: none;
        }
        .active{
          display: block;
        }
      }
    }
  }
  .launchdom{
    width:100vw;
    height:100vh;
    position:fixed;
    left:0;
    top:0;
    background:linear-gradient(135deg, #040217, #600E3F,#000002); 
    img{
      width:3.06rem;
      height:auto;
      position:absolute;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
    }
    p,span{
      position:fixed;
      left:0;
      width:100%;
      text-align:center;
    }
    p{
      font-size:0.6rem;
      color:#fff;
      font-weight:bold;
      line-height:0.84rem;
      bottom:12.8%;
      letter-spacing:0.3em;
    }
    span{
      font-size:0.36rem;
      color:rgba(255,255,255,0.8);
      line-height:0.5rem;
      bottom:9.72%;
      letter-spacing:0.35em;
    }
  }
}
</style>
<style lang="less" scoped>
// @import './assets/css/common.less';
</style>
