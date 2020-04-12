function Parent1 () {
    this.name = 'kevin';
}

Parent1.prototype.getName = function () {
    console.log(this.name);
}

function Child1 () {

}

Child1.prototype = new Parent1()

let child1 = new Child1();

console.log(child1.getName())


// JavaScript 组合继承
function Parent2 (name) {
    this.name = name;
}

Parent2.prototype.getName = function () {
    console.log(this.name);
}

function Child2(name, age) {
    Parent2.call(this,name);
    this.age = age;
}
console.log(Child2.prototype.constructor === Child2)

Child2.prototype = new Parent2();
let child2 = new Child2('jack', 20);
console.log(child2.name, child2.age)

let child3 = new Child2('lucy', 18);
console.log(child3.name, child3.age)