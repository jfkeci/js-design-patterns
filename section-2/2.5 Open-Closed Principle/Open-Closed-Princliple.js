let Color = Object.freeze({
  red: "red",
  green: "green",
  blue: "blue",
});

let Size = Object.freeze({
  small: "small",
  medium: "medium",
  large: "large",
  yuge: "yuge",
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

/**
 * Open closed principle (OCP)
 * - objects are open for extension and closed for modification
 *
 * Explanation
 * - We added the filterByColor method to the ProductFilter class
 *  we tested it and published it to production
 * - The class with the method is now tested and in use inside the application
 *
 * - If we afterwards want to add more methods to the class
 * - Methods like
 *    - filterBySize
 *    - filterByColors
 * - If this gets out "state space explosion" happens
 * - The more criteria (in this case "name", "color", "size") we have to use (in this case filter) the more methods we need
 * - After adding a new criteria (eg. price) we will need even more methods
 *
 */
class ProductFilter {
  filterByColor(products, color) {
    return products.filter((p) => p.color === color);
  }

  filterBySize(products, size) {
    return products.filter((p) => p.size === size);
  }

  filterBySizeAndColor(products, size, color) {
    return products.filter((p) => p.size === size && p.color === color);
  }

  // state space explosion
  // 3 criteria (+weight) = 7 methods

  // OCP = open for extension, closed for modification
}

let apple = new Product("Apple", Color.green, Size.small);
let tree = new Product("Tree", Color.green, Size.large);
let house = new Product("House", Color.blue, Size.large);

let products = [apple, tree, house];

// let pf = new ProductFilter();
// console.log(`Green products (old):`);
// for (let p of pf.filterByColor(products, Color.green)) {
//   console.log(` * ${p.name} is green`);
// }

// ↑↑↑ BEFORE

// ↓↓↓ AFTER

// general interface for a specification
/**
 * THE IDEA IS
 * - Whenever you want to have a different filtering criteria
 *    - Specify a different class which defines that sort of filtering
 *    - That class is called a specification
 */
class ColorSpecification {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

/**
 * By defining a specification for each property
 * - now every single filter is untied from another
 */

/**
 * Filter based on specifications
 */
class BetterFilter {
  filter(items, spec) {
    return items.filter((x) => spec.isSatisfied(x));
  }
}

/**
 * - Specification combinator
 */
class AndSpecification {
  /** Takes any number of specification */
  constructor(...specs) {
    this.specs = specs;
  }

  /** Requires that all the specifications apply */
  isSatisfied(item) {
    /**
     * - Calls .isSatisfied for each spec passed
     * - passing the item as the parameter (product)
     */
    return this.specs.every((x) => x.isSatisfied(item));
  }
}

/**
 * - Specification combinator
 */
class OrSpecification {
  /** Takes any number of specification */
  constructor(...specs) {
    this.specs = specs;
  }

  /** Requires that one of the specifications apply */
  isSatisfied(item) {
    /**
     * - Calls .isSatisfied for each spec passed
     * - passing the item as the parameter (product)
     * - returns true if item patches at least one specification
     */
    return this.specs.some((x) => x.isSatisfied(item));
  }
}

let bf = new BetterFilter();

console.log(`Green products (new):`);

for (let p of bf.filter(products, new ColorSpecification(Color.green))) {
  console.log(` * ${p.name} is green`);
}

console.log(`Large products:`);

for (let p of bf.filter(products, new SizeSpecification(Size.large))) {
  console.log(` * ${p.name} is large`);
}

console.log(`Large and green products:`);

let andSpec = new AndSpecification(
  new ColorSpecification(Color.green),
  new SizeSpecification(Size.large)
);

for (let p of bf.filter(products, andSpec)) {
  console.log(` * ${p.name} is large and green`);
}

let orSpec = new OrSpecification(
  new ColorSpecification(Color.green),
  new SizeSpecification(Size.large)
);

for (let p of bf.filter(products, orSpec)) {
  console.log(` * ${p.name} is large or green`);
}

/**
 * YOU NEVER JUMP INTO AN EXISTING CLASS AND START TO MODIFY IT
 * - Unless you have to
 *
 * A better approach is to use inheritence or extending the functionality
 */
