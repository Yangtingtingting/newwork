export function smoothgoto(target) {
    var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
    // console.log(scrollT);
    // console.log(target);
    var timer;
    var timer1;
    var timer2;
    clearTimeout(timer);
    clearTimeout(timer1);
    clearTimeout(timer2);
    if (scrollT > target) {
        timer = setInterval(function() {
            var scrollT_new = document.body.scrollTop || document.documentElement.scrollTop
            var step = Math.floor(-scrollT_new / 30);
            document.documentElement.scrollTop = document.body.scrollTop = step + scrollT_new;
            if (scrollT_new <= target) {
                document.body.scrollTop = document.documentElement.scrollTop = target;
                clearTimeout(timer);
                clearTimeout(timer1);
                clearTimeout(timer2);
            }
        }, 1)
    } else if (scrollT == 0) {
        timer1 = setInterval(function() {
            var scrollT_new = document.body.scrollTop || document.documentElement.scrollTop
            var step = Math.floor(300 / 3 * 0.7);
            document.documentElement.scrollTop = document.body.scrollTop = step + scrollT_new;
            // console.log(scrollT)
            if (scrollT_new >= target) {
                document.body.scrollTop = document.documentElement.scrollTop = target;
                clearTimeout(timer);
                clearTimeout(timer1);
                clearTimeout(timer2);
            }
        }, 1)
    } else if (scrollT < target) {
        timer2 = setInterval(function() {
            var scrollT_new = document.body.scrollTop || document.documentElement.scrollTop
            var step = Math.floor(scrollT_new / 30);
            document.documentElement.scrollTop = document.body.scrollTop = step + scrollT_new;
            if (scrollT_new >= target) {
                document.body.scrollTop = document.documentElement.scrollTop = target;
                clearTimeout(timer);
                clearTimeout(timer1);
                clearTimeout(timer2);
            }
        }, 1)
    } else if (target == scrollT) {
        return false;
    }
}
// ????????????????????????????????????????????????
// ????????????????????????CSDN????????????????????????????????????????????? CC 4.0 BY-SA ???????????????????????????????????????????????????????????????
// ???????????????https://blog.csdn.net/qq_40028324/article/details/81072047