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

var getDaysArray = function (start, end) {
  for (
    var a = [], d = dayjs(start).toDate();
    d <= dayjs(end).toDate();
    d.setDate(d.getDate() + 1)
  ) {
    a.push(dayjs(d));
  }
  return a;
};

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
export function generateCalendarStrip(start, end) {
  const days = getDaysArray(start, end);
  if (days.length < 5) {
    const before = days[0].subtract(1, "day");
    let result = [{ disabled: true, day: before }];
    for (const day of days) {
      result.push({ disabled: false, day: day });
    }
    for (var arr = result; arr.length < 6; ) {
      const after = {
        disabled: true,
        day: arr[arr.length - 1].day.add(1, "day"),
      };
      arr.push(after);
    }
    return arr;
  }
}

export function isSameDay(a, b) {
  return dayjs(a).isSame(b, "day");
}
