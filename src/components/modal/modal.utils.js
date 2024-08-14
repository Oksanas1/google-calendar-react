const addMinutes = (currDate, addMin) => {
  const totalMinutes =
    currDate.getHours() * 60 + currDate.getMinutes() + addMin;
  const roundedMinutes = Math.min(Math.round(totalMinutes / 15) * 15, 1439); // 1439 minutes = 23:59

  const newHour = Math.floor(roundedMinutes / 60);
  const newMinute = roundedMinutes % 60;

  const formattedHour = newHour < 10 ? `0${newHour}` : newHour;
  const formattedMinute = newMinute < 10 ? `0${newMinute}` : newMinute;

  return `${formattedHour}:${formattedMinute}`;
};

const getEventTime = (date) => date.toTimeString().slice(0, 5);

const getDayForFormDateValue = (startEvent) =>
  startEvent
    .toLocaleDateString("en-GB")
    .split("/")
    .reverse()
    .map((element) => (element.length < 2 ? `0${element}` : element))
    .join("-");

export const createNewFormData = (event) => {
  const currentDate = new Date();

  if (!event) {
    return {
      startTime: getEventTime(currentDate),
      endTime: addMinutes(currentDate, 15),
      color: "#0000ff",
      date: getDayForFormDateValue(currentDate),
    };
  }

  return {
    ...event,
    date: getDayForFormDateValue(new Date(event.dateFrom)),
  };
};

export default addMinutes;
