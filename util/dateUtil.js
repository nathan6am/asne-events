import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

const monthIndex = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getMonth(timestamp) {
  const date = dayjs(timestamp);
  return monthIndex[date.month()];
}

export function getYear(timestamp) {
  return dayjs(timestamp).year();
}

export function getOrdinalRange(start, end) {
  if (dayjs(start).month() === dayjs(end).month()) {
    return `${dayjs(start).format("MMMM Do")} - ${dayjs(end).format("Do")}`;
  } else {
    return `${dayjs(start).format("MMM Do")} - ${dayjs(end).format("MMM Do")}`;
  }
}
