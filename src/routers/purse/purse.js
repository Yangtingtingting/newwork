export default [{
        path: '/',
        redirect: '/purse/index'
    },
    //钱包
    //钱包 二级 首页
    {
        path: 'index',
        name: 'purseindex',
        component: () =>
            import ('./../../views/purse/purseindex/purseindex.vue'),
        meta: {
            name: 'purseindex',
            // navstatus: false,
            navstatus: true,
            //面包屑需要的参数
            breadnav: [{
                name: '钱包首页',
                url: '/purse/index',
            }]
        }
    },
    //钱包 二级   单独币种的首页
    {
        path: 'coinindex',
        name: 'pursecoinindex',
        component: () =>
            import ('./../../views/purse/pursecoinindex/pursecoinindex.vue'),
        meta: {
            name: 'pursecoinindex',
            // navstatus: false,
            navstatus: false,
            //面包屑需要的参数
            breadnav: [{
                name: '钱包当前币种首页',
                url: '/purse/coinindex',
            }]
        }
    },
    //钱包 二级 充值
    {
        path: 'pay',
        name: 'pay',
        component: () =>
            import ('./../../views/purse/pay/pay.vue'),
        meta: {
            name: 'pay',
            // navstatus: false,
            navstatus: false,
            //面包屑需要的参数
            breadnav: [{
                name: '钱包充值',
                url: '/purse/pay',
            }]
        }
    },
    //钱包 三级 充值记录
    {
        path: 'pay/payhistory',
        name: 'payhistory',
        component: () =>
            import ('./../../views/purse/pay/payhistory.vue'),
        meta: {
            name: 'payhistory',
            // navstatus: false,
            navstatus: false,
            //面包屑需要的参数
            breadnav: [{
                name: '充值记录',
                url: '/purse/pay/payhistory',
            }]
        }
    },
    //钱包 四级 充值记录==详情页
    {
        path: 'pay/paydetails',
        name: 'paydetails',
        component: () =>
            import ('./../../views/purse/pay/payhistory_details.vue'),
        meta: {
            name: 'paydetails',
            // navstatus: false,
            navstatus: false,
            //面包屑需要的参数
            breadnav: [{
                name: '充值详情',
                url: '/purse/pay/paydetails',
            }]
        }
    },
    //钱包 二级 提币
    {
        path: 'dissaving',
        name: 'dissaving',
        component: () =>
            import ('./../../views/purse/dissaving/dissaving.vue'),
        meta: {
            name: 'dissaving',
            // navstatus: false,
            navstatus: false,
            //面包屑需要的参数
            breadnav: [{
                name: '钱包提币',
                url: '/purse/dissaving',
            }]
        }
    },
    //钱包 三级 提币记录
    {
        path: 'dissaving/dissavinghistory',
        name: 'dissavinghistory',
        component: () =>
            import ('./../../views/purse/dissaving/dissavinghistory.vue'),
        meta: {
            name: 'dissavinghistory',
            // navstatus: false,
            navstatus: false,
            //面包屑需要的参数
            breadnav: [{
                name: '提币记录',
                url: '/purse/dissaving/dissavinghistory',
            }]
        }
    },
    //钱包 四级 提币记录==详情页
    {
        path: 'dissaving/dissavingdetails',
        name: 'dissavingdetails',
        component: () =>
            import ('./../../views/purse/dissaving/dissaving_details.vue'),
        meta: {
            name: 'dissavingdetails',
            // navstatus: false,
            navstatus: false,
            //面包屑需要的参数
            breadnav: [{
                name: '提币详情',
                url: '/purse/dissaving/dissavingdetails',
            }]
        }
    },
    //钱包 二级 闪兑
    {
        path: 'flashexchange',
        name: 'flashexchange',
        component: () =>
            import ('./../../views/purse/flashexchange/flashexchange.vue'),
        meta: {
            name: 'flashexchange',
            // navstatus: false,
            navstatus: false,
            //面包屑需要的参数
            breadnav: [{
                name: '闪兑',
                url: '/purse/flashexchange',
            }]
        }
    },
]