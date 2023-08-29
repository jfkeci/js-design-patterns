class Address {
  constructor(suite, streetAddress, city) {
    this.suite = suite;
    this.streetAddress = streetAddress;
    this.city = city;
  }

  toString() {
    return `Suite ${this.suite}, ` + `${this.streetAddress}, ${this.city}`;
  }
}

class Employee {
  // renamed
  constructor(name, address) {
    this.name = name;
    this.address = address; //!
  }

  toString() {
    return `${this.name} works at ${this.address}`;
  }

  greet() {
    console.log(
      `Hi, my name is ${this.name}, 
      I work at ${this.address.toString()}` //!
    );
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
        if (object.hasOwnProperty(key) && object[key] != null) {
          this.markRecursive(object[key]);
        }
      }
    }
  }

  reconstructRecursive(object) {
    if (object.hasOwnProperty("typeIndex")) {
      let type = this.types[object.typeIndex];

      let obj = new type();

      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
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

    return this.reconstructRecursive(copy);
  }
}

class EmployeeFactory {
  static _newEmployee(proto, name, suite) {
    let copy = EmployeeFactory.serializer.clone(proto);

    copy.name = name;

    copy.address.suite = suite;

    return copy;
  }

  static newMainOfficeEmployee(name, suite) {
    return this._newEmployee(EmployeeFactory.main, name, suite);
  }

  static newAuxOfficeEmployee(name, suite) {
    return this._newEmployee(EmployeeFactory.aux, name, suite);
  }
}

EmployeeFactory.serializer = new Serializer([Employee, Address]);
EmployeeFactory.main = new Employee(null, new Address(null, "TKZ 123", "Kc"));
EmployeeFactory.aux = new Employee(null, new Address(null, "TKZ 321", "Zg"));

let john = EmployeeFactory.newMainOfficeEmployee("John", 4321);
let jane = EmployeeFactory.newAuxOfficeEmployee("Jane", 222);

console.log(john.toString());
console.log(jane.toString());

/**
 * Takeaway
 * - if you have a finite set of different prototypes that you want to work with
 *   it might make sense to put them into a separate factory
 */
