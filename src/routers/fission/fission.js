export default [{
        path: '/',
        redirect: '/fission/index'
    },
    //分裂
    //分裂 二级 首页
    {
        path: 'index',
        name: 'fissionindex',
        component: () =>
            import ('./../../views/fission/fissionindex/fissionindex.vue'),
        meta: {
            name: 'fissionindex',
            navstatus: true,
            //面包屑需要的参数
            breadnav: [{
                name: '分裂首页',
                url: '/fission/index',
            }]
        }
    },
    //分裂 二级 好友
    {
        path: 'fenlie_percen',
        name: 'fenlie_percen',
        component: () =>
            import ('./../../views/fission/fenlie_percen/fenlie_percen.vue'),
        meta: {
            name: 'fenlie_percen',
            navstatus: false,
            //面包屑需要的参数
            breadnav: [{
                name: '好友',
                url: '/fission/fenlie_percen',
            }]
        }
    },
    //分裂 二级 收益
    {
        path: 'fenlie_val',
        name: 'fenlie_val',
        component: () =>
            import ('./../../views/fission/fenlie_val/fenlie_val.vue'),
        meta: {
            name: 'fenlie_val',
            navstatus: false,
            //面包屑需要的参数
            breadnav: [{
                name: '分裂收益',
                url: '/fission/fenlie_val',
            }]
        }
    },
]