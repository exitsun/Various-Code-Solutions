export let cart;

loadFromStorage();
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 4,
        deliveryOptionId: "2",
      },
    ];
  }
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, selectedValue) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += Number(selectedValue);
  } else {
    cart.push({
      productId: productId,
      quantity: Number(selectedValue),
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((item) => {
    if (item.productId !== productId) {
      newCart.push(item);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => (cartQuantity += item.quantity));

  document.querySelectorAll(".js-cart-quantity").forEach((occurence) => {
    occurence.innerHTML = cartQuantity;
  });
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity = newQuantity;
  }

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export let products = [];

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(xhr.response);
  });

  fun();

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}
