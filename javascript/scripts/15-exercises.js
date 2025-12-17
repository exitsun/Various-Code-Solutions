import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { isWeekend as isSatSun } from "./15-date-module.js";

const today = dayjs();

const todayPlusFive = today.add(5, "days");

const oneMonthAfterToday = today.add(1, "month");
console.log(oneMonthAfterToday);

const oneMonthBeforeToday = today.subtract(1, "month");
const saturday = today.add(4, "days");

console.log(today);
console.log(todayPlusFive.format("MMMM, D"));
console.log(oneMonthAfterToday.format("MMMM, D"));
console.log(oneMonthBeforeToday.format("MMMM, D"));
console.log(today.format("dddd"));

isSatSun(today);
isSatSun(saturday);
isSatSun(oneMonthAfterToday);
