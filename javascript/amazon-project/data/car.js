// class Car {
//   id;
//   brand;
//   model;
//   year;

//   constructor(carDetails) {
//     this.id = carDetails.id;
//     this.brand = carDetails.brand;
//     this.model = carDetails.model;
//     this.year = carDetails.year;
//     this.age = this.calculateAge();
//   }
//   calculateAge() {
//     const currentYear = new Date().getFullYear();
//     return currentYear - this.year;
//   }
// }

// const cars = [
//   {
//     id: 1,
//     brand: "Toyota",
//     model: "Corolla",
//     year: 2009,
//   },
//   {
//     id: 2,
//     brand: "Opel",
//     model: "Astra",
//     year: 2011,
//   },
//   {
//     id: 3,
//     brand: "Kia",
//     model: "Sportage",
//     year: 2020,
//   },
// ].map((carDetails) => {
//   return new Car(carDetails);
// });
// console.table(cars);
// console.log(cars);\
// const date = new Date();
// console.log(date);
// const time = date.toLocaleTimeString();
// console.log(time);

// console.log(this);

// const object2 = {
//   a: 2,
//   b: this.a,
// };
// console.log(object2.b); //undefined

// function logThis() {
//   console.log(this);
// }

// logThis.call("hello");

// const object3 = {
//   method: () => {
//     console.log(this);
//   },
// };
// object3.method();

class Car {
  #model;
  #brand;
  #speed;
  isTrunkOpen = false;

  constructor(feature) {
    this.brand = feature.brand;
    this.model = feature.model;
    this.speed = feature.speed;
    this.isTrunkOpen = feature.isTrunkOpen;
  }
  honk() {
    return `Biiiip! Jestem ${this.brand}`;
  }
  displayInfo() {
    return `Brand: ${this.brand} | Model: ${this.model} | Speed: ${
      this.speed
    } | Trunk: ${this.isTrunkOpen || "Don't know"}`;
  }
  go() {
    if (this.isTrunkOpen) {
      return `Close the trun first!`;
    }
    if (this.speed + 5 > 200) {
      return `Too fast!`;
    }
    return (this.speed += 5);
  }
  brake() {
    if (this.speed - 5 < 0) {
      return `Too slow!`;
    }
    return (this.speed -= 5);
  }
  openTrunk() {
    if (this.speed > 0) {
      return `Can't open the trunk while moving!`;
    }
    this.isTrunkOpen = true;
    return `The trunk is open now!`;
  }
  closeTrunk() {
    this.isTrunkOpen = false;
    return `The trunk is now closed!`;
  }
}

const toyota = new Car({
  brand: "Toyota",
  model: "Corolla",
  speed: 0,
});

console.log(toyota.honk());
console.log(toyota.displayInfo());
console.log(toyota.go());
console.log(toyota.go());
console.log(toyota.brake());
console.log(toyota.brake());
console.log(toyota.displayInfo());
console.log(toyota.openTrunk());
console.log(toyota.closeTrunk());
console.log(toyota.displayInfo());
console.log(toyota.openTrunk());
console.log(toyota.displayInfo());

// console.table(toyota);

class RaceCar extends Car {
  acceleration;

  constructor(features) {
    super(features);
    this.acceleration = features.acceleration;
  }
  go() {
    if (this.speed + this.acceleration > 300) {
      return `Going too fast!`;
    }
    return (this.speed += this.acceleration);
  }

  openTrunk() {
    return `Invalid operation`;
  }
  closeTrunk() {
    return `Invalid operation`;
  }
  displayInfo() {
    return `Brand: ${this.brand} | Model: ${this.model} | Acceleration: ${this.acceleration}`;
  }
}

const mcLaren = new RaceCar({
  brand: "McLaren",
  model: "F1",
  acceleration: 20,
});

console.log(mcLaren);
console.log(mcLaren.displayInfo());
