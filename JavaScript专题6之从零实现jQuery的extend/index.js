// function extend() {
//     let name, options, copy;
//     let length = arguments.length;
//     let i = 1;
//     let target = arguments[0];
//     console.log(arguments)

//     for (; i < length; i++) {
//         options = arguments[i];
//         if (options !== null) {
//             for (name in options) {
//               copy = options[name];
//               if (copy !== undefined) {
//                   target[name] = copy;
//               }
//             }
//         }
//     }
//     return target;
// }

let obj1= {
    a: 1,
    c: {b:2}
}
let obj2 = {
    b: 1
}
let obj3 = {
    b: 1,
    c: {a:3}
}

function extend1() {
    // 默认不进行深拷贝
    
        let deep = false;
        let name, options, src, copy;
        let length = arguments.length;
        console.log(arguments)
        let i = 1;
    // 第一个参数是布尔值，target默认是第一个参数
        let target = arguments[0] || {};
    // 如果第一个参数是布尔值，第二个参数才是target
        if (typeof target == 'boolean') {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        // 如果target不是一个对象，我们是无法进行复制的所以需要设置为{}
    
        if (typeof target !== 'object' || !target) {
            target = {}
        }
    
        // 循环遍历要复制的对象们
    
        for (; i < length; i++) {
            // 获取当前的对象
            options = arguments[i];
            if (options !== null) {
                for (name in options) {
                    // 目标属性值
                    src = target[name];
                    // 要复制的对象属性值
                    copy = options[name]
                    if (typeof copy === 'object' && deep && typeof src === 'object') {
                        // 深拷贝,递归调用
                        target[name] = extend1(deep, src, copy)
                    }
                    else if (copy !== undefined) {
                        target[name] = copy;  
                    }
                }
            }
        }
        return target;
    }

// console.log(extend(obj1, obj2))
console.log(extend1(true, obj1, obj3))