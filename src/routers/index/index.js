export default [{
        path: '/',
        redirect: '/index/home'
    },
    //首页
    //首页 二级 首页
    {
        path: 'home',
        name: 'index',
        component: () =>
            import ('./../../views/index/index/index.vue'),
        meta: {
            name: 'index',
            navstatus: true,
            //面包屑需要的参数
            breadnav: [{
                name: '首页',
                url: '/index/home',
            }]
        }
    },
    // // 商城  店铺页面
    // {
    //     path: 'shopowner',
    //     name: 'shopowner',
    //     component: resolve => require(['./../../views/shop/shopowner/index.vue'], resolve),
    //     meta: {
    //         name: 'shopowner',
    //         navstatus: false,
    //         //面包屑需要的参数
    //         breadnav: [{
    //                 name: '商城首页',
    //                 url: '/shop/index',
    //             },
    //             {
    //                 name: '商城店主页页',
    //                 url: '/shop/shopowner',
    //             },
    //         ]
    //     }
    // },
]