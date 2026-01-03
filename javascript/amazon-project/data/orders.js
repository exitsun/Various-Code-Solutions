import { formatCurrency } from "../scripts/utils/money.js";

export let orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

// pass the data
// generate the html

// orders: date total order ID products
// generate unique UUID for an order.
// Source - https://stackoverflow.com/a/2117523
// Posted by broofa, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-03, License - CC BY-SA 4.0

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}

console.log(uuidv4());

function renderOrdersSummary() {
  orders.forEach((order) => {
    order.orderTime = new Date(order.orderTime).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
    });
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
                Black and Gray Athletic Cotton Socks - 6 Pairs
              </div>
              <div class="product-delivery-date">Arriving on: August 15</div>
              <div class="product-quantity">Quantity: 1</div>
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
  });
}
renderOrdersSummary();
