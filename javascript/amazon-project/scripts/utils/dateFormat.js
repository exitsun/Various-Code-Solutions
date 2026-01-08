export function formatDate(date) {
  if (!date) {
    return "";
  }

  const dateObject = new Date(date); //fixed lol
  if (isNaN(dateObject.getTime())) {
    return "Invalid Date";
  }

  let formattedDate = dateObject.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });
  return formattedDate;
}
