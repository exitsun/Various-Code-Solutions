import { formatCurrency } from "../scripts/utils/money.js";
import { products, loadProductsFetch } from "./products.js";
import { addToCart, updateCartQuantity } from "./cart.js";

export let orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

// function uuidv4() {
//   return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
//     (
//       +c ^
//       (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
//     ).toString(16)
//   );
// }

// console.log(uuidv4());

// async function init() {
//   try {
//     const productsData = await loadProductsFetch();
//     console.log(productsData);
//   } catch (err) {
//     console.log(err);
//   }
// }
// init();

async function renderOrdersSummary() {
  const allProducts = await loadProductsFetch();
  console.log(allProducts);
  let finalHTML = "";
  orders.forEach((order) => {
    console.log(order);
    order.orderTime = new Date(order.orderTime).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
    });

    // display the order

    let orderHTML = `
    <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${order.orderTime}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
          <div class="order-details-grid">
    
    `;

    const orderProducts = order.products;

    console.log(orderProducts);

    orderProducts.forEach((orderItem) => {
      orderItem.estimatedDeliveryTime = new Date(
        orderItem.estimatedDeliveryTime
      ).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
      });
      const matchingProduct = products.find((product) => {
        return product.id === orderItem.productId;
      });

      if (matchingProduct) {
        orderHTML += `
  
            <div class="product-image-container">
              <img src="${matchingProduct.image}" />
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">Arriving on: ${orderItem.estimatedDeliveryTime}</div>
              <div class="product-quantity">Quantity: ${orderItem.quantity}</div>
              <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${matchingProduct.id}" >
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
  `;
      }
    });
    orderHTML += `<div></div>`;
    finalHTML += orderHTML;
  });
  document.querySelector(".js-order-grid").innerHTML = finalHTML;

  document.querySelectorAll(".js-buy-again-button").forEach((button) => {
    button.addEventListener("click", () => {
      // Pobieramy ID z datasetu, który zapisałaś w HTML
      const { productId } = button.dataset;

      // Dodajemy do koszyka
      addToCart(productId, 1);
      updateCartQuantity();

      // Feedback wizualny
      button.innerHTML = "Added!";
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png" />
          <span class="buy-again-message">Buy it again</span>`;
      }, 1000);
    });
  });
}
renderOrdersSummary();
