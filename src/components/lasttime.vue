<!-- 组件说明 -->
<template>
    <div class="lasttimewrap">
        {{lasttimeinnerhtml2}}
    </div>
</template>

<script>
    export default {
        name:'lasttime',
        props: {
            targettime: {
                type: Number,
                default: 0,
            },
        },
        watch:{
        },
        components: {

        },
        data () {
            return {
                // lasttimeinnerhtml:
                lasttimeinnerhtml2:'--小时--分--秒',
            };
        },
        computed: {
            lasttimeinnerhtml(){
                let zs = this;
                if(zs.targettime!==0){
                    return "时间:"+zs.targettime;
                }else{
                    return '--小时--分--秒';
                }
            }
        },
        methods: {
            getsettime(){
                let zs = this;
                let time12 = new Date(new Date(new Date().toLocaleDateString()).getTime()+12*60*60*1000-1).getTime();//一天是86400秒
                let time12_tom = new Date((new Date(new Date().toLocaleDateString()).getTime()+12*60*60+86400)*1000-1).getTime();//一天是86400秒
                let showtime='';
                let currenttime = new Date().getTime();
                if(time12-currenttime<0){
                    // 现在已经过了中午12点了
                    showtime = time12_tom - currenttime;
                }else if(time12-currenttime>0){
                    showtime = time12-currenttime;
                }else{
                    this.$emit('getnewlist');
                }
                zs.lasttimeinnerhtml2=zs.date_format(showtime);
            },
            date_format(micro_second) {
                // 总秒数
                var second = Math.floor(micro_second / 1000);
                // 天数
                var day = Math.floor(second / 3600 / 24);
                // 小时
                var hr = Math.floor(second / 3600 % 24);
                // 分钟
                var min = Math.floor(second / 60 % 60);
                // 秒
                var sec = Math.floor(second % 60);
                // return day + "天" + hr + "小时" + min + "分钟" + sec + "秒";
                return hr + "小时" + min + "分钟" + sec + "秒";
            },
        },
        mounted() {
            setInterval(this.getsettime,500);
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
    .lasttimewrap{
        line-height:0.5rem;
        font-size:0.36rem;
        font-weight:bold;
        text-align:center;
    }
</style>