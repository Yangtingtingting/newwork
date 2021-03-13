import Vue from 'vue';
Vue.filter('numdy0', function(value) {
    console.log(value);

    // 返回处理后的值
    if (value !== '') {
        if (value <= 0) {
            // confirm('请输入大于0的数（最小值），再继续下一步操作')
            return 0.01;
        } else {
            return value
        }
    }
})