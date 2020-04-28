function findIndex(array, predicate, context) {
    console.log(array, predicate, context)
    for (var i = 0; i < array.length; i++) {
        // context => 可传入this
         if (predicate.call(context, array[i], i, array)) return i;
    }
    return -1;
 }
 
//  console.log(findIndex([1, 2, 3, 4], function(item, i, array){
//      if (item == 8) return true;
//  }, [5,6,7,8])) // 2


 function sortedIndex(array, obj) {

    var low = 0, high = array.length;

    while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (array[mid] < obj) {
            console.log()
            low = mid + 1;
            console.log('low;' + low)
        }
        else {
            high = mid;
            console.log('high;' + mid)
        }
    }

    return high;
};

console.log(sortedIndex([10, 20, 30, 40, 50], 35)) // 3