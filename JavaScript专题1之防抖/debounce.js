var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
    console.log(this)
    console.log(e)
    container.innerHTML = count++;
};

// 第一版
function debunce(func, wait) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait)
    }
}
// 第二版 this指向问题

function debunce1(func, wait) {
    let timeout;
    return function () {
        let context = this;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context)
        },wait)
    }
}

// 第三版解决event问题

function debunce2(func, wait) {
    let timeout;
    return function() {
        let context = this;
        let args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args)
        }, wait)
    }
}

// 第四版立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行

function debunce3(func, wait, immediate) {
    let timeout;
    return function() {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            let callNow  = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, wait)

            if(callNow) func.apply(context, args)
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args)
            }, wait) 
        }
    }
}


// container.onmousemove = debunce(getUserAction, 1000);
// container.onmousemove = debunce1(getUserAction, 1000);
// container.onmousemove = debunce2(getUserAction, 1000);
container.onmousemove = debunce3(getUserAction, 1000, true);


