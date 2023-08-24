class Person {
  constructor() {
    // Address
    this.streetAddress = this.postcode = this.city = "";

    // Employment
    this.companyName = this.position = "";
    this.annualIncome = 0;
  }

  toString() {
    return (
      `Person lives at ${this.streetAddress}, ${this.city}, ${this.postcode}\n` +
      `and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`
    );
  }
}

/**
 * If you are using multiple builders they are all working on a single object
 * - They are not making copies of the object
 */

class PersonBuilder {
  /**
   * The object is stored inside the person builder
   * - Every single subbuilder gets to work on the same  object
   * - Whoever calls PersonBuilder gets to init a new Person
   *  */
  constructor(person = new Person()) {
    this.person = person;
  }

  get lives() {
    return new PersonAddressBuilder(this.person);
  }

  get works() {
    return new PersonJobBuilder(this.person);
  }

  build() {
    return this.person;
  }
}

class PersonJobBuilder extends PersonBuilder {
  constructor(person) {
    super(person);
  }

  at(companyName) {
    this.person.companyName = companyName;

    // Fluent interface
    return this;
  }

  asA(position) {
    this.person.position = position;
    return this;
  }

  earning(annualIncome) {
    this.person.annualIncome = annualIncome;
    return this;
  }
}

class PersonAddressBuilder extends PersonBuilder {
  constructor(person) {
    super(person);
  }

  at(streetAddress) {
    this.person.streetAddress = streetAddress;
    return this;
  }

  withPostcode(postcode) {
    this.person.postcode = postcode;
    return this;
  }

  in(city) {
    this.person.city = city;
    return this;
  }
}

// Init a new person object
let pb = new PersonBuilder();

let person = pb.lives
  .in("Zagreb")
  .at("Trg Kralja Javascripta")
  .withPostcode("10000")
  .works.at("BitFirm")
  .asA("Developer")
  .earning(123000)
  .build();

console.log(person.toString());
