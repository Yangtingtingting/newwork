/**
 * login模块接口列表
 */

import base from '../base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import axios_json from '@/request/http_json'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const userapis = {
    // ========================↓↓↓↓↓↓↓demo参考接口格式↓↓↓↓↓↓↓↓↓↓======================================
    // 【get请求】
    //获取所有成员接口
    memberall(params) {
        return axios.get(`${base.yxf}/wapi/v1/shiro/user/select/tree`, { params });
    },
    // 【普通的post请求】
    // 登录接口 
    ulogin2(params) {
        return axios.post(`${base.yxf}/wapi/v1/pls/stable/login`, qs.stringify(params));
    },
    // 【json格式的post请求】
    // 客服消息更新
    complsug_complaintLogUpdate(params) {
        return axios_json.post(`${base.yxf}/wapi/v1/complaint/complaintLogUpdate`, params);
    },
    // ========================↓↓↓↓↓↓↓当前页面的接口↓↓↓↓↓↓↓↓↓↓======================================


    // 获取图形验证码
    get_img_code(params) {
        return axios.get(`${base.yxf}/api/msg/img_code`, { params });
    },
    // ========注册相关的============
    // 获取短信验证码-注册
    post_msg_register(params) {
        return axios_json.post(`${base.yxf}/api/msg/register`, params);
    },
    // 用户注册
    post_register(params) {
        return axios_json.post(`${base.yxf}/api/user/register`, params);
    },

    // 登录相关的
    // 【密码登陆】  回调 返还token用户凭证token, 用于后续身份认证
    post_userlogin(params) {
        return axios_json.post(`${base.yxf}/api/user/login`, params);
    },
    // 获取短信验证码-登陆
    get_loginneedmsg(params) {
        return axios_json.post(`${base.yxf}/api/msg/login`, params);
    },
    // 【短信登陆】
    post_smslogin(params) {
        return axios_json.post(`${base.yxf}/api/user/sms/login`, params);
    },

    // 重置密码相关
    // 获取短信验证码-重置密码
    get_msgpassword(params) {
        return axios_json.post(`${base.yxf}/api/msg/password`, params);
    },
    // 【重置密码】
    post_reset_password(params) {
        return axios_json.post(`${base.yxf}/api/user/reset_password`, params);
    },


    // 用户信息
    get_userinfo(params) {
        return axios.get(`${base.yxf}/api/user/info`, { params });
    },

    // 通过邀请码获取用户信息
    get_userinfobycode(params) {
        return axios.get(`${base.yxf}/api/user/code`, { params });
    },
    // 邀请信息  分裂首页数据
    get_userinvite_info(params) {
        return axios.get(`${base.yxf}/api/user/invite_info`, { params });
    },



}

export default userapis;