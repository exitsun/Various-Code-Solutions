import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/car.js";
// import "../data/backend-practice.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";

async function loadPage() {
  try {
    // throw "error1";
    await loadProductsFetch(); //await can only be used inside an async function

    const value = await new Promise((resolve, reject) => {
      // throw "error2";
      loadCart(() => {
        // reject("Error 3");

        resolve();
      });
    });
  } catch (error) {
    console.log("Error occured.");
  }
  // async makes the function return promise

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCartFetch(() => {
      resolve();
    });
  }),
]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve("value1");
//   });
// })
//   .then((value) => {
//     console.log(value);
//     return new Promise((resolve) => {
//       loadCart(() => {
//         resolve();
//       });
//     });
//   })
//   .then(() => {
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
//   });

// loadProducts(() => {
//   loadCart(() => {
// renderCheckoutHeader();
// renderOrderSummary();
// renderPaymentSummary();
//   });
// });
