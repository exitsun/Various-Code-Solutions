// store the past sessions from localstorage

export let orderHistory =
  JSON.parse(localStorage.getItem("order-history")) || [];
