import { getMonth, getYear } from "./dateUtil";
export function separateEventsByMonth(events) {
  let result = [];
  events.forEach((event) => {
    const eventMonth = getMonth(event.startDate);
    const eventYear = getYear(event.startDate);
    const sectionTitle = () => `${eventMonth} ${eventYear}`;
    const sectionIndex = result.findIndex(
      (section) => section.title === sectionTitle()
    );
    if (sectionIndex != -1) {
      result[sectionIndex].data.push(event);
    } else {
      result.push({
        title: sectionTitle(),
        data: [event],
      });
    }
  });
  return result;
}
