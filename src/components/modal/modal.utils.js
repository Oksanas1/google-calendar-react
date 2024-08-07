const addMinutes = (strTime, addMin) => {
  const [hour, minute] = strTime.split(":").map((item) => Number(item));
  const totalMinutes = Math.round((hour * 60 + minute + addMin) / 15) * 15;

  if (totalMinutes > 1439) {
    return "23:59";
  }

  const newHour = Math.floor(totalMinutes / 60);
  const newMinute = totalMinutes % 60;

  const formattedHour = newHour < 10 ? `0${newHour}` : newHour;
  const formattedMinute = newMinute < 10 ? `0${newMinute}` : newMinute;

  return `${formattedHour}:${formattedMinute}`;
};

export default addMinutes;
