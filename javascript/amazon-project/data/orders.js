import { formatCurrency } from "../scripts/utils/money.js";
import { products, loadProductsFetch } from "./products.js";

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
  orders.forEach((order) => {
    console.log(order);
    order.orderTime = new Date(order.orderTime).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
    });

    // display the order

    const orderProducts = order.products;

    console.log(orderProducts);

    orderProducts.forEach((orderItem) => {
      const matchingProduct = products.find((product) => {
        return product.id === orderItem.productId;
      });

      if (matchingProduct) {
        const ordersSummaryHTML = `
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
            <div class="product-image-container">
              <img src="images/products/athletic-cotton-socks-6-pairs.jpg" />
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">Arriving on: ${
                orderItem.estimatedDeliveryTime
              }</div>
              <div class="product-quantity">Quantity: ${
                orderItem.quantity
              }</div>
              <button class="buy-again-button button-primary">
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

            <div class="product-image-container">
              <img
                src="images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg"
              />
            </div>

            <div class="product-details">
              <div class="product-name">
                Adults Plain Cotton T-Shirt - 2 Pack
              </div>
              <div class="product-delivery-date">Arriving on: August 19</div>
              <div class="product-quantity">Quantity: 2</div>
              <button class="buy-again-button button-primary">
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
          </div>
        </div>
  
  `;
        document.querySelector(".js-order-grid").innerHTML += ordersSummaryHTML;
      }
    });
  });
}
renderOrdersSummary();
