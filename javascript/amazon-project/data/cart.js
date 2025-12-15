export const cart = [];
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
    });
  }
}
