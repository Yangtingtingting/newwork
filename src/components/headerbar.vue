<template>
    <div class="topbanner">
        <img class="goback" v-if="!ifgocenter" src="@/assets/imgs/common/goback.png" @click="goback">
        <img v-if="ifgocenter" src="@/assets/imgs/index/percenterbtn.png" @click="gocenter">
        <p>{{title}}</p>
        <span @click="goto(rightentry)">{{rightentry}}</span>
    </div>
</template>

<script>
export default {
  name: "headerbar",
  components: {},
  props: {
    title: {
      type: String,
      default: "title",
    },
    rightentry: {
      type: String,
      default: "",
    },
    ifgocenter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    gocenter() {
      this.$router.push({ name: "percenter" });
    },
    goto(name){
      if(name=='充值记录'){
        this.$router.push({ name: "payhistory" });
      }else if(name=='提币记录'){
        this.$router.push({ name: "dissavinghistory" });
      }
    }
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
};
</script>

<style lang='less' scoped>
.topbanner {
  height: 0.88rem;
  line-height: 0.88rem;
  position: fixed;
  left: 50%;
  top:0;
  z-index: 1000;
  width: 7.5rem;
  transform: translateX(-50%);
  background-color: #04122D;
  & > img {
    position: absolute;
    left: 0.32rem;
    top: 50%;
    transform: translateY(-50%);
    height: 0.5rem;
    width: 0.5rem;
    object-fit: contain;
    &.goback{
        width: 0.1861rem;
        height: 0.3359rem;
    }
    cursor: pointer;
  }
  p {
    text-align: center;
    color: #FFF;
    font-size: 0.34rem;
    line-height: 0.88rem;
    font-weight: bold;
    letter-spacing: 0.35em;
  }
  span{
    position: absolute;
    right: 0.32rem;
    top:50%;
    transform: translateY(-50%);
    color: #fff;
    font-size: 0.34rem;
    cursor: pointer;
  }
}
</style>

<style lang='less'>
//@import url()
</style>