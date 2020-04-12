function Person() {}
let person = new Person()
person.name = 'jack'
console.log(person.name)

function Person1() {}

Person1.prototype.name = 'kevin';
let person1 = new Person1();
let person2 = new Person1();
console.log(person1.name, person2.name)

function Person2() {}
let person3 = new Person2();
console.log(person3.__proto__ === Person2.prototype)