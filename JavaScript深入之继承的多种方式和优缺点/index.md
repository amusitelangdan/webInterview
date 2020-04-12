# JavaScript深入之继承的多种方式和优缺点

## 1.原型链继承

```js
function Parent() {
    this.name = 'kevin';
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child() {}
Child.prototype = new Parent();
let child1 = new Child();
console.log(child1.getName)

```

问题：

1.引用类型的属性被所有实例分享，举个例子：

```js
function Parent() {
    this.name = ['kevin', 'jack'];
}
function Child() {

}

Child.prototype = new Parent();

let child1 = new Child();

child1.name.push('lucy')

console.log(child1.name); // ['kevin', 'jack', 'lucy']

let child2 = new Child();

console.log(child2.name); // ['kevin', 'jack', 'lucy']

```

2.在创建Child实例的时候，不能向Parent传参

## 2.使用构造函数（经典继承）

```js
function Parent() {
    this.name = ['kevin', 'jack'];
}

function Child () {
    Parent.call(this)
}

let child1 = new Child();
child1.name.push('lucy');
console.log(child1.name) // ['kevin', 'jack', 'lucy']
let child2 = new Child();
console.log(child2.name) // ['kevin', 'jack']

```

优点：

1.避免了引用类型的属性被所有实例共享

2.可以在Child中向Parent传递参数

举个例子：

```js
function Parent(name) {
    this.name = name;
}

function Child (name) {
    Parent.call(this, name)
}

let child1 = new Child('kevin');
console.log(child1.name) // kevin
```

缺点：

方法都在构造函数中定义，每次创建实例都会创建一遍方法

## 3.组合继承

原型链继承和经典继承双剑合璧

```js
function Parent(name) {
    this.name = name;
    this.colors = ['red', 'green','blue']
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

let child1 = new Child('kevin', '18');
child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ['red','green','blue','black']

let child2 = new Child('jack', '20')
console.log(child2.name) // jack
console.log(child2.age) // 20
console.log(child.colors) // ['red', 'green','blue']

```

优点： 融合原型链继承和构造函数的优点，是JavaScript中最常用的继承模式.

## 4.原型式继承

```js

function createObj(o) {
    function F() {}
    F.prototype= o;
    return new F();
}

```

这个就是ES5 Object.create的模拟实现，将传入的对象作为创建的对象的原型。

缺点：

包含引用类型的属性之始终都会共享相应的值，这点跟原型链继承一样。

```js

let person = {
    name: 'kevin',
    friends: ['lucy']
}
let person1 = createObj(person);
let person2 = createObj(person);
person1.name = 'person1'
console.log(person2.name) // kevin

person1.friends.push('jack')
console.log(person2.friends) // ['lucy', 'jack']
```

注意： 修改person1.name 的值，person2.name的值并未发生改变，并不是因为person1和person2有杜立德name值，而是因为person1.name = 'person1'是给person1添加了name值，并非修改了原型上的name值。

## 5.寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。

```js
function createObj(o) {
    let clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}

```

缺点： 跟借用构造函数模式一样，每次创建对象都会创建一遍方法。

## 6. 寄生组合式继承

组合继承最大的缺点是会调用两次父构造函数。
一次是设置子类型实例的原型的时候：

```js
Child.prototype = new Parent();
```

一次是在创建子类型实例的时候：

```js
let child = new Child('a');
```

其实在这句中我们会执行：

```js
Parent.call(this, name);
```

在这里我们又会调用一次Parent构造函数。

所以，在这个例子(组合继承)中，如果我们打印child1对象，我们就会发现Child.prototype 和child1 都有一个属性为colors ,属性值为['red','green','blue'];

那么我们该如何精益求精，避免这一次的重复调用呢？

如果我们不使用Child.prototype = new Parent(),而是间接的让Child.prototype访问到Parent.prototype里面呢？

看看如何实现：

```js
function Parent(name) {
    this.name = name;
    this.colors = ['red', 'green','blue']
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child(name, age) {
    Parent.call(this, name);
    this.age =age;
}

// 关键的三步

let F = function () {};

F.prototype = Parent.prototype;

Child.prototype = new F();

let child1 = new Child('kevin',19);

console.log(child1);

```

最后我们封装一下这个继承方法：

```js

function object(o) {
    function F() {};
    F.peorotype = o;
    return new F();
}

function prototype(child, parent) {
    let prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

// 当我们使用的时候

prototype(Child, Parent);
```

引用《JavaScript高级程序设计》中对寄生组合式继承的夸赞就是：

> 这种方式的高效率体现在它只调用了一次Parent构造函数，摒弃人因此避免了在Parent.prototype上面创建不必要的，多余的属性，与此同时，原型链还能保持不变；因此，还能够正常使用instanceof 和isPrototypeOf。开发人员普遍认为寄生组合式继承式引用类型最理想的继承范式，