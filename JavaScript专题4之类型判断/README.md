# JavaScript专题之类型判断

## 前言

类型判断在web开发中有非常广泛的应用，简单的有判断数字还是字符串，进阶一点的有判断数组还是对象，再进阶一点的有判断日期、正则、错误类型，再再进阶一点的有比如判断plainObject、空对象、Window对象等等。

## typeof

我们最常用的莫过于typeof， 注意，尽管我们会看到诸如：

```js
console.log(typeof('ruly')) // string
```

的写法，但是typeof可是一个正宗的运算符，就跟加减乘除一样！这就能解释为什么下面这种写法也是可行的：

```js
console.log(typeof 'ruly') // string

```

引用《JavaScript权威指南》中对typeof的介绍：

> typeof是一元操作符，放在其单个操作数的前面，操作数可以是任意类型。返回值为表示操作数类型的一个字符串

在ES6前，JavaScript共六种数据类型，分别是：

undefined、 null、 boolean、 string、 object

然而当我们使用typeof对这些数据类型的之进行操作的时候，返回的结果并不是一一对应，分别是：

undefined、object、boolean、number、string、object

Null和Object类型都返回了object字符串

尽管不能一一对应，但是typeof却能检测出函数类型：

```js
function a() {}
console.log(typeof a) // function
```

所以typeof能检测出六种类型的值，但是除此之外Object下还有很多细分的类型，如 Array、Function、Date、RegExp、Error等

如果用typeof去检测这些类型，举个例子：

```js
let date = new Date()
let error = new Error()
console.log(typeof date); // object
console.log(typeof error); // object
```

返回的都是object，那么怎么区分？所以有没有更好的方法？

## Object.prototype.toString

是的，当然有！ 这就是Object.prototype.toString！
那Object.prototype.toString 究竟是一个什么样的方法呢？

```js
console.log(Object.prototype.toString.call(undefined)) // [object Undefined]
console.log(Object.prototype.toString.call(null)) // [object Null]

var date = new Date();
console.log(Object.prototype.toString.call(date)) // [object Date]
```

由此我们可以看到这个 class 值就是识别对象类型的关键！

正是因为这种特性，我们可以用 Object.prototype.toString 方法识别出更多类型！

那到底能识别多少种类型呢？

至少 12 种！

你咋知道的？

我数的！

```js
// 以下是11种：
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]

function checkType() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(Object.prototype.toString.call(arguments[i]))
    }
}

checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func)
```

除了以上 11 种之外，还有：

```js
console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]

```

除了以上 13 种之外，还有：

```js
function a() {
    console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
}
a();
```

所以我们可以识别至少 14 种类型，当然我们也可以算出来，[[class]] 属性至少有 12 个

## type API

既然有了 Object.prototype.toString 这个神器！那就让我们写个 type 函数帮助我们以后识别各种类型的值吧！

我的设想：

写一个 type 函数能检测各种类型的值，如果是基本类型，就使用 typeof，引用类型就使用 toString。此外鉴于 typeof 的结果是小写，我也希望所有的结果都是小写。

考虑到实际情况下并不会检测 Math 和 JSON，所以去掉这两个类型的检测。

我们来写一版代码：

```js
// 第一版
var class2type = {};

// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map(function(item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
})

function type(obj) {
    return typeof obj === "object" || typeof obj === "function" ? class2type[Object.prototype.toString.call(obj)] || "object" : typeof obj;
}

```

嗯，看起来很完美的样子~~ 但是注意，在 IE6 中，null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]！

我去，竟然还有这个兼容性！有什么简单的方法可以解决吗？那我们再改写一版，绝对让你惊艳！

```js
// 第二版
var class2type = {};

// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
})

function type(obj) {
    // 一箭双雕
    if (obj == null) {
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj;
}
```

## isFunction

有了 type 函数后，我们可以对常用的判断直接封装，比如 isFunction:

```js
function isFunction(obj) {
    return type(obj) === "function";
}

```

## 数组

jQuery 判断数组类型，旧版本是通过判断 Array.isArray 方法是否存在，如果存在就使用该方法，不存在就使用 type 函数。

```js

var isArray = Array.isArray || function( obj ) {
    return type(obj) === "array";
}

```

但是在 jQuery v3.0 中已经完全采用了 Array.isArray。