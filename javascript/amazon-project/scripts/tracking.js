import { orders } from "../data/orders.js";
import { loadProductsFetch } from "../data/products.js";
import { orderHistory } from "./checkout/orderHistory.js";
import { formatDate } from "./utils/dateFormat.js";

console.log(orders);
console.log(orderHistory);

async function init() {
  const products = await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");
  console.log(orderId);
  console.log(productId);
  const orderMemory = [...orders, ...orderHistory].find(
    (o) => o.id === orderId
  );

  console.log(orderMemory.id);

  const orderItem = orderMemory.products.find((p) => p.productId === productId);
  console.log(orderItem);
  const productDetails = products.find(
    (p) => String(p.id).trim() === String(productId).trim()
  );
  console.log(productDetails);
  // if (!productDetails) {
  //   console.error(
  //     "Produkty się załadowały, ale nie ma wśród nich ID:",
  //     productId
  //   );
  //   return;
  // }

  function renderTrackingPage() {
    let trackingHTML = `
     <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">Arriving on ${formatDate(
          orderItem.estimatedDeliveryTime
        )}</div>

        <div class="product-info">
          ${productDetails.name}
        </div>

        <div class="product-info">Quantity: ${orderItem.quantity}</div>

        <img
          class="product-image"
          src="${productDetails.image}"
        />

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    `;
    //   trackingContainer.innerHTML = trackingHTML;
    document.querySelector(".js-order-tracking").innerHTML = trackingHTML;

    const today = new Date();
    const orderTime = new Date(orderMemory.orderTime);
    const deliveryTime = new Date(orderItem.estimatedDeliveryTime);
    const deliveryDuration = deliveryTime - orderTime;
    const deliveryDeltaTime = today - orderTime;
    let progressPercent = (deliveryDeltaTime / deliveryDuration) * 100;
    console.log(today);
    document.querySelector(
      ".progress-bar"
    ).style.width = `${progressPercent.toFixed(2)}%`;

    const labels = document.querySelectorAll(".progress-label");
    if (progressPercent < 40) {
      labels[0].classList.add("current-status");
    } else if (progressPercent < 100) {
      labels[1].classList.add("current-status");
    } else {
      labels[2].classList.add("current-status");
    }
  }

  renderTrackingPage();
}
init();
