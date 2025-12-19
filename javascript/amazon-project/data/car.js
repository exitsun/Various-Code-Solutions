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
// console.log(cars);

class Car {
  model;
  brand;

  constructor(feature) {
    this.brand = feature.brand;
    this.model = feature.model;
  }
  honk() {
    return `Biiiip! Jestem ${this.brand}`;
  }
}

const toyota = new Car({
  brand: "Toyota",
  model: "Corolla",
});

console.log(toyota.honk());

console.table(toyota);
