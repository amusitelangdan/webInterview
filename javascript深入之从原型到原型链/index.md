# javaScript 深入之从原型到原型链

## 构造函数创建对象

我们先使用构造函数创建一个对象：

```js
function Person() {

}
var person = new Person()
person.name = 'Jack'
console.log(person.name)
```

在这个例子中， Person就是一个构造函数，我们使用new创建了一个实例对象person。
接下来进入主题：

## prototype

每个函数都有prototype属性，比如

```js
function Person() {

}
// prototype是函数才会有的属性
Person.prototype.name = 'kevin';
let person1 = new Person()
let person2 = new Person()
console.log(person1.name) // kevin
console.log(person2.name) // kevin

```

那这个函数的prototype属性到底指向的是什么呢？是这个函数的原型吗？

其实，函数的prototype属性指向了一个对象，这个对象正式调用该构造函数而创建的实例的原型，也就是这个例子中person1和person2的原型

那么什么是原型呢？

定义： 每一个JavaScript对象(null除外)在创建的时候就会与之关联一个对象，这个对象就是我们所说的原型，每一个对象都会从原型“继承”属性。

让我们用一张图表示构造函数和实例原型之间的关系：

![avator](./images/prototype2.png)

这张图中我们用Object.prototype表示原型实例。

那么我们该怎么表示实例与原型实例，也就是person和Person.prototype之间的关系呢，这时候我们就要讲到第二个属性：

## __ proto __

这是每一个JavaScript对象(除了null)都具有的一个属性，叫__ proto __， 这个属性会指向该对象的原型

```js

function Person() {}
let person = new Person()
console.log(person.__proto__ === Person.prototype); // true

```

于是我们更新下关系图

![avator](./images/prototype3.png)

既然实例对象和构造函数都可以指向原型，那么原型是否有属性指向构造函数或者实例呢？

## constructor

指向实例倒是没有，因为一个构造函数可以生成多个实例，但是原型指向构造函数倒是有的，这就要讲到第三个属性：constructor，每个原型都有一个constructor属性指向关联的构造函数。

```js

function Person() {}
console.log(Person === Person.prototype.constructor); // true

```

所以再更新下关系图：
![avator](./images/prototype4.png)

综上我们已经得出：

```js

function Person() {};

let person = new Person();
console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法，可以获得对象
console.log(Object.getPrototypeOf(person) === Person.prototype) // true

```
