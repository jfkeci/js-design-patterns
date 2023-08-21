class Document {}

/** Class used as an interface */
class Machine {
  /** Cannot be constructed */
  constructor() {
    if (this.constructor.name === "Machine")
      throw new Error("Machine is abstract!");
  }

  print(doc) {}
  fax(doc) {}
  scan(doc) {}
}

class NotImplementedError extends Error {
  constructor(
    name // Name of the piece of the API that is missing
  ) {
    let message = `${name} not implemented`;
    super(msg);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotImplementedError);
    }
  }
}

class MultiFunctionPrinter extends Machine {
  print(doc) {
    //
  }

  fax(doc) {
    //
  }

  scan(doc) {
    //
  }
}

class OldFashionedPrinter extends Machine {
  print(doc) {
    // Ok
  }

  /** Not Ok */
  //fax(doc) {
  /**
   * Not Ok
   * Do Nothing
   * Violates the Principle of Least Surprise
   * - Dont surprise
   * */
  //}

  scan(doc) {
    /** This shouldn't happen */
    // throw new Error('Not implemented')

    /** This shouldn't happen */
    throw new NotImplementedError("OldFashionedPrinter.scan");
  }
}

let printer = new OldFashionedPrinter();
printer.scan(new Document());

/** USE INTERFACE SEGREGATION */

/** Class used as an interface */
class Printer {
  /** Cannot be constructed */
  constructor() {
    if (this.constructor.name === "Printer")
      throw new Error("Printer is abstract!");
  }

  print() {}
}

/** Class used as an interface */
class Scanner {
  /** Cannot be constructed */
  constructor() {
    if (this.constructor.name === "Scanner")
      throw new Error("Scanner is abstract!");
  }

  scan() {}
}

/** Class used as an interface */
class FaxMachine {
  /** Cannot be constructed */
  constructor() {
    if (this.constructor.name === "FaxMachine")
      throw new Error("FaxMachine is abstract!");
  }

  fax() {}
}

// class Photocopier extends Printer, Scanner{}

class Photocopier {
  print() {}
  scan() {}

  copy() {}
}

/**
 * You can have a several mixin classes that you inherit from
 *  but this makes very little sense for interfaces
 */
const aggregation = (baseClass, ...mixins) => {
  class base extends baseClass {
    constructor(...args) {
      super(...args);
      mixins.forEach((mixin) => {
        copyProps(this, new mixin());
      });
    }
  }
  let copyProps = (target, source) => {
    // this function copies all properties and symbols, filtering out some special ones
    Object.getOwnPropertyNames(source)
      .concat(Object.getOwnPropertySymbols(source))
      .forEach((prop) => {
        if (
          !prop.match(
            /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
          )
        )
          Object.defineProperty(
            target,
            prop,
            Object.getOwnPropertyDescriptor(source, prop)
          );
      });
  };
  mixins.forEach((mixin) => {
    // outside constructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
};
