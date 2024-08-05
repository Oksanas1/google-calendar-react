import { createEventInDB, updateEventInDB } from "../../gateway/getEway";

export const createnewObj = ({
  id,
  title,
  description,
  color,
  date,
  startTime,
  endTime,
}) => {
  const newObj = {
    id: id || "",
    title,
    description,
    color,
    dateFrom: new Date(`${date} ${startTime}`).getTime(),
    dateTo: new Date(`${date} ${endTime}`).getTime(),
  };

  return newObj;
};

export const updateListInDB = (dataForm) => {
  const newObj = createnewObj(dataForm);

  return dataForm.id
    ? updateEventInDB(dataForm.id, newObj)
    : createEventInDB(newObj);
};

export default updateListInDB;
