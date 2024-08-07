import moment from "moment";

const validateEvent = (newEvent, existingEvents) => {
  const { date, startTime, endTime } = newEvent;

  let result = true;
  const textMessage = [];
  const eventStart = moment(`${date} ${startTime}`);
  const eventEnd = moment(`${date} ${endTime}`);

  if (!eventStart.isSame(eventEnd, "day")) {
    textMessage.push("Event must start and end within the same day.");
    result = false;
  }

  const diffMinut = eventEnd.diff(eventStart, "minutes");
  if (diffMinut > 360) {
    textMessage.push("Event duration cannot exceed 6 hours.");
    result = false;
  }

  if (diffMinut < 0) {
    console.log(diffMinut);
    textMessage.push("Event cannot end before start");
    result = false;
  }

  const isOverlapping = existingEvents.some((event) => {
    const existingStart = moment(`${event.date} ${event.startTime}`);
    const existingEnd = moment(`${event.date} ${event.endTime}`);

    return eventStart.isBefore(existingEnd) && eventEnd.isAfter(existingStart);
  });

  if (isOverlapping) {
    textMessage.push("Events cannot overlap.");
    result = false;
  }

  if (textMessage.length > 0) {
    alert(textMessage.join("\n"));
  }

  return result;
};

export default validateEvent;
