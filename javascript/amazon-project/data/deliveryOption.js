import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"; //default export each file can only have 1 default export
import { formatCurrency } from "../scripts/utils/money.js";
export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}
export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();

  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const deliveryDateCheck = deliveryDate.day();
  //exclude weekends
  let newDeliveryDate;
  if (deliveryDateCheck === 0) {
    newDeliveryDate = deliveryDate.add(1, "days");
  } else if (deliveryDateCheck === 6) {
    newDeliveryDate = deliveryDate.add(2, "days");
  } else {
    newDeliveryDate = deliveryDate;
  }

  const dateString = newDeliveryDate.format("dddd, MMMM D");
  const priceString =
    deliveryOption.priceCents === 0
      ? "FREE Shipping"
      : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;
  return {
    priceString: priceString,
    dateString: dateString,
  };
}
