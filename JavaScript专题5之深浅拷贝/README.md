# JavaScript专题之深浅拷贝

## 数组的浅拷贝

如果是数组，我们可以利用数组的一些方法，比如： sclice、concat返回一个新数组的特性来拷贝数组。比如

```js
var arr = ['old', 1, true, null, undefined];

var new_arr = arr.concat();

new_arr[0] = 'new';

console.log(arr) // ["old", 1, true, null, undefined]
console.log(new_arr) // ["new", 1, true, null, undefined]

```

用slice可以这样做

```js

var new_arr = arr.slice();

```

但是如果数组嵌套了对象或者数组的话,我们会发现，无论是新数组还是旧数组都发生了变化，也就是说使用 concat 方法，克隆的并不彻底。

如果数组元素是基本类型，就会拷贝一份，互不影响，而如果是对象或者数组，就会只拷贝对象和数组的引用，这样我们无论在新旧数组进行了修改，两者都会发生变化。

我们把这种复制引用的拷贝方法称之为浅拷贝，与之对应的就是深拷贝，深拷贝就是指完全的拷贝一个对象，即使嵌套了对象，两者也相互分离，修改一个对象的属性，也不会影响另一个。

所以我们可以看出使用 concat 和 slice 是一种浅拷贝。

## 数组的深拷贝

### 1.JSON.stringify() & JSON.parse()

缺点：不能拷贝函数

## 浅拷贝的实现

最上面的三个方法 concat、slice、JSON.stringify 都属于技巧类，可以根据实际羡慕情况选择使用，接下来，我们思考一下如何实现一个对象或者数组的浅拷贝。

首先，遍历对象，将属性和属性值放在一个新的对象

```js

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

```

## 深拷贝的实现

深拷贝其实主要是使用了递归，我们再拷贝的时候判断一下属性值的类型，如果是对象，我们递归调用深拷贝函数不就好了～

```js
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

```

## 性能问题

尽管使用深拷贝会完全的克隆一个新的对象，不会产生副作用，但是深拷贝因为使用递归，性能会不如浅拷贝，在开发中，还是要根据实际情况进行选择