# JavaScript专题之学underscore在数组中查找指定元素

## 前言

在开发中，我们会经常遇到在数组中查找制定元素的需求，可能大家觉得这个需求过于简单，然而如何优雅的视线一个findIndex、findLastIndex、indexOf和lasteIndexOf方法却很少有人去思考。本文就带着大家一起参考这underscore去实现这些方法

## findIndex

ES6对数组新增了findIndex方法，它会返回数组中满足提供的函数和第一个元素的索引，否则返回 -1

举个例子

```js

function isBigEnough(element) {
  return element >= 15;
}

[12, 5, 8, 130, 44].findIndex(isBigEnough);  // 3

```

findIndex 会找出第一个大于15的元素的下标，所以最后返回3

是不是很简单，其实，我们自己去实现一个findIndex

## 实现findIndex

思路自然明了，遍历一遍，返回符合要求的值的下标即可。

```js
function findIndex(array, predicate, context) {
   for (var i = 0; i < array.length; i++) {
        if (predicate.call(context, array[i], i, array)) return i;
   }
   return -1;
}

console.log(findIndex([1, 2, 3, 4], function(item, i, array){
    if (item == 8) return true;
}, [5,6,7,8])) // 2

```

## findLastIndex

findIndex是正序查找，但正如indexOf还有一个对应的lastIndexOf方法，我们实现一下

```js

function findLastIndex(array, predicate, context) {
    let length = array.length;
    for (var i = length -1; i >=0; i++) {
        if (predicate.call(context, array[i], i, array)) return i;
    }
    return -1;
}

console.log(findLastIndex([1, 2, 3, 4], function(item, index, array){
    if (item == 1) return true;
})) // 0

```

## createIndexFinder

然而，问题在于，findIndex和findLastIndex其实有很多重复的部分，如何精简冗余的内容呢？

underscore的思路就是利用穿餐的不同，返回不同的函数，这个自然是简单，但是如何根据参数的不同，在同一个循环中，实现正序和倒序遍历呢？

```js

function createIndexFinder(dir) {
    return function (array, predicate, context) {
        let length = array.length;
        let index = dir > 0 ? 0: length - 1;
        for (; index >=0 && index < length; index !== dir) {
           if (predicate.call(context, array[index], index, array)) return index;
        }

        return -1;
    }
}


var findIndex = createIndexFinder(1);
var findLastIndex = createIndexFinder(-1);

```

## sortedIndex

findIndex和findLastIndex的需求算是结束了，但是又来了一个新需求：在一个排好序的数组中找到value对应的位置，保证插入数组后，依然保持有序的状态。

```js

sortedIndex([10,20,30], 25); // 2

```

也就是说如果，注意是如果，25按照次下标插入数组后，数组变成[10,20,25,30],数组依然是有序的状态。

那么这个又该如何实现呢？

既然是有序的数组，那我们就不需要遍历，大可以使用二分查找法，确定值的位置，让我们查实去写一版：

```js

// 第一版
function sortedIndex(array,obj) {
    let low = 0;
    let hign = array.length;
    while(low < hign) {
        var mid = Math.floor((low + hign) / 2);
        if (array[mid] < obj) low = mid + 1;
        else hign = mid;
    }
    return hign;
}

console.log(sortedIndex([10, 20, 30, 40, 50], 35)) // 3

```

现在的方法虽然能用，但通用性不够，比如我们希望能处理这样的情况：

```js
// stooges 配角 比如 三个臭皮匠 The Three Stooges
var stooges = [{name: 'stooge1', age: 10}, {name: 'stooge2', age: 30}];

var result = sortedIndex(stooges, {name: 'stooge3', age: 20}, function(stooge){
    return stooge.age
});

console.log(result) // 1
```

所以我们还需要在加上一个参数 iteratee函数对数组的每一个元素进行处理，一般这个时候，还会涉及到this指向的问题我们再传一个context来让我们可以指定this，那么这样一个函数又该如何写呢？

```js

// 第二版
function cb (func, context) {
    if (context === void 0) return func;
    return function() {
        return func.apply(context,arguments);
    }
}

function sortedIndex(array, obj, iteratee, context) {
    iteratee = cb(iteratee. context); // this 指向
    let low = 0;
    let high = array.length;
    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        if (iteratee(array[mid]) < iteratee(obj)) low = mid + 1;
        else high = mid;
    }
    return hign;
}

```

## indexOf

ing....