/**
Factory Coding Exercise
You are given a class called Person . The person has two fields: id , and name .

Please implement a  PersonFactory that has a non-static  createPerson()  method that takes a person's name and returns a person initialized with this name and an id.

The id of the person should be set as a 0-based index of the object any instance of PersonFactory has created. So, the first person any factory makes should have Id=0, second Id=1 and so on.
*/

class Person {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class PersonFactory {
  constructor() {
    this.counter = 0;
  }

  createPerson(name) {
    const person = new Person(this.counter, name);

    this.counter++;

    return person;
  }
}

const pf = new PersonFactory();

const person1 = pf.createPerson("James");
const person2 = pf.createPerson("Ivan");

console.log(JSON.stringify(person1));
console.log(JSON.stringify(person2));
