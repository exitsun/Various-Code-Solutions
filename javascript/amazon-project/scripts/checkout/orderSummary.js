import { cart, removeFromCart, updateQuantity } from "../../data/cart.js"; //named export
import { formatCurrency } from "../../scripts/utils/money.js";
import { updateCartQuantity } from "../../data/cart.js";
import {
  calculateDeliveryDate,
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOption.js";
import { updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { renderPaymentSummary } from "./paymentSummary.js";

updateCartQuantity();

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const { dateString } = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${productId}" >
            <div class="delivery-date">Delivery date: ${dateString}</div>

            <div class="cart-item-details-grid">
              <img class="product-image" src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">${matchingProduct.getPrice()}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label js-quantity-label-${
                    matchingProduct.id
                  } ">${cartItem.quantity}</span> </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${
                    matchingProduct.id
                  }" >
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                    matchingProduct.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
            
              
    
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const { priceString, dateString } = calculateDeliveryDate(deliveryOption);

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
    <div class="delivery-option js-delivery-option" data-product-id="${
      matchingProduct.id
    }" data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio"
                  ${isChecked ? "checked" : ""}
                  class="delivery-option-input" name="delivery-option-${
                    matchingProduct.id
                  }">
                  <div>
                    <div class="delivery-option-date">${dateString}</div>
                    <div class="delivery-option-price">${priceString}</div>
                  </div>
                </div>
    `;
    });

    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
  // console.log(cartSummaryHTML);

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      renderPaymentSummary();

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      updateCartQuantity();
    });
  });
  // kinda quirky today ngl

  document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      const quantityUpdater = document.querySelector(
        `.js-quantity-label-${productId}`
      );

      let isEditing = link.innerHTML === "Save";

      if (!isEditing) {
        const currentQuantity = quantityUpdater.innerHTML;
        quantityUpdater.innerHTML = `<input type="number"
      size="3"
      min="1"
      max="1000"
      value="${currentQuantity}"
      class="js-quantity-input-${productId}"
           ></input>`;
        link.innerHTML = "Save";

        const inputElement = document.querySelector(
          `.js-quantity-input-${productId}`
        );

        if (inputElement) {
          inputElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              console.log("hello");
              event.preventDefault();
              link.click();
            }
          });
        }
      } else {
        link.innerHTML = "Update";
        const inputElement = document.querySelector(
          `.js-quantity-input-${productId}`
        );
        if (inputElement) {
          const newQuantity = Number(inputElement.value);
          if (newQuantity > 0 && newQuantity < 100) {
            quantityUpdater.innerHTML = newQuantity;
            updateQuantity(productId, newQuantity);
            updateCartQuantity();
            renderPaymentSummary();
          }
        }
      }
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary(); //recursion
      renderPaymentSummary();
    });
  });
}
