import Vue from 'vue';
import { Toast } from 'vant';
Vue.directive('numdybinding', {
    update: function(el, binding, vnode) {
        setTimeout(() => {
            if (el.value < binding.value && vnode.data.attrs['data-id'] == el.dataset.id) {
                el.value = '';
                Toast('请确定输入的值在最小值和可用值的范围内，再继续下一步操作');
                return;
            }
            el.dispatchEvent(new Event('change')); //lazy 是 change事件
        }, 0);
    }
});
Vue.directive('numxybinding', {
    update: function(el, binding, vnode) {
        setTimeout(() => {
            if (el.value > binding.value && vnode.data.attrs['data-id'] == el.dataset.id) {
                el.value = '';
                // Toast('请确定输入的值小于' + binding.value + '（最大值），再继续下一步操作');
                Toast('请确定输入的值在最小值和可用值的范围内，再继续下一步操作');
                return;
            }
            el.dispatchEvent(new Event('change')); //lazy 是 change事件
        }, 0);
    }
});
Vue.directive('numdyxybinding', {
    update: function(el, binding, vnode) {
        setTimeout(() => {
            console.log(binding);
            if (el.value > binding.value && vnode.data.attrs['data-id'] == el.dataset.id) {
                el.value = '';
                Toast('请确定输入的值小于' + binding.value + '（最大值），再继续下一步操作');
                return;
            }
            el.dispatchEvent(new Event('change')); //lazy 是 change事件
        }, 0);
    }
});

Vue.directive('phonenumbcheck', {
    update: function(el, binding, vnode) {
        setTimeout(() => {
            if (el.value != '' && !/^1[3456789]\d{9}$/.test(el.value) && vnode.data.attrs['data-id'] == el.dataset.id) {
                if (binding.value !== undefined && binding.value !== null && binding.value !== '') {
                    el.value = binding.value;
                } else {
                    el.value = '';
                }
                el.dispatchEvent(new Event('change')); //lazy 是 change事件
                Toast('请重新输入正确的手机号');
            }
        }, 0);
    }
});
Vue.directive('pswdcheck', {
    update: function(el, binding, vnode) {
        setTimeout(() => {
            if (el.value != '' && !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(el.value) && vnode.data.attrs['data-id'] == el.dataset.id) {
                if (binding.value !== undefined && binding.value !== null && binding.value !== '') {
                    el.value = binding.value;
                } else {
                    el.value = '';
                }
                el.dispatchEvent(new Event('change')); //lazy 是 change事件
                Toast('请重新输入6-16至少数字/字母/字符2种组合的密码');
            }
        }, 0);
    }
});

/* <input type="number" v-model.number.lazy="vdemoNumber2" data-id="demo2" v-numdybinding="10" v-numxybinding="20"> */