class Address {
  constructor(street, city, country) {
    this.street = street;
    this.city = city;
    this.country = country;
  }

  toString() {
    return `Address
    ${this.street}, 
    ${this.city}, 
    ${this.country}\n
    `;
  }

  /**
   * If you want to make a deep copy of an object you essentialy need to make deep copies of the primitive members of the object
   */
  deepCopy() {
    return new Address(this.street, this.city, this.country);
  }
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  toString() {
    return `${this.name} lives at ${this.address.toString()}`;
  }

  /**
   * If you want to make a deep copy of an object you essentialy need to make deep copies of the primitive members of the object
   */
  deepCopy() {
    return new Person(this.name, /* this.address */ this.address.deepCopy());
  }
}

/** John is effectively a prototype that you make copies (clones) of, you customise those copies and then you reuse them */
const john = new Person(
  "John",
  new Address("TKZ 123", "Koprivnica", "Croatia")
);

/** How to copy objects in javascript */

/** This is wrong, its a reference to the same object */
// let jane = john;

let jane = john.deepCopy();

jane.name = "Jane";
jane.address.street = "TKZ 132";

console.log(john.toString());
console.log(jane.toString());
