var shallowCopy = function (obj) {
    if (obj && typeof obj !== 'object') return;
    // 根据obj的类型判断是一个数组还是对象
    var newObj = obj instanceof Array ? []: {};
    // 对obj进行遍历
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]
        }
    }
    return newObj;
}


var deepCopy = function (obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? []: {};

    for(let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                newObj[key] = deepCopy(obj[key])
            } else {
                newObj[key] = obj[key]
            }
        }
    }

    return newObj;
}