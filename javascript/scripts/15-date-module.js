export function isWeekend(dateObj) {
  const dayToCheck = dateObj.day();

  if (dayToCheck === 0 || dayToCheck === 6) {
    console.log("It's weekend");
  } else {
    console.log("It's not weekend yet. ");
  }
}
