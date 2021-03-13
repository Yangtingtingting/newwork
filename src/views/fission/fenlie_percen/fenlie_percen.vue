<!-- 组件说明 -->
<template>
    <div class="haveheaderbar">
        <headerbar :title="'好友'" :ifgocenter="false"></headerbar>
        <div class="top">
            <p>{{$route.query.invite_number}}</p>
            <p>分裂数</p>
            <div class="selectbox">
                <p class="currnet">{{select_arr[current_index]}}</p>
                <img src="@/assets/imgs/fission/sjx.png" :class="{selecting:select_status}">
                <!-- <img src="@/assets/imgs/fission/sjx.png" :class="{selecting:select_status}" @click="select_status=!select_status">
                <ul v-show="select_status">
                    <li @click="current_index= index;select_status=!select_status" v-for="(item,index) in select_arr" :key="index">{{item}}</li>
                </ul> -->
            </div>
        </div>
        <div class="datalist">
            <!-- <div class="datali clearfix" v-for="(item,index) in 2" :key="index+'test'">
                <img src="@/assets/imgs/percenter/headerpic.png">
                <p>{{phoneshow(15900002222)}}</p>
                <div class="right">
                    <div class="time">2020-4-12 19:34</div>
                    <div class="status">已激活</div>
                </div>
            </div> -->
            <div class="datali clearfix" v-for="(item,index) in pagelist" :key="index">
                <img src="@/assets/imgs/percenter/headerpic.png">
                <p>{{phoneshow(item.phone)}}</p>
                <div class="right">
                    <div class="time">{{item.ctime}}</div>
                    <div class="status">{{item.enable==1?'已激活':'未激活'}}</div>
                </div>
            </div>
            <!-- <div class="datali clearfix" v-if="bottommore" style="text-align:center;">
                暂无更多数据
            </div> -->
            <div @click="morebtnclick" class="morebtn" v-if="bottommore">点击加载更多</div>
            <div class="morebtn" v-if="!bottommore">暂无更多数据</div>
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
                select_status:false,//默认为非选择状态
                current_index:0,
                select_arr:[
                    '好友','团队','团队','团队','团队'
                ],
                pagelist:[],
                total:'',//总条数
                bottommore:false,//是否还有更多数据
                pagenumber:1,
            };
        },
        computed: {

        },
        methods: {
            morebtnclick(){
                this.pagenumber=this.pagenumber+1;
                this.get_infoinviteusers();
            },
            phoneshow(phone){
                return phoneshow(phone)
            },
            get_infoinviteusers(){
                let zs = this;
                this.$toast.loading({
                    duration:0,
                    forbidClick:true,
                })
                this.api.bussiness.get_infoinviteusers({
                    page:zs.pagenumber,
                    count:20,
                }).then(res=>{
                    zs.$toast.clear();
                    if(res.data.code===0){
                        zs.pagelist = zs.pagelist.concat(res.data.data);
                        
                        if(zs.pagelist.length<res.data.total){
                            zs.bottommore=true;
                        }else{
                            zs.bottommore=false;
                        }
                    }else{
                        zs.$toast(res.data.msg);
                    }
                })
            },
        },
        mounted() {
            this.get_infoinviteusers(1);
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
@import url("./../../../assets/css/common.less");
.haveheaderbar{
    color:#000;
    .top{
        background-color: #fff;
        padding:0.5rem 0;
        position: relative;
        &>p{
            text-align:center;
            font-size: 0.28rem;
            font-weight: bold;
            height: 0.4rem;
            line-height: 0.4rem;
            // &:first-child{
            //     font-weight: normal;
            // }
        }
        .selectbox{
            position: absolute;
            right: 0.34rem;
            top: 0.5rem;
            display: flex;
            &>p{
                line-height: 0.4rem;
                font-size: 0.28rem;
                margin-right:0.08rem;
                font-weight:bold;
            }
            img{
                width: 0.28rem;
                height: 0.14rem;
                padding-top: 0.18rem;
                cursor: pointer;
                &.selecting{
                    transform: rotate(90deg);
                }
            }
            ul{
                position: absolute;
                right: 0;
                top:0.4rem;
                li{
                    cursor: pointer;
                    font-size: 0.22rem;
                    line-height: 0.4rem;
                    background:#fff;
                    padding:0 0.4em;
                }
            }
        }
    }
    .datalist{
        min-height:calc(100vh - 2.68rem);
        background-color: #fff;
        padding:0 0.4rem 0.5rem;
        .datali{
            &>*{
                float: left;
                &.right{
                    float: right;
                    padding-top: 0.12rem;
                    .time,.status{
                        color:rgba(99, 97, 97, 1);
                        font-size:0.24rem;
                        line-height:0.34rem;
                        font-weight:bold;
                        text-align:right;
                    }
                }
            }
            &:first-child{
                border-top: 2px solid rgba(204, 203, 203, 1);
                padding:0.46rem 0 0;
            }
            padding:0.64rem 0 0;
            img{
                width: 0.9rem;
                height: 0.9rem;
                margin-right: 0.24rem;
            }
            p{
                padding-top: 0.12rem;
                line-height: 0.4rem;
                font-size: 0.28rem;
                color: #000;
                font-weight:bold;
            }
        }
    }
    .morebtn{
        cursor:pointer;
        text-align:center;
        color:#000;
        padding:0.1rem 0;
    }
}
</style>

<style lang='less'>
//@import url()

</style>