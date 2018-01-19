
class Person {

	constructor(name, age) {
		this.name = name;
		this.age = age; 
	}

	getUserDescription () {
		return ` ${this.name} is ${this.age} year(s) old`;
	}

}
var me = new Person('Jose', 26);
var description = me.getUserDescription();
console.log(description);

