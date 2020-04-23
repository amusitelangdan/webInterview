# JavaScript专题之从零实现jQuery的extend

## 前言

jQuery 的extend是jQuery中应用非常多的一个函数，今天我们一边看jQuery的extend的特性，一边实现一个extend！

## extend基本用法

先来看看extend功能：

> 合并两个或更多的对象到第一个对象中

让我们看看extend的用法

```js
jQuery.extend( target [, object1 ] [, objectN ] )

```

第一个参数target，表示要拓展的目标，我们就称它为目标对象吧

后面的参数，都传入对象，内容都会复制到目标对象中，我们就称他们为待复制对象吧

比如：

```js

var obj1 = {
    a: 1,
    b: { b1: 1, b2: 2 }
};

var obj2 = {
    b: { b1: 3, b3: 4 },
    c: 3
};

var obj3 = {
    d: 4
}

console.log($.extend(obj1, obj2, obj3));

// {
//    a: 1,
//    b: { b1: 3, b3: 4 },
//    c: 3,
//    d: 4
// }

```

## extend第一版

结合上篇写的[《JavaScript专题5之深浅拷贝》](./../JavaScript专题5之深浅拷贝/README.md)，我们尝试自己写一个extend函数

```js
// 第一版

function extend() {
    let name, options, copy;
    let length = arguments.length;
    let i = 1;
    let target = arguments[0];

    for (; i < length; i++) {
        options = arguments[i];
        if (options !== null) {
            for (name in options) {
              copy = options[name];
              if (copy !== undefined) {
                  target[name] = copy;
              }
            }
        }
    }
    return target;
}

```

## extend 深拷贝

那如何进行深层册的复制呢？ jQuery v1.1.4加入了一个新的用法：

```js

jQuery.extend( [deep], target, object1 [, objectN ] )

```

也就是说，函数的第一个参数可以传一个布尔值，如果为 true，我们就会进行深拷贝，false 依然当做浅拷贝，这个时候，target 就往后移动到第二个参数。

还是举这个例子：

```js

var obj1 = {
    a: 1,
    b: { b1: 1, b2: 2 }
};

var obj2 = {
    b: { b1: 3, b3: 4 },
    c: 3
};

var obj3 = {
    d: 4
}

console.log($.extend(true, obj1, obj2, obj3));

// {
//    a: 1,
//    b: { b1: 3, b2: 2, b3: 4 },
//    c: 3,
//    d: 4
// }

```

因为采用了深拷贝，会遍历到更深的层次进行添加和覆盖。

## extend 第二版

那么我们来实现深拷贝的功能，值得注意的是：

1. 需要根据第一个参数的类型，确定target和要喝冰的对象的其实下标值。
2. 如果是深拷贝，根据copy的类型递归extend

```js

function extend() {
// 默认不进行深拷贝

    let deep = false;
    let name, options, src, copy;
    let length = arguments.length;
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
                if (typeof copy === 'object' && deep) {
                    // 深拷贝,递归调用
                    target[name] = extend(deep,src, copy)
                }
                else if (copy !== undefined) {
                target[name] = copy;  
                }
            }
        }
    }
    return target;
}

```