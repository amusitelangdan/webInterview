# JavaScript深入之词法作用域和动态作用域

## 作用域

作用域是指程序源代码中定义变量的区域

作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。

JavaScript采用词法作用域(lexical scoping)，也就是静态作用域

## 静态作用域与动态作用域

因为JavaScript采用的是词法作用域，函数的作用域在函数定义的时候就已经决定了。

而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的。
例如：

```js
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();
// 结果是？（1）
```

假设JavaScript采用静态作用域，让我们分析下执行过程：
执行foo函数，先从函数内部查找是否有局部变量value，如果没有，就根据书写的为止，查找上一层的代码，也就是value 等于 1， 所以结果会打印1.

假设JavaScript采用动态作用域，让我们分析一下执行过程：
执行foo函数，依然是从foo函数内部查找是否有局部变量value，如果没有，就从调用函数的作用域，也就是bar函数内部查找value变量，所以结果会打印2.

前面我们已经说了，JavaScript采用的是静态作用域，所以这个例子的结果是1.

## 动态作用域

那么动态作用域是什么？

bash 就是动态作用域，不信的话，把下面的脚本保存成scope.bash，然后进入相应的目录，用命令行执行 bash ./ scope.bash ，看看打印的值是多少

```bash
value = 1
function foo () {
    echo $value;
}
function bar () {
    local value = 2;
    foo;
}
bar
```

## 思考题

最后，让我们看一个《JavaScript权威指南》中的例子：

```js
var scope = 'global scope';
function checkscope() {
    var scope = 'local scope';
    function f() {
        return scope;
    }
    return f();
}
checkscope()

```

```js
var scope = 'global scope';
function checkscope() {
    var scope = 'local scope';
    function f() {
        return scope;
    }
    return f();
}
checkscope()()
```

猜猜两端代码各自执行的结果是什么？

这里直接告诉结果： 两端代码都会打印： local scope。

原因很简单，因为JavaScript采用的是此法作用域，函数的作用域给予函数创建的位置。
而引用《JavaScript权威指南》的回答就是：
> JavaScript函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的，潜逃的函数f() 定义在这个作用域链里，其中的变量scope 一定是局部变量，不管何时何地执行函数f() 这种绑定在执行f()时依然有效。

但是在这里真正需要思考的是：

虽然两段代码执行的结果一样，但是两段代码到底有什么不同呢？

如果要回答这个问题，就要牵扯到很多的内容，词法作用域只是其中的一小部分，主要看： 《JavaScript深入之执行上下文栈》
