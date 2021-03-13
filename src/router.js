import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './components/NotFound.vue'
import index_children from './routers/index/index' //首页
import fission_children from './routers/fission/fission' //分裂
import purse_children from './routers/purse/purse' //钱包
import needloginroute from './routers/needloginroute.js'

// 解决vue项目路由出现message: "Navigating to current location (XXX) is not allowed"的问题 、、监听是否有操作时报错
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}


Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: resolve => require(['./views/index/index.vue'], resolve),
            meta: {
                name: 'index',
                navstatus: true,
                breadnav: [{
                    name: '首页',
                    url: '/index',
                }]
            },
            children: index_children
        },
        {
            path: '/fission',
            // name: 'fission',
            component: resolve => require(['./views/fission/fission.vue'], resolve),
            meta: {
                name: 'fission',
                navstatus: true,
                breadnav: [{
                    name: '分裂',
                    url: '/fission',
                }]
            },
            children: fission_children
        },
        {
            path: '/purse',
            // name: 'purse',
            component: resolve => require(['./views/purse/purse.vue'], resolve),
            meta: {
                name: 'purse',
                navstatus: true,
                breadnav: [{
                    name: '钱包',
                    url: '/purse',
                }]
            },
            children: purse_children
        },
        {
            //登录页
            path: '/login',
            name: 'login',
            component: resolve => require(['./views/login/login.vue'], resolve),
            meta: {
                name: 'login',
                navstatus: false,
                breadnav: [{
                    name: '登录',
                    url: '/login',
                }]
            },
        },
        {
            //登录页
            path: '/forgetpswd',
            name: 'forgetpswd',
            component: resolve => require(['./views/login/forgetpswd.vue'], resolve),
            meta: {
                name: 'forgetpswd',
                navstatus: false,
                breadnav: [{
                    name: '忘记密码',
                    url: '/forgetpswd',
                }]
            },
        },
        {
            //个人信息页
            path: '/percenter',
            name: 'percenter',
            component: resolve => require(['./views/percenter/percenter.vue'], resolve),
            meta: {
                name: 'percenter',
                navstatus: false,
                breadnav: [{
                    name: '个人中心',
                    url: '/percenter',
                }]
            },
        },
        {
            //规则页
            path: '/rulers',
            name: 'rulers',
            component: resolve => require(['./views/rulers/rulers.vue'], resolve),
            meta: {
                name: 'rulers',
                navstatus: false,
                breadnav: [{
                    name: '规则',
                    url: '/rulers',
                }]
            },
        },
        {
            //邀请注册页
            path: '/inviterigist',
            name: 'inviterigist',
            component: resolve => require(['./views/inviterigist/inviterigist.vue'], resolve),
            meta: {
                name: 'inviterigist',
                navstatus: false,
                breadnav: [{
                    name: '邀请注册',
                    url: '/inviterigist',
                }]
            },
        },
        { path: '*', component: NotFound },
    ],
    scrollBehavior(to, from, savedPosition) {
        // console.log(to);
        // if (to.name == 'productdetails' || to.name == 'newcomerdetails') {
        //     return { x: 0, y: 0 }
        // }
        return { x: 0, y: 0 }
    }
})

function Base64fn() {
    // private property  
    let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding  
    this.encode = function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    };
    // public method for decoding  
    this.decode = function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    };
    // private method for UTF-8 encoding  
    let _utf8_encode = function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    };
    // private method for UTF-8 decoding  
    let _utf8_decode = function(utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                let c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};
//DES加密
function encryptByDES(message, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
};
//DES解密
function decryptByDES(ciphertext, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    // direct decrypt ciphertext
    var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
};
// 全局路由守卫
router.beforeEach((to, from, next) => {
    const nextRoute = needloginroute();
    let isLogin = ''; // 是否登录
    let userinfo = '';
    if (window.localStorage.getItem('user-info-h5')) {
        let userdata_storage = window.localStorage.getItem('user-info-h5');
        userinfo = JSON.parse(decryptByDES(userdata_storage, '1590110none')) || '';
    }
    let useridstatus = false;
    if (userinfo.user_id != 0 && userinfo.user_id != '' && userinfo.user_id != undefined) {
        useridstatus = true;
    }
    isLogin = userinfo.isLogin && useridstatus;
    if (to.params.webtype == 0) {
        next();
        return;
    }
    // 要打开的页面判断
    if (to.name == 'login' || to.name == 'regist') {
        // 若要打开登录页
        if (isLogin) {
            // 若已经登录了则跳转到首页
            next({
                name: 'index'
            });
        } else {
            next();
        }
    } else if (nextRoute.indexOf(to.name) >= 0) {
        //  要打开到非登录 非注册页面；
        // 要打开到 nextRoute 指定页时，跳转至login
        if (!isLogin) {
            next({
                name: 'login'
            });
        } else {
            next();
        }
    } else {
        // if (to.name != 'confirmorder' && to.name != 'olpay' && to.name != 'paypage') {
        //     // console.log('移除存储数据 confirmpageorder');
        //     window.localStorage.removeItem('confirmpageorder');
        //     // next();
        // }
        // if (to.name != 'orderdetails') {
        //     // console.log('移除存储数据2 confirmpageorder_orderdetails');
        //     window.localStorage.removeItem('confirmpageorder_orderdetails');
        //     // next();
        // }

        // if (from.name != 'shopindex' && to.name != 'productdetails') {
        //     window.sessionStorage.removeItem('returnflag');
        // }
        // {
        next();
        // }
    }

});
export default router;