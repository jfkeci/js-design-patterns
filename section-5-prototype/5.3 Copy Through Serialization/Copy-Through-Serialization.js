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
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  toString() {
    return `${this.name} lives at ${this.address.toString()}`;
  }

  greet() {
    console.log(`Hi, my name is ${this.name},
    I live at ${Object.values(this.address).join(", ")}`);
  }
}

class Serializer {
  constructor(types) {
    this.types = types;
  }

  markRecursive(object) {
    let idx = this.types.findIndex((t) => {
      return t.name === object.constructor.name;
    });

    if (idx !== -1) {
      object["typeIndex"] = idx;

      for (let key in object) {
        if (object.hasOwnProperty(key)) {
          this.markRecursive(object[key]);
        }
      }
    }
  }

  reconstructRecursive(object) {
    if (object.hasOwnProperty("typeIndex")) {
      let type = this.types[object.typeIndex];

      let obj = new type();

      /**
       * Every single property needs to be written into obj
       * This needs to be recursive because of the potential child objects
       */

      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] !== null) {
          obj[key] = this.reconstructRecursive(object[key]);
        }
      }

      delete obj.typeIndex;

      return obj;
    }

    return object;
  }

  clone(object) {
    this.markRecursive(object);

    /** We get replica of the object without any type information */
    let copy = JSON.parse(JSON.stringify(object));

    return this.reconstructRecursive(object);
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

/**
 *  Reconstructing the object using json methods
 * - you get a data structure that has no relation with the class
 * - jane.greet() won't work
 */
// let jane = JSON.parse(JSON.stringify(john));

let s = new Serializer([Person, Address]);

let jane = s.clone(john);

jane.name = "Jane";
jane.address.street = "TKZ 321";

console.log(john.toString());
console.log(jane.toString());

// jane.greet();
