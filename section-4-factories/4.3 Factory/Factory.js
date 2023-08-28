CoordinateSystem = Object.freeze({
  cartesian: 0,
  polar: 1,
});

// class Point {
//   /**
//    * The arguments don't tell you what is
//    * expected to be provided to the constructor
//    * */
//   constructor(a, b, cs = CoordinateSystem.cartesian) {
//     switch (cs) {
//       case CoordinateSystem.cartesian:
//         this.x = a;
//         this.y = b;
//         break;
//       case CoordinateSystem.polar:
//         this.x = a * Math.cos(b);
//         this.y = a * Math.sin(b);
//         break;
//       default:
//         throw new Error("Invalid coordinate system");
//     }
//   }

//   /* constructor(x,y){
//     this.x = x
//     this.y = y
//   } */

//   /* constructor(rho, theta) {
//     this.x = rho * Math.cos(theta);
//     this.y = rho * Math.sin(theta);
//   } */
// }

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // static newCartesianPoint(x, y) {
  //   return new Point(x, y);
  // }

  // static newPolarPoint(rho, theta) {
  //   return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  // }

  static get factory() {
    return new PointFactory();
  }
}

// let py = new Point(2,3 CoordinateSystem.cartesian)

// let p = Point.newCartesianPoint(4, 5);
// console.log(p);

// p = Point.newPolarPoint(5, Math.PI / 2);
// console.log(p);

/**
 * A Factory method is a method (usually static) for creating something
 * - It enables you to be able to be explicit of the naming
 * - You are not restricted by type
 */

class PointFactory {
  static newCartesianPoint(x, y) {
    return new Point(x, y);
  }

  static newPolarPoint(rho, theta) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}

p = PointFactory.newCartesianPoint(4, 5);
console.log(p);

p = PointFactory.newPolarPoint(5, Math.PI / 2);
console.log(p);

/* p = Point.factory.newCartesianPoint(4, 5);
console.log(p);

p = Point.factory.newPolarPoint(5, Math.PI / 2);
console.log(p); */
