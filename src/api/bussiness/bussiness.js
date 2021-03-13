/**
 * login模块接口列表
 */

import base from '../base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import axios_json from '@/request/http_json'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const bussiness = {
    // 奖励排行 top10
    get_inforewardtop10(params) {
        return axios.get(`${base.yxf}/api/info/reward/top10`, { params });
    },
    // 奖励信息
    get_inforeward(params) {
        return axios.get(`${base.yxf}/api/info/reward`, { params });
    },

    // 奖励记录
    get_infoinviterecord(params) {
        return axios.get(`${base.yxf}/api/info/reward/record`, { params });
    },

    // 邀请用户列表
    get_infoinviteusers(params) {
        return axios.get(`${base.yxf}/api/info/invite/users`, { params });
    },
    // 支持的币种列表
    get_walletcoin(params) {
        return axios.get(`${base.yxf}/api/wallet/coin`, { params });
    },
    // 获取充币地址
    post_walletrechargeaddress(params) {
        return axios_json.post(`${base.yxf}/api/wallet/recharge/address`, params);
    },
    // 获取资产信息
    get_walletinfo(params) {
        return axios.get(`${base.yxf}/api/wallet/info`, { params });
    },
    // 充币记录
    get_walletrechargerecord(params) {
        return axios.get(`${base.yxf}/api/wallet/recharge/record`, { params });
    },

    // 申请提现
    post_walletwithdraw(params) {
        return axios_json.post(`${base.yxf}/api/wallet/withdraw`, params);
    },
    // 提现记录
    get_walletwithdrawrecord(params) {
        return axios.get(`${base.yxf}/api/wallet/withdraw/record`, { params });
    },
    // 闪兑 操作
    post_walletexchange(params) {
        return axios_json.post(`${base.yxf}/api/wallet/exchange`, params);
    },
    // 闪兑 记录
    get_walletexchangerecord(params) {
        return axios.get(`${base.yxf}/api/wallet/exchange/record`, { params });
    },
}

export default bussiness;