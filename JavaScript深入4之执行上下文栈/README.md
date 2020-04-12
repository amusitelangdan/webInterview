# JavaScript深入之执行上下文栈

## 顺序执行？

如果要问到JavaScript代码执行顺序的话，相比写过JavaScript的开发者都有一个直观的印象，那就是顺序执行，毕竟：

```js
var foo = function () {
    console.log('foo1');
}

foo(); // foo1

var foo = function () {
    console.log('foo2');
}

foo(); // foo2
```

然而去看这段代码：

```js
function foo() {
    console.log('foo1');
}

foo(); // foo2

function foo() {
    console.log('foo2');
}

foo(); // foo2
```

打印的结果却是两个foo2.

刷过面试题的都知道是因为JavaScript引擎并非一行一行的分析和执行程序，而是一段一段的分析执行，当执行一段代码的时候，会进行一个准备工作。比如第一个例子中的变量提升和第二个例子中的函数提升

但是本文真正想让大家思考的是：这个一段一段中的“段”是怎么划分的呢？

到底是JavaScript引擎遇到一段怎样的代码时才会做准备工作呢？

## 可执行代码

这就要说到JavaScript的可执行代码 (executable code) 的类型有哪些了

其实很简单，就三种： 全局代码， 函数代码， eval代码

举个例子，当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，让我们用个更专业一点的说法，就叫做：”执行上下文“

## 执行上下文栈

接下来问题来了， 我们写的函数多了去了，如何管理创建那么多执行上下文呢？

所以JavaScript引擎创建了执行上下文栈(ECS)来管理执行上下文

为了模拟执行上下文栈的行为，让我们定义执行上下文栈是一个数组：

```js
ECStack = [];
```

试想，当JavaScript开始要解释执行代码的时候，最先遇到的就是全局代码，所以当初始化的时候就会向执行上下文栈雅茹一个全局执行上下文，我们用globalContext表示他，并且只有当整个应用程序结束的时候，ECStack才会被清空，所以程序结束之前，ECStack最底部永远有个globalContext：

```js
ECStack = [
    globalContext
];

```

现在JavaScript遇到下面的这段代码了：

```js
function foo3 () {
    console.log('fun3');
}

function foo2() {
    foo3();
}

function foo1() {
    foo2();
}

```

当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会讲函数的执行上下文从栈中弹出。知道了这样的工作原理，让我们来看看如何处理上面这段代码：

```js
// 伪代码

// foo1()
ECStack.push(<foo1> functionContext);

// foo1()中竟然调用了foo2，还要创建foo2的执行上下文

ECStack.push(<foo2> functionContext);

// foo2()中竟然调用了foo3，还要创建foo3的执行上下文

ECStack.push(<foo3> functionContext);
// foo3执行完毕
ECStack.pop()
// foo2执行完毕
ECStack.pop()

// foo1执行完毕
ECStack.pop()

// JavaScript接着执行下面的代码，但是ECStack底层永远有个globalContext

```

## 解答思考题

现在我们已经了解了执行上下文栈是如何处理执行上下文的，所以让我们看看上篇文章[《JavaScript深入3之词法作用域和动态作用域》](./../JavaScript深入3之词法作用域和动态作用域/README.md)最后的问题：

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

两段代码执行的结果一样，但是两段代码究竟有哪些不同呢？

答案就是执行上下文栈的变化不一样。
让我们模拟第一段代码：

```js
ECStack.push(<checkscope> functionContext);
ECStack.push(<f>, functionContext);
ECStack.pop()
ECStack.pop()
```

让我们模拟第二个代码：

```js
ECStack.push(<checkscope> functionContext);
ECStack.pop()
ECStack.push(<f>, functionContext);
ECStack.pop()
```

是不是有些不同呢？

当然了，这样概括的回答执行上下文栈的变化不同，是不是依然有一种意犹未尽的柑橘呢？ 为了更详细的讲解两个函数执行上的区别，我们需要探究下执行上下文到底包含了哪些内容：[《JavaScript深入5之变量对象》](./../JavaScript深入5之变量对象/README.md)
