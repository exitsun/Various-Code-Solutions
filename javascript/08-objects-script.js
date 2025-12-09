const product1 = {
  name: "basketball",
  price: 2095,
  "delivery-time": "3 days",
};

const product2 = {
  name: "football",
  price: 2035,
  "delivery-time": "4 days",
};

console.log(product1);
product1.price += 500;
console.log(product1.price);
console.log(product1["delivery-time"]);

function comparePrice(product1, product2) {
  if (product1.price < product2.price) {
    console.log(
      `${product1.name} is cheaper than ${product2.name} and costs ${product1.price}`
    );
  } else {
    console.log(
      `${product2.name} is cheaper than ${product1.name} and costs ${product2.price}`
    );
  }
}
comparePrice(product1, product2);

function compareProductNames(product1, product2) {
  if (product1.name === product2.name) {
    return true;
  } else if (product1.name !== product2.name) {
    return false;
  }
}
console.log(compareProductNames(product1, product2));

let greeting = "Good morning!";
console.log(greeting.toLowerCase());
console.log(greeting.repeat(2));
