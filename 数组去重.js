var array1 = [1, 2, 3, 1, 2, 3, '1', '2', '3','1', '2', '3'];
var array4 = [1, 2, 3, '1', '2', '3', 'a', 'A'];
var array2 = [1, 2, '1', 2, 1];
var array3 = [1, 1, '1', 2, 2]

function unique1(array) {
    let res = [];
    for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
        for (var j = 0, len = res.length; j < len; j++) {
          if (res[j] === array[i]) {
            break;
          }   
        }

        if (j === len) {
            res.push(array[i])
        }
    }
    console.log(res);
    return res;
}

function unique2(array) {
    let res = [];
    for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
        if (res.indexOf(array[i]) === -1) {
            res.push(array[i])
        }
    }
    console.log(res);
    return res;
}

function unique3(array) {
    let res = [];
    let seen;
    let newArr = array.concat().sort();
    for (var i = 0, len = newArr.length; i < len; i++) {
        if (!i || seen !== newArr[i]) {
            res.push(newArr[i])
        }
        seen = newArr[i]
    }
    console.log(res);
    return res;
}

function unique4(array, isSorted) {
    let res = [];
    let seen;
    for (var i = 0, len = array.length; i < len; i++) {
        if (isSorted) {
            // 已经排序的
            if (!i || seen !== array[i]) {
                res.push(array[i])
            }
            seen = array[i]
        } else {
            // 没有排序的
            if (res.indexOf(array[i]) === -1) {
                res.push(array[i])
            }
        }
    }

    console.log(res);
    return res
}

// 是否需要排序
function unique5(array, isSorted) {
    let res = [];
    let arr = array;
    let seen;
    if (isSorted) {
        arr = array.concat().sort();
    }
    for (var i = 0, len = arr.length; i < len; i++) {
        if (isSorted) {
            if (!i || seen !== arr[i]) {
                res.push(arr[i])
            }
            seen = arr[i]
        } else if (!isSorted && res.indexOf(arr[i]) === -1) {
            res.push(arr[i]) 
        }
    }

    console.log(res);
    return res
}

// 字母的大小写视为一致，比如'a'和'A'，保留一个就可以了
/**
     * @params [array] array 传递进入的数组
     * @params [Boolean] isSorted 是否需要排序，
     * @params [Function] iteratee 函数
*/
function unique6(array, isSorted, iteratee) {
    let res = [];
    let seen = [];
    let seen1;
    let newArr = array;
    if (isSorted) {
        newArr = newArr.concat().sort();
    }

    for (var i = 0, len = newArr.length; i < len; i++) {
        let value = newArr[i]
        let computed = iteratee ? iteratee(value) : value;
        if (isSorted) {
            if (!i || seen1 !== computed) {
                res.push(value)
            }
            seen1 = computed;
        } 

        else if (iteratee) {
            if (seen.indexOf(computed) === -1) {
                seen.push(computed);
                res.push(value);
            }
        }

        else if (res.indexOf(value) === -1) {
            res.push(value);
        }  
    }

    console.log(res)
    return res;
}


unique1(array1);

unique2(array1);

unique3(array1);

unique4(array2);

unique4(array3, true);

unique5(array1)

unique5(array1, true)

unique6(array4, true, function(item) {
  return typeof  item === 'string' ? item.toLowerCase() : item
})
unique6(array4, false, function(item) {
    return typeof  item === 'string' ? item.toLowerCase() : item
})

unique6(array4, false)
unique6(array4, true)


// es6 数组去重

// filter 创建一个新数组，其包含通过所提供函数实现的测试的所有元素

let array5 = [1,2,3,1,1,'1'];
function unique7 (array) {
    let res = array.filter((item, index, array) => {
        // console.log(item, index, array.indexOf(item) === index)
        return array.indexOf(item) === index;
    })
    console.log(res)
    return res
}

// 排序去重

function unique8(array) {
    let res = array.concat().sort().filter((item, index, array) => {
        // console.log(item, array[index -1])
        return !index || item !== array[index -1]
    })
    console.log(res)
    return res;
}

// Object 键值对
function unique9(array) {
    let obj = {};
    let res = array.filter((item, index, array) => {
        return obj.hasOwnProperty(item) ? false : (obj[item] = true)
    })
    console.log(res);
    return res;
}

function unique10 (array) {
    console.log([... new Set(array)])
    // return Array.from(new Set(array))
    return [... new Set(array)]
}

function unique11(array) {
    let seen = new Map()
    let res = array.filter((a) => {
        //seen.has(a) 返回一个布尔值，表示Map实例是否包含键对应的值。
        // seen.set(a,1) 设置Map对象中键的值。返回该Map对象。
        return !seen.has(a) && seen.set(a,1)
    })
    console.log(res);
    return res;
}

unique7(array5)
unique8(array5)
unique9(array5)
unique10(array5)
unique11(array5)