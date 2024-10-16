export const getWeekStartDate = (date) => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(dateCopy.setDate(dateCopy.getDate() + difference));

  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
};

export const generateWeekRange = (startDate) => {
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);
    result.push(new Date(base.setDate(base.getDate() + i)));
  }
  return result;
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(":");
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
  return withMinutes;
};

export const formatMins = (mins) => (mins < 10 ? `0${mins}` : mins);

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const months = [
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

export const getDisplayedMonth = (dateStartWeek, dateEndWeek) => {
  const startMonth = dateStartWeek.getMonth();
  const startYear = dateStartWeek.getFullYear();
  const endMonth = dateEndWeek.getMonth();
  const isSameMonth = startMonth === endMonth;
  if (isSameMonth) {
    return `${months[startMonth]} ${startYear}`;
  }
  const endYear = dateEndWeek.getFullYear();
  const isSameYear = startYear === endYear;
  return isSameYear
    ? `${months[startMonth]} - ${months[endMonth]} ${startYear}`
    : `${months[startMonth]} ${startYear} - ${months[endMonth]} ${endYear}`;
};

export const formatToEventTimeForForm = (date) =>
  date.toTimeString().slice(0, 5);
